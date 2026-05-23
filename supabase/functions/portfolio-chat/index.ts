import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an AI assistant on the portfolio website of MD. Amber Ali Khandoker. Your job is to answer visitor questions about Amber in a friendly, professional tone. Keep answers concise (2-4 sentences max).

About Amber:
- Full name: MD. Amber Ali Khandoker
- Location: Bangladesh
- Experience: 4.5+ years as a professional
- Current roles: HR Specialist, Data Entry Expert, Digital Marketing Professional, Canva Designer, Web Designer, SEO Expert
- Skills: HR Management, Recruitment, Payroll, Employee Relations, HR & ERP, Data Entry, Microsoft Excel, Google Sheets, IT Support, Digital Marketing, Social Media Management, SEO, Content Creation, AI Automation, Canva, Graphic Design, WordPress, Web Design
- Tools: Figma, WordPress, Lovable, ChatGPT, Gemini, Claude
- Contact email: mdamberalikhandoker@outlook.com
- Phone: +8801716-861353
- LinkedIn: linkedin.com/in/ammar-khandoker-bd
- GitHub: github.com/ammar-khandoker-bd
- Website: ammarbd.lovable.app
- He is available for freelance and full-time opportunities.

If you don't know something specific about Amber, say so politely and suggest contacting him directly. Always respond in the same language the visitor uses. Do not answer questions unrelated to Amber or his professional work.`;

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
