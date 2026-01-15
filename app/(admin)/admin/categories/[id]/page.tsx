"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CourseEditor } from "@/components/admin/editors/CourseEditor";
import { courses as initialCourses, Course } from "@/lib/data/courses";

interface EditCoursePageProps {
  params: { id: string };
}

export default function EditCoursePage({ params }: EditCoursePageProps) {
  const router = useRouter();
  const { id } = params;

  // Find the course by ID from your local array
  const course = initialCourses.find((c) => c.id === id) ?? initialCourses[0];

  // Optional: local state to edit the course
  const [currentCourse, setCurrentCourse] = useState<Course>(course);

  return (
    <CourseEditor
      initialCourse={currentCourse}
      onCourseChange={setCurrentCourse} 
    />
  );
}
