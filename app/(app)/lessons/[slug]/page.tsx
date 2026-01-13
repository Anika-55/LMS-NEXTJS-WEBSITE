import { notFound } from "next/navigation";
import { courses } from "@/data/courses";

interface LessonPageProps {
  params: { slug: string };
}

export default function LessonPage({ params }: LessonPageProps) {
  let lessonFound = null;

  for (const course of courses) {
    for (const module of course.modules ?? []) {
      const lesson = module.lessons?.find((l) => l.slug === params.slug);
      if (lesson) {
        lessonFound = { ...lesson, courseTitle: course.title, moduleTitle: module.title };
        break;
      }
    }
    if (lessonFound) break;
  }

  if (!lessonFound) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{lessonFound.title}</h1>
      <p className="text-zinc-400 mb-2">
        Course: {lessonFound.courseTitle} | Module: {lessonFound.moduleTitle}
      </p>
      <div className="mt-6 text-white bg-zinc-800 p-4 rounded-lg">
        {/* Your lesson content here */}
        Lesson content goes here...
      </div>
    </div>
  );
}
