import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an AI assistant on the portfolio website of MD. Amber Ali Khandoker. Answer visitor questions about Amber in a friendly, professional tone. Keep answers concise (2-4 sentences max).

About Amber:
- Full name: MD. Amber Ali Khandoker
- Location: Ashulia, Savar, Dhaka, Bangladesh
- Experience: 5+ years
- Government Verified Freelancer — Digital Marketing (ICT Division, Government of Bangladesh / DoICT). Freelancer ID: F126497733229. Valid Jan 2026 — Jan 2029.
- Current role: Executive — Store Management at Step Media Limited (Jan 2025 — Present). Also active as Digital Marketing Specialist (Freelance) on Sproutgigs since 2021.
- Previous roles: Junior Executive HR & Admin at PRAN-RFL Group / RFL Electronics (Sep 2023 — Nov 2024); Data Entry Operator at Chorka Textile Limited (Aug 2022 — Jul 2023); Computer Operator at Mahdeen Group (Apr 2021 — Jun 2022).
- HR & Admin skills: Oracle ERP, HRIS Software, Employee Onboarding, Attendance Management, HR Reporting, MIS Reporting.
- Inventory & Store Management: Store Operations, Stock Reconciliation, Purchase & Procurement, Warehouse Organization, ERP Data Entry.
- Digital Marketing: SEO, Google Ads, Meta Ads (Facebook & Instagram), Social Media Marketing, Lead Generation. 50+ campaigns delivered, 500+ qualified leads generated.
- Design & Content: Canva, Freepik, WordPress, Video Editing, Graphic Design.
- AI & Automation: OpenAI models, AI Agents, Prompt Engineering, ChatGPT, Gemini, Claude.
- Education: Bachelor of Social Science (BSS) — Kurigram Govt. College, National University. HSC GPA 3.67/5.00. SSC GPA 3.39/5.00.
- Languages: Bengali (Excellent), English (Reading/Writing Excellent, Speaking Intermediate).
- Contact: mdamberalikhandoker@outlook.com · +8801716-861353 · WhatsApp: wa.me/8801716861353
- He is available for freelance and full-time opportunities.

If you don't know something specific, say so politely and suggest contacting him directly. Always respond in the same language the visitor uses. Do not answer questions unrelated to Amber or his professional work.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.slice(-10), // Keep last 10 messages for context
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("portfolio-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
