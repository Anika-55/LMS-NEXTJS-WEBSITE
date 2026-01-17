"use client";

import { notFound } from "next/navigation";
import { courses, type Lesson } from "@/lib/data/courses";
import { LessonSidebar } from "@/components/lessons/LessonSidebar";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";


interface LessonPageProps {
  params: { slug: string };
}

export default function LessonPage({ params }: LessonPageProps) {
  type LessonWithMeta = Lesson & {
    courseTitle: string;
    moduleTitle: string;
    courseSlug: string;
    moduleId: string;
  };

  let lessonFound: LessonWithMeta | null = null;

  for (const course of courses) {
    for (const module of course.modules ?? []) {
      const lesson = module.lessons?.find((l) => l.slug === params.slug);
      if (lesson) {
        lessonFound = {
          ...lesson,
          courseTitle: course.title,
          courseSlug: course.slug,
          moduleTitle: module.title,
          moduleId: module.id,
        };
        break;
      }
    }
    if (lessonFound) break;
  }

  if (!lessonFound) return notFound();

  // -----------------------------
  // Handle completed lessons (simulate with localStorage)
  // -----------------------------
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`completed_${lessonFound?.courseSlug}`);
    if (saved) setCompletedLessons(JSON.parse(saved));
  }, [lessonFound?.courseSlug]);

  const toggleLessonCompleted = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const isCompleted = prev.includes(lessonId);
      const updated = isCompleted
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId];

      localStorage.setItem(
        `completed_${lessonFound?.courseSlug}`,
        JSON.stringify(updated),
      );
      return updated;
    });
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="min-h-screen bg-[#09090b] text-white relative overflow-hidden flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <LessonSidebar
        courseSlug={lessonFound.courseSlug}
        courseTitle={lessonFound.courseTitle}
        modules={courses.find(c => c.slug === lessonFound?.courseSlug)?.modules ?? null}
        currentLessonId={lessonFound.id}
        completedLessonIds={completedLessons}
      />

      {/* Main content */}
      <div className="relative flex-1 max-w-6xl mx-auto p-6 sm:p-8 md:p-10 space-y-6 z-10">
        {/* Gradient Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-[float_6s_ease-in-out_infinite]" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[100px] animate-[float_6s_ease-in-out_infinite]"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[80px] animate-[float_6s_ease-in-out_infinite]"
          style={{ animationDelay: "2s" }}
        />

        {/* Noise Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Lesson Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white">{lessonFound.title}</h1>
        <p className="text-zinc-400 text-lg">
          Course: {lessonFound.courseTitle} • Module: {lessonFound.moduleTitle}
        </p>

        {/* Video */}
        {lessonFound.hasVideo && lessonFound.videoId && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 shadow-lg hover:scale-[1.02] transition-transform">
            <iframe
              src={`https://www.youtube.com/embed/${lessonFound.videoId}`}
              className="absolute inset-0 w-full h-full"
              title={lessonFound.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Mark Complete Button */}
        <button
          onClick={() => toggleLessonCompleted(lessonFound!.id)}
          className={cn(
            "px-4 py-2 rounded-md font-semibold transition-colors",
            completedLessons.includes(lessonFound.id)
              ? "bg-emerald-500 text-black"
              : "bg-violet-600 hover:bg-violet-500 text-white",
          )}
        >
          {completedLessons.includes(lessonFound.id)
            ? "Completed ✅"
            : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
}
