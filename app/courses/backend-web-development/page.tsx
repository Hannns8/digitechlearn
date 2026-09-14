import { CourseDetailPage } from "@/components/course-detail-page";
import { courses } from "@/lib/site-data";
export const metadata={title:"Backend Web Development"};
export default function Page(){return <CourseDetailPage course={courses[1]}/>}

