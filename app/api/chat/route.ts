import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Simple in-memory rate limiting: 5 messages per IP
const rateLimit = new Map<string, number>();

// Security: Cleanup old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of rateLimit.entries()) {
    // Remove entries older than 1 hour
    if (now - (timestamp || 0) > 60 * 60 * 1000) {
      rateLimit.delete(key);
    }
  }
}, 10 * 60 * 1000); // Clean up every 10 minutes

// Security: Input sanitization function
function sanitizeInput(input: string): string {
  // Remove potentially harmful characters and scripts
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .slice(0, 10000); // Limit input length
}

// Security: Validate API key format (basic check)
function isValidApiKey(apiKey: string): boolean {
  // Google Gemini API keys start with specific patterns
  return /^AIza[0-9A-Za-z-_]{35}$/.test(apiKey);
}

export async function POST(req: NextRequest) {
  try {
    // Security: Check request size
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 100000) { // 100KB limit
      return new Response("Request too large", { status: 413 });
    }

    const { message, systemPrompt, apiKey } = await req.json();

    // Security: Validate required fields
    if (!message) {
      return new Response("Message is required", { status: 400 });
    }

    if (!systemPrompt) {
      return new Response("System prompt is required", { status: 400 });
    }

    // Security: Validate and sanitize API key
    if (!apiKey || typeof apiKey !== 'string') {
      return new Response("Valid API key is required", { status: 401 });
    }

    if (!isValidApiKey(apiKey)) {
      return new Response("Invalid API key format", { status: 401 });
    }

    // Security: Sanitize inputs
    const sanitizedMessage = typeof message === 'string' ? sanitizeInput(message) : message;
    const sanitizedSystemPrompt = sanitizeInput(systemPrompt);

    // Security: Enhanced rate limiting with IP and API key combination
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown';
    const rateLimitKey = `${ip}-${apiKey.slice(-8)}`; // Use last 8 chars of API key for uniqueness
    const currentCount = rateLimit.get(rateLimitKey) || 0;

    if (currentCount >= 10) { // Increased limit for authenticated users
      return new Response("Rate limit exceeded. Please try again later.", { status: 429 });
    }
    rateLimit.set(rateLimitKey, currentCount + 1);

    // Security: Log suspicious activity (basic)
    if (currentCount > 5) {
      console.warn(`High usage detected from IP: ${ip}, API key ending: ${apiKey.slice(-4)}`);
    }

    // Accept both string and array, always convert to Gemini format
    let geminiMessages;
    if (typeof sanitizedMessage === "string") {
      geminiMessages = [{ role: "user", content: sanitizedMessage }];
    } else if (Array.isArray(sanitizedMessage)) {
      geminiMessages = sanitizedMessage.map((m) => ({
        role: m.role || "user",
        content: sanitizeInput(m.text || m.content || ""),
      }));
    } else {
      return new Response("Invalid message format", { status: 400 });
    }

    // Security: Content filtering for harmful content
    const harmfulPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /eval\(/i,
      /document\./i,
      /window\./i,
      /localStorage\./i,
      /sessionStorage\./i
    ];

    const messageContent = typeof sanitizedMessage === 'string' ? sanitizedMessage : JSON.stringify(sanitizedMessage);
    if (harmfulPatterns.some(pattern => pattern.test(messageContent))) {
      return new Response("Potentially harmful content detected", { status: 400 });
    }

    try {
      // Use the sanitized systemPrompt and validated API key
      const googleAI = createGoogleGenerativeAI({ apiKey });
      const model = googleAI("gemini-1.5-flash");
      const result = await streamText({
        model,
        system: sanitizedSystemPrompt,
        messages: geminiMessages,
      });

      const response = result.toUIMessageStreamResponse();

      // Security: Add security headers
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-XSS-Protection', '1; mode=block');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

      return response;
    } catch (err) {
      console.error("Gemini API error:", err);
      const errorResponse = new Response("AI request failed", { status: 500 });
      errorResponse.headers.set('X-Content-Type-Options', 'nosniff');
      return errorResponse;
    }
  } catch (err) {
    console.error("Request processing error:", err);
    const errorResponse = new Response("Invalid request", { status: 400 });
    errorResponse.headers.set('X-Content-Type-Options', 'nosniff');
    return errorResponse;
  }
}
