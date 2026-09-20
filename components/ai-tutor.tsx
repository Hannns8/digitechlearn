"use client";

import Link from "next/link";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUp,
  BookOpen,
  Bot,
  BrainCircuit,
  Check,
  Code2,
  GraduationCap,
  LoaderCircle,
  MessageCircleQuestion,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "@/components/ui/message";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type Role = "user" | "assistant";
type ChatMessage = { id: string; role: Role; content: string; model?: string; source?: string };
type TutorResponse = { answer?: string; error?: string; model?: string; source?: string };

const starterMessages: ChatMessage[] = [{
  id: "welcome",
  role: "assistant",
  content: "Halo, aku Nara — teman belajarmu. Ceritakan apa yang sedang kamu pelajari, lalu kita pecah bersama sampai terasa masuk akal.",
  model: "RuangBelajar AI",
  source: "welcome",
}];

const prompts = [
  { icon: Code2, label: "Jelaskan variabel JavaScript dengan analogi" },
  { icon: Target, label: "Buat rencana belajar 7 hari untuk pemula" },
  { icon: MessageCircleQuestion, label: "Latih saya menjawab interview kerja" },
];

const subjectLabels: Record<string, string> = {
  programming: "Pemrograman",
  mathematics: "Matematika",
  english: "Bahasa Inggris",
  career: "Karier Digital",
};

function renderText(text: string) {
  const parts = text.split(/(```[\s\S]*?```|`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("```")) {
      return <pre key={index}><code>{part.replace(/^```\w*\n?/, "").replace(/```$/, "")}</code></pre>;
    }
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    return <span key={index}>{part}</span>;
  });
}

declare global {
  interface Document {
    modelContext?: {
      registerTool: (tool: {
        name: string;
        title: string;
        description: string;
        inputSchema: object;
        annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
        execute: (input: unknown) => Promise<unknown>;
      }, options?: { signal?: AbortSignal }) => void | Promise<void>;
    };
  }
}

export function AiTutor() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [draft, setDraft] = useState("");
  const [subject, setSubject] = useState("programming");
  const [tone, setTone] = useState<"santai" | "formal" | "motivatif">("santai");
  const [depth, setDepth] = useState([55]);
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Siap membantu");
  const bottomRef = useRef<HTMLDivElement>(null);

  const depthLabel = useMemo(() => depth[0] < 35 ? "Ringkas" : depth[0] < 70 ? "Seimbang" : "Mendalam", [depth]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 720px)").matches) setSidebarOpen(false);
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("showcase") === "1") {
      setMessages([
        ...starterMessages,
        { id: "showcase-user", role: "user", content: "Jelaskan variabel JavaScript dengan analogi sederhana" },
        { id: "showcase-assistant", role: "assistant", content: "Variabel adalah “wadah bernama” untuk menyimpan nilai. Di JavaScript, gunakan `const` jika nilainya tidak akan diganti dan `let` jika nilainya akan berubah.\n\n```js\nconst nama = \"Dina\";\nlet skor = 80;\nskor = 90;\n```\n\nCoba buat variabel `targetBelajar` berisi jumlah jam belajarmu minggu ini.", model: "Tutor NLP lokal", source: "local-demo" },
      ]);
      return;
    }
    const stored = window.localStorage.getItem("ruangbelajar-ai-memory");
    if (stored) {
      try { setMessages(JSON.parse(stored)); } catch { /* Abaikan data lokal yang rusak. */ }
    }
  }, []);

  useEffect(() => {
    if (memoryEnabled && messages.length > 1) window.localStorage.setItem("ruangbelajar-ai-memory", JSON.stringify(messages.slice(-20)));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, memoryEnabled]);

  async function askTutor(question: string) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || loading) return { ok: false };

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: cleanQuestion };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setDraft("");
    setLoading(true);
    setStatus("Sedang menyusun penjelasan…");

    try {
      const basePath = window.location.pathname.replace(/\/ai-tutor\/?$/, "");
      const response = await fetch(`${basePath}/api/ai-tutor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, subject, tone, depth: depth[0], memoryEnabled }),
      });
      const data = (await response.json()) as TutorResponse;
      if (!response.ok || !data.answer) throw new Error(data.error ?? "Respons tidak tersedia.");

      setMessages((current) => [...current, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer!,
        model: data.model,
        source: data.source,
      }]);
      setStatus(data.source === "openai" ? `Aktif · ${data.model}` : "Mode demo lokal · sambungkan API untuk LLM");
      return { ok: true, answer: data.answer };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Terjadi kendala.";
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: `Maaf, aku belum bisa menjawab. ${message}`, source: "error" }]);
      setStatus("Koneksi bermasalah");
      return { ok: false, error: message };
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: "ask_ai_tutor",
      title: "Tanya tutor AI",
      description: "Mengirim pertanyaan belajar ke tutor dengan konfigurasi subjek, gaya, kedalaman, dan memory yang sedang aktif.",
      inputSchema: {
        type: "object",
        properties: { question: { type: "string", minLength: 1, maxLength: 1500 } },
        required: ["question"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: true },
      async execute(input) {
        const question = typeof input === "object" && input && "question" in input ? String((input as { question: unknown }).question).trim() : "";
        if (!question) throw new Error("question wajib diisi");
        return askTutor(question);
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  // Registration follows the live configuration and chat state.
  }, [messages, subject, tone, depth, memoryEnabled, loading]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void askTutor(draft);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void askTutor(draft);
    }
  }

  function resetChat() {
    setMessages(starterMessages);
    window.localStorage.removeItem("ruangbelajar-ai-memory");
    setStatus("Percakapan baru");
  }

  return (
    <main className={`ai-tutor-shell ${sidebarOpen ? "" : "settings-collapsed"}`}>
      <aside className="ai-settings" aria-label="Pengaturan tutor">
        <div className="ai-brand-row">
          <Link href="/" className="ai-back-link" aria-label="Kembali ke Digitechlearn"><ArrowLeft /></Link>
          <div className="ai-brand-mark"><BrainCircuit /></div>
          <div><strong>RuangBelajar</strong><span>AI tutor</span></div>
        </div>

        <div className="ai-settings-copy">
          <Badge variant="secondary">Pengaturan personal</Badge>
          <h2>Belajar dengan caramu.</h2>
          <p>Atur cara Nara menjelaskan sebelum memulai percakapan.</p>
        </div>

        <div className="ai-control-stack">
          <label>
            <span>Mata pelajaran</span>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="ai-select"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="programming">Pemrograman</SelectItem>
                <SelectItem value="mathematics">Matematika</SelectItem>
                <SelectItem value="english">Bahasa Inggris</SelectItem>
                <SelectItem value="career">Karier Digital</SelectItem>
              </SelectContent>
            </Select>
          </label>
          <label>
            <span>Gaya bahasa</span>
            <Select value={tone} onValueChange={(value) => setTone(value as typeof tone)}>
              <SelectTrigger className="ai-select"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="santai">Santai & akrab</SelectItem>
                <SelectItem value="formal">Formal & terstruktur</SelectItem>
                <SelectItem value="motivatif">Motivatif</SelectItem>
              </SelectContent>
            </Select>
          </label>
          <div className="ai-depth-control">
            <div><span>Kedalaman</span><strong>{depthLabel}</strong></div>
            <Slider value={depth} onValueChange={setDepth} min={10} max={100} step={5} aria-label="Kedalaman jawaban" />
            <div className="ai-range-labels"><small>Ringkas</small><small>Mendalam</small></div>
          </div>
          <div className="ai-memory-control">
            <div><span>Memory percakapan</span><small>Mengingat konteks di perangkat ini</small></div>
            <Switch checked={memoryEnabled} onCheckedChange={setMemoryEnabled} aria-label="Aktifkan memory percakapan" />
          </div>
        </div>

        <div className="ai-profile-card">
          <div><GraduationCap /></div>
          <p><strong>Fokus saat ini</strong><span>{subjectLabels[subject]} · {depthLabel}</span></p>
          <Check />
        </div>
      </aside>

      <section className="ai-chat-panel">
        <header className="ai-chat-header">
          <div className="ai-chat-person">
            <div className="ai-avatar"><Sparkles /></div>
            <div><strong>Nara</strong><span><i /> {status}</span></div>
          </div>
          <div className="ai-header-actions">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen((value) => !value)} aria-label={sidebarOpen ? "Tutup pengaturan" : "Buka pengaturan"}>
              {sidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
            </Button>
            <Button variant="outline" onClick={resetChat}><RotateCcw /> Percakapan baru</Button>
          </div>
        </header>

        <div className="ai-conversation" aria-live="polite">
          <div className="ai-day-label"><span>Hari ini</span></div>
          <MessageGroup className="ai-message-list">
            {messages.map((message) => (
              <Message key={message.id} align={message.role === "user" ? "end" : "start"}>
                <MessageAvatar className={message.role === "user" ? "ai-user-avatar" : "ai-bot-avatar"}>
                  {message.role === "user" ? <UserRound /> : <Bot />}
                </MessageAvatar>
                <MessageContent>
                  <MessageHeader>{message.role === "user" ? "Kamu" : "Nara"}</MessageHeader>
                  <div className={`ai-message-bubble ${message.role}`}>{renderText(message.content)}</div>
                  {message.role === "assistant" && message.id !== "welcome" && (
                    <MessageFooter>{message.source === "openai" ? `Dihasilkan oleh ${message.model}` : "Mode demo lokal"}</MessageFooter>
                  )}
                </MessageContent>
              </Message>
            ))}
            {loading && (
              <Message align="start">
                <MessageAvatar className="ai-bot-avatar"><Bot /></MessageAvatar>
                <MessageContent><div className="ai-message-bubble assistant ai-thinking"><LoaderCircle /> Nara sedang berpikir…</div></MessageContent>
              </Message>
            )}
          </MessageGroup>

          {messages.length === 1 && (
            <div className="ai-suggestions">
              <span>Coba tanyakan</span>
              <div>{prompts.map(({ icon: Icon, label }) => <button type="button" key={label} onClick={() => void askTutor(label)}><Icon /><span>{label}</span><ArrowUp /></button>)}</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form className="ai-composer" onSubmit={handleSubmit}>
          <div className="ai-composer-box">
            <Textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleKeyDown} placeholder="Tanyakan apa saja yang ingin kamu pahami…" rows={2} maxLength={1500} aria-label="Pertanyaan untuk tutor" />
            <Button type="submit" size="icon-lg" disabled={!draft.trim() || loading} aria-label="Kirim pertanyaan"><ArrowUp /></Button>
          </div>
          <p><BookOpen /> Nara dapat membuat kesalahan. Periksa kembali informasi penting.</p>
        </form>
      </section>
    </main>
  );
}
