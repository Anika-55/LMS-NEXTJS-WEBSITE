"use client";

import { CourseEditor } from "@/components/admin/editors/CourseEditor";
import { courses, Course } from "@/lib/data/courses";

interface EditCoursePageProps {
  params: { id: string };
}

export default function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = params;

  // Find the course by id from your local courses array
  const course: Course = courses.find((c) => c.id === id) ?? courses[0];

  return <CourseEditor initialCourse={course} />;
}
