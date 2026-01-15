"use client";

import { CourseCard } from "@/components/courses";
import type { Course } from "@/lib/data/courses";

interface AdminCourseItemProps {
  course: Course;
}

export function AdminCourseItem({ course }: AdminCourseItemProps) {
  return (
    <CourseCard
      href={`/admin/courses/${course.id}`}
      title={course.title}
      description={course.description ?? ""}
      tier={course.tier ?? "free"}
      thumbnail={
        course.thumbnail
          ? { asset: { _id: "", url: course.thumbnail } }
          : null
      }
      moduleCount={course.modules?.length ?? 0}
      lessonCount={
        course.modules?.reduce((total, mod) => total + (mod.lessons?.length ?? 0), 0) ?? 0
      }
    />
  );
}
