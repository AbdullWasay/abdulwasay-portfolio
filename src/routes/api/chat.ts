import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider, getLovableAiGatewayRunId } from "@/lib/ai-gateway.server";
import { portfolioContext, profile } from "@/data/portfolio";

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key, getLovableAiGatewayRunId(request));

        const system = [
          `You are the AI assistant embedded in ${profile.fullName}'s portfolio site.`,
          "Answer questions about him confidently, warmly and briefly (2-5 sentences, or a short markdown list).",
          "Use only the JSON portfolio data below as your source of truth. If something is not in the data, say so and offer what is.",
          "Speak about him in third person. Never invent employers, dates or metrics.",
          "When asked how to hire or contact him, give his email and mention the contact section.",
          `PORTFOLIO_DATA: ${portfolioContext()}`,
        ].join("\n");

        const result = streamText({
          model: gateway("openai/gpt-5.6-sol"),
          system,
          messages: await convertToModelMessages(messages as UIMessage[]),
          providerOptions: { lovable: { reasoningEffort: "none" } },
        });

        return result.toUIMessageStreamResponse({ originalMessages: messages as UIMessage[] });
      },
    },
  },
});