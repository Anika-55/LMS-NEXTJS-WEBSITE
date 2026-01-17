"use client";

import { notFound } from "next/navigation";
import { courses, type Lesson } from "@/lib/data/courses";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LessonPageProps {
  params: { slug: string };
}

export default function LessonPage({ params }: LessonPageProps) {
  type LessonWithMeta = Lesson & {
    courseTitle: string;
    moduleTitle: string;
    courseSlug: string;
  };

  let lessonFound: LessonWithMeta | null = null;

  for (const course of courses) {
    for (const module of course.modules ?? []) {
      const lesson = module.lessons?.find(l => l.slug === params.slug);
      if (lesson) {
        lessonFound = {
          ...lesson,
          courseTitle: course.title,
          courseSlug: course.slug,
          moduleTitle: module.title,
        };
        break;
      }
    }
    if (lessonFound) break;
  }

  if (!lessonFound) return notFound();

  // local completion state
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`lesson_${lessonFound.id}`);
    if (saved === "true") setCompleted(true);
  }, [lessonFound.id]);

  const toggleCompleted = () => {
    const next = !completed;
    setCompleted(next);
    localStorage.setItem(`lesson_${lessonFound.id}`, String(next));
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 text-white space-y-6">
      <h1 className="text-4xl font-bold">{lessonFound.title}</h1>

      <p className="text-zinc-400">
        Course: {lessonFound.courseTitle} • Module: {lessonFound.moduleTitle}
      </p>

      {lessonFound.hasVideo && lessonFound.videoId && (
        <div className="aspect-video rounded-xl overflow-hidden border border-zinc-800">
          <iframe
            src={`https://www.youtube.com/embed/${lessonFound.videoId}`}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      )}

      <button
        onClick={toggleCompleted}
        className={cn(
          "px-4 py-2 rounded-md font-semibold",
          completed
            ? "bg-emerald-500 text-black"
            : "bg-violet-600 hover:bg-violet-500"
        )}
      >
        {completed ? "Completed ✅" : "Mark as Complete"}
      </button>
    </div>
  );
}
