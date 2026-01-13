import { notFound } from "next/navigation";


import { CourseHero, ModuleAccordion } from "@/components/courses";
import { courses } from "@/lib/data/courses";

interface CoursePageProps {
  params: { slug: string };
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) return notFound();

  return (
    <div className="p-6">
      <CourseHero
        title={course.title}
        description={course.description}
        tier={course.tier}
        thumbnail={course.thumbnail}
        category={course.category}
        moduleCount={course.moduleCount}
        lessonCount={course.lessonCount}
      />
      <ModuleAccordion modules={course.modules ?? []} userId="user-1" />
    </div>
  );
}
