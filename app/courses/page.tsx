import { CourseCard } from "@/components/course-card";
import { Footer, Header, PageHero } from "@/components/site-chrome";
import { courses } from "@/lib/site-data";
export const metadata={title:"Kelas"};
export default function Courses(){return <><Header/><main><PageHero eyebrow="Katalog kelas" title="Pilih skill yang ingin kamu bangun." text="Empat jalur praktis untuk memulai atau memperdalam karier di software development."/><section className="section-shell inner-section"><div className="filter-note"><span>4 kelas tersedia</span><span>Video · Webinar · 1-on-1</span></div><div className="course-grid">{courses.map(c=><CourseCard key={c.slug} course={c}/>)}</div></section></main><Footer/></>}

