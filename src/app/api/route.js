  export async function POST(request) {
    try {
      const body = await request.json();
      const { temperatureC, windKmh, city, venueName } = body || {};

      const key = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!key) {
        return new Response("Missing Gemini API key", { status: 400 });
      }

      const prompt = `Write 5 practical, safety‑aware tips in English for attending a football match.\nContext: city=${city || "Unknown"}, venue=${venueName || "Unknown"}, temperatureC=${typeof temperatureC === "number" ? temperatureC : "NA"}, windKmh=${typeof windKmh === "number" ? windKmh : "NA"}.\nStyle requirements:\n- Output EXACTLY 5 full sentences.\n- Each sentence on its own line.\n- No numbering, no bullets.\n- Mention warm layers and windproof clothing if it feels cool.\n- Include hydration, public transport/arrive early, ticket/bag policy, and general safety awareness.`;

      const geminiBody = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      };

      const gemRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": key,
        },
        body: JSON.stringify(geminiBody),
        cache: "no-store",
      });

      if (!gemRes.ok || !gemRes.body) {
        const errText = await gemRes.text().catch(() => "");
        return new Response(`Gemini stream error: ${errText}`, { status: gemRes.status || 500 });
      }

      // Proxy the SSE stream directly
      return new Response(gemRes.body, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    } catch (e) {
      return new Response(e?.message || "Unknown error", { status: 500 });
    }
  }


