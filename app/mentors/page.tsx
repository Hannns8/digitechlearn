import { Footer, Header, PageHero } from "@/components/site-chrome";
import { mentors } from "@/lib/site-data";
export const metadata={title:"Pengajar"};
export default function Mentors(){return <><Header/><main><PageHero eyebrow="Pengajar Digitechlearn" title="Belajar bersama orang yang pernah membangunnya." text="Praktisi berpengalaman yang tidak hanya menguasai teknologi, tetapi juga tahu cara menjelaskannya dengan jelas."/><section className="section-shell inner-section mentor-grid">{mentors.map(m=><article className="mentor-card" key={m.name}><div className={`mentor-portrait ${m.tone}`}><span>{m.initials}</span><small>Available to mentor</small></div><div className="mentor-copy"><span>{m.role}</span><h2>{m.name}</h2><p>{m.exp}</p><div className="chip-row">{m.tech.map(t=><i key={t}>{t}</i>)}</div><hr/><small>Mengajar</small><strong>{m.course}</strong></div></article>)}</section></main><Footer/></>}

