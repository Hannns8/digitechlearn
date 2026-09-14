"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LockKeyhole, Mail, UserRound } from "lucide-react";
export function AuthForm({mode}:{mode:"login"|"register"}){
 const [done,setDone]=useState(false);
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setDone(true)}
 if(done)return <div className="auth-success"><CheckCircle2/><h2>{mode==="login"?"Login prototype berhasil":"Akun prototype berhasil dibuat"}</h2><p>Ini adalah simulasi MVP. Integrasi akun akan tersedia pada fase produk berikutnya.</p><Link className="button" href="/courses">Lihat kelas <ArrowRight size={17}/></Link></div>;
 return <form onSubmit={submit} className="auth-form">{mode==="register"&&<label><span>Nama lengkap</span><div><UserRound size={18}/><input required name="name" placeholder="Nama kamu"/></div></label>}<label><span>Email</span><div><Mail size={18}/><input required type="email" name="email" placeholder="nama@example.com"/></div></label><label><span>Password</span><div><LockKeyhole size={18}/><input required type="password" name="password" minLength={6} placeholder="Minimal 6 karakter"/></div></label><button className="button" type="submit">{mode==="login"?"Masuk":"Buat akun"} <ArrowRight size={17}/></button><p>{mode==="login"?"Belum punya akun?":"Sudah punya akun?"} <Link href={mode==="login"?"/register":"/login"}>{mode==="login"?"Daftar sekarang":"Masuk"}</Link></p></form>
}

