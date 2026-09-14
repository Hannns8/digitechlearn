import { Code2, Database, Layers3, Smartphone } from "lucide-react";

export const courses = [
  { slug: "frontend-web-development", title: "Frontend Web Development", short: "Bangun antarmuka web yang responsif, interaktif, dan nyaman digunakan.", level: "Pemula—Menengah", rating: "4.9", mentor: "Alya Ramadhani", icon: Code2, color: "blue", tech: ["HTML & CSS", "JavaScript", "React"], projects: ["Landing page responsif", "Dashboard interaktif", "Portfolio developer"] },
  { slug: "backend-web-development", title: "Backend Web Development", short: "Pelajari server, database, API, autentikasi, dan logika aplikasi.", level: "Pemula—Menengah", rating: "4.8", mentor: "Dimas Nugraha", icon: Database, color: "lime", tech: ["Node.js", "REST API", "PostgreSQL"], projects: ["API katalog", "Sistem autentikasi", "Backend marketplace"] },
  { slug: "fullstack-web-development", title: "Fullstack Web Development", short: "Gabungkan frontend dan backend untuk membangun produk web secara utuh.", level: "Menengah", rating: "4.9", mentor: "Raka Pratama", icon: Layers3, color: "coral", tech: ["React", "Node.js", "Database"], projects: ["SaaS mini", "Aplikasi kolaborasi", "Deployment production"] },
  { slug: "flutter-development", title: "Flutter Development", short: "Buat aplikasi lintas platform yang modern dengan satu codebase Flutter.", level: "Pemula—Menengah", rating: "4.8", mentor: "Sinta Kurnia", icon: Smartphone, color: "purple", tech: ["Dart", "Flutter", "Firebase"], projects: ["Aplikasi habit", "Katalog mobile", "Aplikasi real-time"] },
];

export const methods = [
  { name: "Video Learning", price: "Rp120 ribu", suffix: "/kelas", desc: "Belajar mandiri dengan ritme yang kamu tentukan.", badge: "Paling fleksibel", features: ["Video & materi terstruktur", "Forum diskusi", "Project akhir", "Akses 1 tahun", "Sertifikat"] },
  { name: "Live Webinar", price: "Rp1 juta", suffix: "/6 bulan", desc: "Belajar bersama dan bertanya langsung kepada pengajar.", badge: "Paling populer", featured: true, features: ["8 sesi live per bulan", "Hingga 48 sesi", "Rekaman kelas", "Project akhir", "Akses 1 tahun & sertifikat"] },
  { name: "Mentoring 1-on-1", price: "Rp20 juta", suffix: "/4 bulan", desc: "Pendampingan privat untuk progres yang lebih intensif.", badge: "Paling personal", features: ["16 sesi privat per bulan", "Hingga 64 sesi", "Review code & project", "Monitoring progres", "Akses 1 tahun & sertifikat"] },
];

export const mentors = [
  { name: "Alya Ramadhani", role: "Frontend Engineer", initials: "AR", exp: "7+ tahun membangun produk digital dan design system.", tech: ["React", "TypeScript", "Next.js"], course: "Frontend Web Development", tone: "blue" },
  { name: "Dimas Nugraha", role: "Backend Engineer", initials: "DN", exp: "8+ tahun merancang API dan sistem berskala tinggi.", tech: ["Node.js", "Go", "PostgreSQL"], course: "Backend Web Development", tone: "lime" },
  { name: "Raka Pratama", role: "Fullstack Developer", initials: "RP", exp: "9+ tahun mengembangkan produk web dari ide hingga rilis.", tech: ["React", "Node.js", "Cloud"], course: "Fullstack Web Development", tone: "coral" },
  { name: "Sinta Kurnia", role: "Mobile Engineer", initials: "SK", exp: "6+ tahun membangun aplikasi mobile lintas platform.", tech: ["Flutter", "Dart", "Firebase"], course: "Flutter Development", tone: "purple" },
];

export const reviews = [
  { name: "Nadia Putri", role: "Career switcher", course: "Frontend · Webinar", rating: 5, quote: "Materinya runtut dan pengajarnya menjelaskan alasan di balik setiap baris code. Project akhirnya langsung bisa masuk portfolio.", date: "12 Agustus 2026" },
  { name: "Fajar Hidayat", role: "Mahasiswa", course: "Backend · Video", rating: 5, quote: "Untuk pemula seperti saya, alurnya sangat membantu. Forum diskusinya juga membuat saya tidak berhenti lama saat menemui error.", date: "28 Juli 2026" },
  { name: "Maya Sari", role: "Freelancer", course: "Fullstack · 1-on-1", rating: 5, quote: "Mentornya benar-benar memahami target saya. Portfolio saya dibedah dan diarahkan sampai siap dipresentasikan ke klien.", date: "6 Juli 2026" },
];

export const faqs = [
  ["Apakah Digitechlearn cocok untuk pemula?", "Ya. Setiap jalur memiliki materi fundamental dan urutan belajar yang jelas. Kamu juga bisa memilih tingkat pendampingan sesuai kebutuhan."],
  ["Berapa lama saya bisa mengakses materi?", "Semua metode memberikan akses materi selama 1 tahun sejak kelas dimulai."],
  ["Apakah saya mendapat sertifikat?", "Ya, setelah seluruh materi selesai, project akhir dikumpulkan, dinilai pengajar, dan dinyatakan lulus."],
  ["Bisakah jadwal mentoring diubah?", "Bisa. Reschedule mentoring 1-on-1 dapat diajukan paling lambat 6 jam sebelum sesi dimulai, sesuai ketersediaan pengajar pada hari kerja."],
  ["Apakah webinar direkam?", "Ya. Peserta Live Webinar mendapatkan rekaman sesi sehingga materi dapat dipelajari kembali."],
  ["Apakah tersedia cicilan?", "Untuk MVP, informasi skema pembayaran dapat dikonsultasikan langsung melalui WhatsApp customer support."],
];

