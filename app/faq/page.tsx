import { CircleHelp } from "lucide-react";
import { Footer, Header, PageHero } from "@/components/site-chrome";
import { faqs } from "@/lib/site-data";
export const metadata={title:"FAQ"};
export default function FAQ(){return <><Header/><main><PageHero eyebrow="FAQ" title="Pertanyaan yang paling sering ditanyakan." text="Temukan jawaban tentang kelas, metode belajar, sertifikat, dan jadwal mentoring."/><section className="section-shell faq-page"><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary><span>{q}</span><CircleHelp size={19}/></summary><p>{a}</p></details>)}</div></section></main><Footer/></>}

