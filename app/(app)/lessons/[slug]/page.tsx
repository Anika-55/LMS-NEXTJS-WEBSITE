import { notFound } from "next/navigation";
import { courses } from "@/lib/data/courses";

interface LessonPageProps {
  params: { slug: string };
}

export default function LessonPage({ params }: LessonPageProps) {
  let lessonFound: any = null;

  for (const course of courses) {
    for (const module of course.modules ?? []) {
      const lesson = module.lessons?.find((l) => l.slug === params.slug);
      if (lesson) {
        lessonFound = {
          ...lesson,
          courseTitle: course.title,
          moduleTitle: module.title,
        };
        break;
      }
    }
    if (lessonFound) break;
  }

  if (!lessonFound) return notFound();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">{lessonFound.title}</h1>

      <p className="text-zinc-400">
        Course: {lessonFound.courseTitle} • Module: {lessonFound.moduleTitle}
      </p>

      {lessonFound.videoId && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800">
          <iframe
            src={`https://www.youtube.com/embed/${lessonFound.videoId}`}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
