import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Simple in-memory rate limiting: 5 messages per IP
const rateLimit = new Map<string, number>();

export async function POST(req: NextRequest) {
  const { message, systemPrompt, apiKey } = await req.json(); // receive systemPrompt and apiKey from frontend

  if (!message) {
    return new Response("Message is required", { status: 400 });
  }

  if (!systemPrompt) {
    return new Response("systemPrompt is required", { status: 400 });
  }

  // Rate limiting: get IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown';
  const currentCount = rateLimit.get(ip) || 0;
  if (currentCount >= 5) {
    return new Response("Rate limit exceeded. You can send up to 5 messages.", { status: 429 });
  }
  rateLimit.set(ip, currentCount + 1);

  // Accept both string and array, always convert to Gemini format
  let geminiMessages;
  if (typeof message === "string") {
    geminiMessages = [{ role: "user", content: message }];
  } else if (Array.isArray(message)) {
    geminiMessages = message.map((m) => ({
      role: m.role || "user",
      content: m.text || m.content || "",
    }));
  } else {
    return new Response("Invalid message format", { status: 400 });
  }

  try {
    // Use the dynamic systemPrompt sent from frontend
    const googleAI = apiKey ? createGoogleGenerativeAI({ apiKey }) : createGoogleGenerativeAI();
    const model = googleAI("gemini-1.5-flash");
    const result = await streamText({
      model,
      system: systemPrompt,
      messages: geminiMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("gemini error", err);
    return new Response("AI request failed", { status: 500 });
  }
}
