import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { message, systemPrompt } = await req.json(); // receive systemPrompt from frontend

  if (!message) {
    return new Response("Message is required", { status: 400 });
  }

  if (!systemPrompt) {
    return new Response("systemPrompt is required", { status: 400 });
  }

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
    const result = await streamText({
      model: google("gemini-1.5-flash"),
      system: systemPrompt,
      messages: geminiMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("gemini error", err);
    return new Response("AI request failed", { status: 500 });
  }
}
