"use client";

import { CourseList } from "@/components/courses";
import { courses } from "@/lib/data/courses";

export default function CoursesPage() {
  // Pass the local courses array to your CourseList
  return <CourseList courses={courses} />;
}
