"use client";

import { useAuth } from "@clerk/nextjs";
import { CourseHero } from "./CourseHero";
import { ModuleAccordion } from "./ModuleAccordion";
import { CourseCompleteButton } from "./CourseCompleteButton";
import { GatedFallback } from "./GatedFallback";
import { useUserTier, hasTierAccess } from "@/lib/hooks/use-user-tier";
import { Skeleton } from "../ui/skeleton";

interface Lesson {
  id: string;
  completedBy?: string[]; // user IDs
  title?: string;
}

interface Module {
  id: string;
  title?: string;
  lessons?: Lesson[];
}

export interface Course {
  id: string;
  slug?: string;
  title: string;
  description?: string | null;
  tier?: string;
  thumbnail?: string;
  category?: string;
  moduleCount?: number;
  lessonCount?: number;
  completedBy?: string[]; // user IDs
  modules?: Module[];
}

interface CourseContentProps {
  course: Course;
  userId: string | null;
}

export function CourseContent({ course, userId }: CourseContentProps) {
  const { isLoaded: isAuthLoaded } = useAuth();
  const userTier = useUserTier();

  // Check if user has access to this course
  const hasAccess = hasTierAccess(userTier, course.tier);

  // Calculate completion stats from lesson data
  let totalLessons = 0;
  let completedLessons = 0;

  for (const m of course.modules ?? []) {
    for (const l of m.lessons ?? []) {
      totalLessons++;
      if (userId && l.completedBy?.includes(userId)) {
        completedLessons++;
      }
    }
  }

  const isCourseCompleted = userId
    ? (course.completedBy?.includes(userId) ?? false)
    : false;

  if (!isAuthLoaded) {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <>
      <CourseHero
        title={course.title}
        description={course.description ?? null}
        tier={course.tier}
        thumbnail={course.thumbnail}
        category={course.category}
        moduleCount={course.moduleCount}
        lessonCount={course.lessonCount}
      />

      {hasAccess ? (
        <div className="space-y-8">
          {/* Course completion progress */}
          {userId && (
            <CourseCompleteButton
              courseId={course.id}
              courseSlug={course.slug ?? ""}
              isCompleted={isCourseCompleted}
              completedLessons={completedLessons}
              totalLessons={totalLessons}
            />
          )}

          <ModuleAccordion modules={course.modules ?? []} userId={userId} />
        </div>
      ) : (
        <GatedFallback requiredTier={course.tier} />
      )}
    </>
  );
}
