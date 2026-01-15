
import { courses } from "@/lib/data/courses";
import { notFound } from "next/navigation";

export default function AdminLessonView({
  params,
}: {
  params: { id: string };
}) {
  const lesson = courses
    .flatMap((c) => c.modules)
    .flatMap((m) => m.lessons)
    .find((l) => l.id === params.id);

  if (!lesson) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

      {lesson.videoId && (
        <iframe
          className="w-full h-[450px] rounded-xl"
          src={`https://www.youtube.com/embed/${lesson.videoId}`}
          allowFullScreen
        />
      )}

      {!lesson.videoId && (
        <p className="text-muted-foreground">No video added yet.</p>
      )}
    </div>
  );
}
