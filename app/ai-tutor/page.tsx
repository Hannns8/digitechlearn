import type { Metadata } from "next";
import { AiTutor } from "@/components/ai-tutor";
import "./ai-tutor.css";

export const metadata: Metadata = {
  title: "RuangBelajar AI — Tutor Belajar Personal",
  description: "Tutor AI berbahasa Indonesia dengan gaya, tingkat kedalaman, memory, dan rekomendasi belajar yang dapat disesuaikan.",
};

export default function AiTutorPage() {
  return <AiTutor />;
}
