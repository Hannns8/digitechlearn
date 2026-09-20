import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";

export function Header() {
  return <header className="site-header"><nav className="nav-shell" aria-label="Navigasi utama">
    <Link href="/" className="brand" aria-label="Digitechlearn beranda"><span className="brand-mark">D</span><span>digitechlearn</span></Link>
    <div className="nav-links"><Link href="/about">Tentang</Link><Link href="/courses">Kelas</Link><Link href="/ai-tutor">AI Tutor</Link><Link href="/pricing">Metode Belajar</Link><Link href="/mentors">Pengajar</Link><Link href="/faq">FAQ</Link></div>
    <div className="nav-actions"><Link href="/login" className="login-link">Masuk</Link><Link href="/register" className="button button-sm">Mulai belajar</Link></div>
    <details className="mobile-menu"><summary aria-label="Buka menu"><Menu /></summary><div><Link href="/about">Tentang Kami</Link><Link href="/courses">Kelas</Link><Link href="/ai-tutor">AI Tutor</Link><Link href="/pricing">Metode Belajar</Link><Link href="/mentors">Pengajar</Link><Link href="/reviews">Review</Link><Link href="/faq">FAQ</Link><Link href="/login">Masuk</Link></div></details>
  </nav></header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="section-shell footer-grid">
    <div><Link href="/" className="brand brand-light"><span className="brand-mark">D</span><span>digitechlearn</span></Link><p>Belajar teknologi. Bangun skill.<br/>Ciptakan masa depan.</p></div>
    <div><strong>Jelajahi</strong><Link href="/courses">Semua kelas</Link><Link href="/pricing">Metode & harga</Link><Link href="/mentors">Pengajar</Link></div>
    <div><strong>Perusahaan</strong><Link href="/about">Tentang kami</Link><Link href="/reviews">Review peserta</Link><Link href="/faq">FAQ</Link></div>
    <div><strong>Butuh bantuan?</strong><p>Tim kami siap membantu kendala akun, pembayaran, dan kelas.</p><a className="wa-link" href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp kami</a></div>
  </div><div className="section-shell footer-bottom"><span>© 2026 Digitechlearn</span><span>Belajar dari mana saja di Indonesia</span></div></footer>;
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="page-hero section-shell"><span className="kicker">{eyebrow}</span><h1>{title}</h1><p>{text}</p></section>;
}
