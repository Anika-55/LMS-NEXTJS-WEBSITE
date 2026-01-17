"use client";

import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LessonSidebar } from "./LessonSidebar";
import { LessonCompleteButton } from "./LessonCompleteButton";
import { LessonContent } from "./LessonContent";
import { Lesson, Course } from "@/lib/data/courses";
import { GatedFallback } from "@/components/courses/GatedFallback";
import { useUserTier, hasTierAccess } from "@/lib/hooks/use-user-tier";

interface LessonPageContentProps {
  lesson: Lesson;
  course: Course;
  userId: string | null;
}

export function LessonPageContent({
  lesson,
  course,
  userId,
}: LessonPageContentProps) {
  const userTier = useUserTier();
  const hasAccess = hasTierAccess(userTier, course.tier);

  // Flatten lessons for navigation
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      {hasAccess && (
        <LessonSidebar
          courseSlug={course.slug}
          courseTitle={course.title}
          modules={course.modules}
          currentLessonId={lesson.id}
          completedLessonIds={[]} // replace with actual completed lessons
        />
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {hasAccess ? (
          <>
            {/* YouTube Video */}
            {lesson.videoUrl && (
              <div className="mb-6 aspect-video rounded-xl overflow-hidden border border-zinc-800 shadow-lg">
                <iframe
                  src={lesson.videoUrl}
                  title={lesson.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{lesson.title}</h1>
                {lesson.description && (
                  <p className="text-zinc-400">{lesson.description}</p>
                )}
              </div>

              {userId && (
                <LessonCompleteButton
                  lessonId={lesson.id}
                  lessonSlug={lesson.slug}
                  isCompleted={false} // replace with actual completion status
                />
              )}
            </div>

            {/* Lesson Content */}
            {lesson.content && (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 md:p-8 mb-6">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-5 h-5 text-violet-400" />
                  <h2 className="text-lg font-semibold">Lesson Notes</h2>
                </div>
                <LessonContent content={lesson.content} />
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-zinc-800">
              {prevLesson ? (
                <Link href={`/lessons/${prevLesson.slug}`}>
                  <Button variant="ghost">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    {prevLesson.title}
                  </Button>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link href={`/lessons/${nextLesson.slug}`}>
                  <Button className="bg-violet-600 text-white">
                    {nextLesson.title}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </>
        ) : (
          <GatedFallback requiredTier={course.tier} />
        )}
      </div>
    </div>
  );
}
