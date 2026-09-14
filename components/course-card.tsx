import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import type { courses } from "@/lib/site-data";

export function CourseCard({ course }: { course: (typeof courses)[number] }) {
  const Icon = course.icon;
  return <article className="course-card">
    <div className={`course-icon ${course.color}`}><Icon size={27}/></div>
    <div className="card-meta"><span>{course.level}</span><span><Star size={14} fill="currentColor"/>{course.rating}</span></div>
    <h3>{course.title}</h3><p>{course.short}</p>
    <div className="chip-row">{course.tech.map(item => <span key={item}>{item}</span>)}</div>
    <div className="card-footer"><small>Pengajar<br/><strong>{course.mentor}</strong></small><Link href={`/courses/${course.slug}`} aria-label={`Lihat ${course.title}`}><ArrowUpRight size={20}/></Link></div>
  </article>;
}

