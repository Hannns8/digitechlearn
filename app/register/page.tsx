import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Header } from "@/components/site-chrome";
export const metadata={title:"Daftar"};
export default function Register(){return <><Header/><main className="auth-page"><section className="auth-panel"><Link href="/" className="brand auth-brand"><span className="brand-mark">D</span><span>digitechlearn</span></Link><span className="kicker">Mulai perjalananmu</span><h1>Buat akun, pilih kelas, mulai membangun.</h1><p>Registrasi ini adalah prototype MVP dan tidak mengirim verifikasi email.</p><AuthForm mode="register"/></section><aside><span>LEARN</span><span>BUILD</span><span>GROW</span><p>“Masa depan dibangun satu project dalam satu waktu.”</p></aside></main></>}

