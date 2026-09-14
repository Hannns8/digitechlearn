import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Header } from "@/components/site-chrome";
export const metadata={title:"Masuk"};
export default function Login(){return <><Header/><main className="auth-page"><section className="auth-panel"><Link href="/" className="brand auth-brand"><span className="brand-mark">D</span><span>digitechlearn</span></Link><span className="kicker">Selamat datang kembali</span><h1>Masuk dan lanjutkan langkahmu.</h1><p>Gunakan format email yang valid. Untuk prototype ini, email tidak harus aktif.</p><AuthForm mode="login"/></section><aside><span>LEARN</span><span>BUILD</span><span>GROW</span><p>“Skill baru mengubah cara kita melihat kemungkinan.”</p></aside></main></>}

