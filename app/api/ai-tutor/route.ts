import { NextResponse } from "next/server";

type ChatMessage = { role: "user" | "assistant"; content: string };
type TutorRequest = {
  messages?: ChatMessage[];
  subject?: string;
  tone?: "santai" | "formal" | "motivatif";
  depth?: number;
  memoryEnabled?: boolean;
};

const SUBJECT_GUIDES: Record<string, string> = {
  programming: "pemrograman dan pengembangan software",
  mathematics: "matematika dan penalaran kuantitatif",
  english: "bahasa Inggris praktis",
  career: "persiapan karier digital",
};

function localTutorReply(question: string, subject: string, depth: number) {
  const lower = question.toLowerCase();
  const detailed = depth >= 70;

  if (lower.includes("javascript") || lower.includes("variable") || lower.includes("variabel")) {
    return `Variabel adalah “wadah bernama” untuk menyimpan nilai. Di JavaScript, gunakan \`const\` jika nilainya tidak akan diganti dan \`let\` jika nilainya akan berubah.\n\n\`\`\`js\nconst nama = "Dina";\nlet skor = 80;\nskor = 90;\n\`\`\`\n\n${detailed ? "Bayangkan const seperti label permanen pada kotak, sedangkan let seperti papan tulis yang isinya boleh diperbarui. " : ""}Coba buat variabel \`targetBelajar\` berisi jumlah jam belajarmu minggu ini.`;
  }

  if (lower.includes("persamaan") || lower.includes("aljabar") || /\d+x/.test(lower)) {
    return `Kita selesaikan dengan menjaga kedua ruas tetap seimbang. Contoh: \`3x + 6 = 18\`.\n\n1. Kurangi kedua ruas dengan 6 → \`3x = 12\`\n2. Bagi kedua ruas dengan 3 → \`x = 4\`\n3. Cek: \`3(4) + 6 = 18\` ✓\n\nSekarang coba: berapa nilai \`x\` pada \`2x + 5 = 15\`?`;
  }

  if (lower.includes("interview") || lower.includes("wawancara")) {
    return `Untuk jawaban interview yang kuat, pakai pola STAR: Situation, Task, Action, Result.\n\nContoh singkat: “Saat proyek kelompok terlambat (S), saya perlu merapikan pembagian tugas (T). Saya membuat papan prioritas dan check-in harian (A), sehingga proyek selesai dua hari lebih cepat (R).”\n\nTulis satu pengalamanmu dalam 3–4 kalimat, lalu saya bantu poles.`;
  }

  const domain = SUBJECT_GUIDES[subject] ?? "topik yang ingin kamu pelajari";
  return `Mari kita pecah pertanyaanmu tentang ${domain} menjadi langkah kecil.\n\n1. Tentukan konsep utama yang ingin dipahami.\n2. Hubungkan dengan contoh sehari-hari.\n3. Uji pemahaman lewat satu latihan singkat.\n\nUntuk “${question}”, bagian mana yang paling membingungkan: konsep, contoh, atau cara mengerjakannya?`;
}

function extractOutputText(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const response = payload as { output_text?: string; output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
  if (response.output_text) return response.output_text;
  return response.output
    ?.flatMap((item) => item.content ?? [])
    .filter((item) => item.type === "output_text")
    .map((item) => item.text ?? "")
    .join("\n") ?? "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TutorRequest;
    const messages = (body.messages ?? []).slice(-10).filter((message) => message.content?.trim());
    const lastQuestion = [...messages].reverse().find((message) => message.role === "user")?.content.trim();

    if (!lastQuestion) {
      return NextResponse.json({ error: "Pertanyaan belum diisi." }, { status: 400 });
    }

    const subject = body.subject && SUBJECT_GUIDES[body.subject] ? body.subject : "programming";
    const tone = body.tone ?? "santai";
    const depth = Math.min(100, Math.max(0, body.depth ?? 55));
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        answer: localTutorReply(lastQuestion, subject, depth),
        source: "local-demo",
        model: "Tutor NLP lokal",
      });
    }

    const depthInstruction = depth < 35 ? "Jawab ringkas, maksimal 3 paragraf." : depth < 70 ? "Berikan penjelasan bertahap dan satu contoh." : "Berikan penjelasan mendalam, analogi, contoh, dan satu latihan singkat.";
    const input = (body.memoryEnabled ? messages : messages.slice(-1)).map((message) => ({
      role: message.role,
      content: message.content,
    }));

    const apiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-6-astra",
        instructions: `Kamu adalah RuangBelajar AI, tutor personal berbahasa Indonesia untuk ${SUBJECT_GUIDES[subject]}. Gaya bicaramu ${tone}. Jangan langsung memberi jawaban ujian tanpa penjelasan. Bantu pengguna memahami konsep, gunakan bahasa aman dan inklusif, dan akhiri dengan pertanyaan cek pemahaman saat relevan. ${depthInstruction}`,
        input,
        max_output_tokens: 700,
        store: false,
      }),
    });

    if (!apiResponse.ok) {
      const detail = await apiResponse.text();
      console.error("OpenAI API error", apiResponse.status, detail.slice(0, 300));
      return NextResponse.json({
        answer: localTutorReply(lastQuestion, subject, depth),
        source: "local-fallback",
        model: "Tutor NLP lokal",
      });
    }

    const payload = await apiResponse.json();
    const answer = extractOutputText(payload);
    if (!answer) throw new Error("Model tidak mengembalikan teks.");

    return NextResponse.json({
      answer,
      source: "openai",
      model: process.env.OPENAI_MODEL ?? "gpt-6-astra",
    });
  } catch (error) {
    console.error("Tutor request failed", error);
    return NextResponse.json({ error: "Tutor sedang mengalami kendala. Coba lagi sebentar." }, { status: 500 });
  }
}
