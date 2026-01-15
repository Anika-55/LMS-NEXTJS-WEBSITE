"use client";

import { CourseGridProps as OriginalProps } from "./types";
import { EmptyState } from "@/components/admin/shared";
import { DocumentCardSkeleton } from "@/components/admin/shared/DocumentSkeleton";
import { AdminCourseItem } from "./AdminCourseItem";
import { courses as allCourses, Course } from "@/lib/data/courses";

interface CourseGridProps {
  onCreateCourse: () => void;
  isCreating: boolean;
  searchQuery: string;
}

export function CourseGrid({
  onCreateCourse,
  isCreating,
  searchQuery,
}: CourseGridProps) {
  // Filter courses by search query (title or description)
  const courses: Course[] = allCourses.filter((course) =>
    searchQuery
      ? course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      : true
  );

  if (!courses || courses.length === 0) {
    return (
      <EmptyState
        emoji="📚"
        message="No courses found"
        actionLabel="Create your first course"
        onAction={onCreateCourse}
        isLoading={isCreating}
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <AdminCourseItem key={course.id} course={course} />
      ))}
    </div>
  );
}
