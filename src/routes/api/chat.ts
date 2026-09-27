import { createFileRoute } from "@tanstack/react-router";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, type LanguageModel, type UIMessage } from "ai";
import { createLovableAiGatewayProvider, getLovableAiGatewayRunId } from "@/lib/ai-gateway.server";
import { portfolioContext, profile } from "@/data/portfolio";

type ChatRequestBody = { messages?: unknown };

type ProviderCandidate = {
 id: "groq" | "gemini" | "lovable";
 model: LanguageModel;
};

function buildSystemPrompt() {
 return [
 `You ARE ${profile.fullName}. You speak in first person as him on his portfolio site.`,
 "Answer as I / me / my, never third person (never say \"Abdul has…\" or \"he is…\").",
 "Be confident, warm and brief (2-5 sentences, or a short plain list).",
 "Do NOT use markdown formatting, no **bold**, *italic*, backticks, headings, or link syntax. Write plain text only.",
 "Use only the JSON portfolio data below as your source of truth. If something is not in the data, say so and offer what is.",
 "Never invent employers, dates or metrics.",
 "When asked how to hire or contact you, give your email and mention the contact section, without wrapping anything in asterisks.",
    "You build AI features including KYC OCR with AWS Textract, Gemini seller tools, Kingswell RAG chat grounded in live listings, and Blue Ocean AI schedule generation with prompt chunking. You ship via GitHub/Actions and work daily in Cursor, Claude, Copilot, Gemini, Lovable, and OpenAI.",
 `PORTFOLIO_DATA: ${portfolioContext()}`,
 ].join("\n");
}

function providerErrorMessage(error: unknown) {
 if (!error || typeof error !== "object") return String(error);
 const record = error as {
 message?: string;
 data?: { error?: { message?: string } };
 responseBody?: string;
 };
 return record.data?.error?.message || record.message || record.responseBody || String(error);
}

function getProviderCandidates(request: Request): ProviderCandidate[] {
 const candidates: ProviderCandidate[] = [];

 const groqKey = process.env["GROQ_API_KEY"]?.trim();
 if (groqKey) {
 const groqModel = process.env["GROQ_MODEL"]?.trim() || "openai/gpt-oss-20b";
 candidates.push({
 id: "groq",
 model: createGroq({ apiKey: groqKey })(groqModel),
 });
 }

 const geminiKey =
 process.env["GEMINI_API_KEY"]?.trim() || process.env["GOOGLE_GENERATIVE_AI_API_KEY"]?.trim();
 if (geminiKey) {
 const geminiModel = process.env["GEMINI_MODEL"]?.trim() || "gemini-3.6-flash";
 candidates.push({
 id: "gemini",
 model: createGoogleGenerativeAI({ apiKey: geminiKey })(geminiModel),
 });
 }

 const lovableKey = process.env["LOVABLE_API_KEY"]?.trim();
 if (lovableKey) {
 const gateway = createLovableAiGatewayProvider(lovableKey, getLovableAiGatewayRunId(request));
 candidates.push({
 id: "lovable",
 model: gateway("openai/gpt-5.6-sol"),
 });
 }

 return candidates;
}

export const Route = createFileRoute("/api/chat")({
 server: {
 handlers: {
 POST: async ({ request }) => {
 const { messages } = (await request.json()) as ChatRequestBody;
 if (!Array.isArray(messages)) {
 return new Response("Messages are required", { status: 400 });
 }

 const candidates = getProviderCandidates(request);
 if (candidates.length === 0) {
 return new Response("No AI API keys configured (GROQ_API_KEY or GEMINI_API_KEY)", {
 status: 500,
 });
 }

 const system = buildSystemPrompt();
 const modelMessages = await convertToModelMessages(messages as UIMessage[]);
 const errors: string[] = [];

 for (const candidate of candidates) {
 try {
 const result = streamText({
 model: candidate.model,
 system,
 messages: modelMessages,
 maxRetries: 0,
 maxOutputTokens: 512,
 ...(candidate.id === "lovable"
 ? { providerOptions: { lovable: { reasoningEffort: "none" } } }
 : {}),
 });

 // Start the request; auth/model/rate failures reject so we can fall through.
 await result.response;

 return result.toUIMessageStreamResponse({
 originalMessages: messages as UIMessage[],
 headers: { "X-Portfolio-AI-Provider": candidate.id },
 });
 } catch (error) {
 const message = providerErrorMessage(error);
 errors.push(`${candidate.id}: ${message}`);
 console.error(`[chat] ${candidate.id} failed, trying next provider`, message);
 }
 }

 return new Response(`All AI providers failed. ${errors.join(" | ")}`, { status: 502 });
 },
 },
 },
});
