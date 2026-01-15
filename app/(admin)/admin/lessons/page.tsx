
import { courses } from "@/lib/data/courses";
import Link from "next/link";


export default function LessonsPage() {
  const lessons = courses
    .flatMap((c) => c.modules)
    .flatMap((m) => m.lessons);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">All Lessons</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/lessons/${lesson.id}`}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <h2 className="font-semibold">{lesson.title}</h2>
            <p className="text-sm text-zinc-500">ID: {lesson.id}</p>
            {lesson.videoId && (
              <p className="text-xs text-emerald-500 mt-1">YouTube video attached</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
