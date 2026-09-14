import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, ChevronRight, CircleHelp, Clock3, CodeXml, Lightbulb, MessageCircle, Play, Sparkles, Star, Users } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { Footer, Header } from "@/components/site-chrome";
import { courses, faqs, mentors, methods, reviews } from "@/lib/site-data";

export default function Home() {
  return <><Header/><main>
    <section className="hero section-shell">
      <div className="hero-copy"><div className="eyebrow"><Sparkles size={15}/> Belajar sesuai levelmu</div>
        <h1>Skill teknologi untuk <span>masa depanmu.</span></h1>
        <p>Belajar coding lewat video, live class, atau mentoring privat. Bangun project nyata dengan pengajar yang siap mendampingi setiap langkahmu.</p>
        <div className="hero-actions"><Link href="/courses" className="button">Lihat kelas <ArrowRight size={18}/></Link><Link href="/about" className="button button-ghost"><Play size={17} fill="currentColor"/> Kenali kami</Link></div>
        <div className="hero-proof"><div className="avatar-stack"><span>AR</span><span>DN</span><span>SK</span></div><div><strong>4.9 <Star size={14} fill="currentColor"/></strong><small>Dipercaya pelajar dari berbagai latar</small></div></div>
      </div>
      <div className="hero-visual"><div className="visual-label"><span>●</span> Project-based learning</div><Image src="/digitechlearn-hero.png" alt="Ilustrasi ruang belajar coding Digitechlearn" width={1536} height={1024} priority/><div className="progress-card"><span>Progress belajar</span><strong>78%</strong><div><i/></div></div></div>
    </section>
    <section className="stats-strip section-shell" aria-label="Sorotan Digitechlearn"><div><strong>4</strong><span>jalur teknologi</span></div><div><strong>3</strong><span>metode belajar</span></div><div><strong>1 tahun</strong><span>akses materi</span></div><div><strong>64 sesi</strong><span>maks. mentoring</span></div></section>
    <section className="intro section-shell"><div><span className="kicker">Belajar yang benar-benar terasa</span><h2>Bukan sekadar menonton. Kamu akan memahami, mencoba, dan membangun.</h2></div><p>Digitechlearn membantu siapa saja menguasai keterampilan digital melalui pembelajaran fleksibel, materi praktis, dan pendampingan manusia saat kamu membutuhkannya.</p></section>

    <section className="problem-section"><div className="section-shell problem-grid"><div className="section-title"><span className="kicker light">Masalah yang sering kamu temui</span><h2>Belajar coding seharusnya tidak membuatmu merasa sendirian.</h2></div><div className="problem-list">
      {["Kursus terlalu mahal untuk dicoba","Materi penuh teori, minim praktik","Bingung saat code error","Tidak tahu mulai dari mana"].map((item,i)=><div key={item}><span>0{i+1}</span><p>{item}</p></div>)}
    </div></div></section>

    <section className="content-section section-shell"><div className="section-head"><div><span className="kicker">Pilih jalurmu</span><h2>Mulai dari bidang yang ingin kamu kuasai.</h2></div><Link href="/courses" className="text-link">Lihat semua kelas <ArrowRight size={17}/></Link></div><div className="course-grid">{courses.map(course=><CourseCard key={course.slug} course={course}/>)}</div></section>

    <section className="method-section"><div className="section-shell"><div className="center-head"><span className="kicker">Satu tujuan, tiga cara belajar</span><h2>Pendampingan yang mengikuti kebutuhanmu.</h2><p>Kamu bebas memilih tingkat interaksi, waktu, dan investasi yang paling masuk akal.</p></div><div className="method-grid">{methods.map(method=><article className={`method-card ${method.featured?"featured":""}`} key={method.name}>{method.featured&&<span className="popular">Rekomendasi</span>}<small>{method.badge}</small><h3>{method.name}</h3><p>{method.desc}</p><div className="price">{method.price}<span>{method.suffix}</span></div><ul>{method.features.map(f=><li key={f}><Check size={16}/>{f}</li>)}</ul><Link className={method.featured?"button":"button button-ghost"} href="/register">Pilih metode</Link></article>)}</div></div></section>

    <section className="content-section section-shell"><div className="section-head"><div><span className="kicker">Kenapa Digitechlearn</span><h2>Dibuat agar progresmu nyata.</h2></div></div><div className="value-grid">
      <article><Clock3/><h3>Fleksibel</h3><p>Belajar online dan atur ritme sesuai aktivitasmu.</p></article><article><CodeXml/><h3>Praktis</h3><p>Materi berpusat pada project dan kebutuhan industri.</p></article><article><Users/><h3>Ada pendamping</h3><p>Dapatkan bantuan manusia saat belajar terasa sulit.</p></article><article><Lightbulb/><h3>Portfolio relevan</h3><p>Bangun karya yang mencerminkan skill terbarumu.</p></article>
    </div></section>

    <section className="steps-section"><div className="section-shell"><div className="section-head"><div><span className="kicker light">Cara belajar</span><h2>Empat langkah menuju project pertamamu.</h2></div></div><div className="step-grid">{[["01","Pilih jalur","Tentukan skill yang ingin kamu bangun."],["02","Pilih metode","Video, webinar, atau mentoring privat."],["03","Belajar & praktik","Ikuti materi dan kerjakan project nyata."],["04","Lulus & tampilkan","Dapatkan sertifikat dan portfolio baru."]].map(s=><article key={s[0]}><span>{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p><ChevronRight/></article>)}</div></div></section>

    <section className="content-section section-shell"><div className="section-head"><div><span className="kicker">Belajar dari praktisi</span><h2>Pengajar yang tahu cara membuat hal rumit terasa jelas.</h2></div><Link href="/mentors" className="text-link">Kenali pengajar <ArrowRight size={17}/></Link></div><div className="mentor-row">{mentors.slice(0,3).map(m=><article className={`mentor-mini ${m.tone}`} key={m.name}><div className="mentor-avatar">{m.initials}</div><div><small>{m.role}</small><h3>{m.name}</h3><p>{m.tech.join(" · ")}</p></div></article>)}</div></section>

    <section className="portfolio-band"><div className="section-shell portfolio-grid"><div><span className="kicker light">Outcome yang bisa ditunjukkan</span><h2>Selesai belajar, pulang dengan lebih dari sekadar teori.</h2><p>Kamu membangun project, portfolio profesional, dan kepercayaan diri untuk bekerja, freelance, atau mengembangkan bisnismu.</p><Link href="/courses" className="button lime-button">Temukan kelasmu <ArrowRight size={17}/></Link></div><div className="code-window"><div className="window-bar"><i/><i/><i/><span>portfolio.tsx</span></div><pre><code>{`const nextChapter = {\n  skill: "Fullstack Development",\n  projects: 3,\n  confidence: "ready",\n};\n\nbuild(nextChapter);\n// Your future starts here.`}</code></pre><div className="code-result"><BadgeCheck size={18}/> Project berhasil dibangun</div></div></div></section>

    <section className="review-section section-shell"><div className="center-head"><span className="kicker">Cerita dari peserta</span><h2>Progres mereka dimulai dari satu keputusan.</h2></div><div className="review-grid">{reviews.map(r=><article key={r.name}><div className="stars">{Array.from({length:r.rating}).map((_,i)=><Star key={i} size={15} fill="currentColor"/>)}</div><blockquote>“{r.quote}”</blockquote><div className="review-person"><span>{r.name.split(" ").map(x=>x[0]).join("")}</span><div><strong>{r.name}</strong><small>{r.role} · {r.course}</small></div></div></article>)}</div></section>

    <section className="faq-home section-shell"><div><span className="kicker">Pertanyaan umum</span><h2>Jawaban singkat sebelum kamu mulai.</h2><p>Masih punya pertanyaan lain? Tim kami siap membantu lewat WhatsApp.</p><Link href="/contact" className="text-link"><MessageCircle size={17}/> Hubungi kami</Link></div><div className="faq-list">{faqs.slice(0,4).map(([q,a])=><details key={q}><summary><span>{q}</span><CircleHelp size={19}/></summary><p>{a}</p></details>)}</div></section>

    <section className="final-cta section-shell"><div><span className="eyebrow">Mulai hari ini</span><h2>Project masa depanmu bisa dimulai dari sini.</h2><p>Pilih kelas dan metode belajar yang sesuai dengan levelmu sekarang.</p></div><Link href="/register" className="button lime-button">Daftar sekarang <ArrowRight size={18}/></Link></section>
  </main><Footer/></>;
}

