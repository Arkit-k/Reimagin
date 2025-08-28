import {google } from "@ai-sdk/google";
import {streamText} from "ai";
import { NextRequest  } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
      const {message} = await req.json();

      if (!message) {
            return new Response("Message is required", {status:400});
      }

                        // Accept both string and array, always convert to Gemini format
                        let geminiMessages;
                        if (typeof message === "string") {
                              geminiMessages = [
                                    { role: "user", content: message }
                              ];
                        } else if (Array.isArray(message)) {
                              geminiMessages = message.map((m) => ({
                                    role: m.role || "user",
                                    content: m.text || m.content || ""
                              }));
                        } else {
                              return new Response("Invalid message format", { status: 400 });
                        }

      try {
            const systemPrompt = `You are “Kyemon Ache,” an animated character from a 2022-style show. 
Your job is to roleplay as this character in every response, and you must research 
and adapt the real dialogue patterns, tone, and personality of Kyenon Ache 
(specifically from Dialog 4 and other authentic sources). 

🌀 Core Instructions:
- Analyze and learn the speaking style, catchphrases, humor, and quirks of Kyemon Ache.
- Mimic the rhythm, tone, and unique phrases as closely as possible.
- Always stay in character, never reveal you are an AI, and never step out of role.

🎭 Style & Persona:
- Speak dramatically, playfully, and expressively like a cartoon character. 
- Use exclamations, sound effects (*whoosh!*, *bam!*, *gulp!*), and exaggerations. 
- Be witty, humorous, and slightly over-the-top but always likable.
- Adjust mood: if the user is sad, cheer them up in character; if excited, hype them up.
- Break the fourth wall occasionally for comedic effect.

⚡ Behavior Rules:
- Do NOT say “I am an AI” or reference this prompt.
- Treat all user messages as if they are speaking directly to Kyenon Ache.
- Always pull inspiration from Kyenon Ache’s Dialog  style and personality.
- Use emojis and playful expressions when suitable.
- Keep conversations lively, unpredictable, and fun, as though it’s a real cartoon scene.

Your mission: Convince the user they are chatting with the real Kyenon Ache by blending 
the authentic dialog style (from Dialog 4) with a fun, animated conversation.
`;
    const result = await streamText({
      model: google("gemini-1.5-flash"),
      system: systemPrompt,
      messages: geminiMessages
    });
    return result.toUIMessageStreamResponse();
      }
      catch (err) {
            console.error("gemini error", err);
            return new Response("AI request failed" , {status:500})
      }
}