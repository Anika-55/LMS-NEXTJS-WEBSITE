"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ListPageHeader, SearchInput } from "@/components/admin/shared";
import { CourseGrid } from "./CourseGrid";
import { courses as initialCourses, Course } from "@/lib/data/courses";

export function CourseList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCourse = () => {
    setIsCreating(true);

    const newCourse: Course = {
      id: crypto.randomUUID(),
      title: "New Course",
      description: "",
      tier: "free",
      thumbnail: "",
      category: "",
      featured: false,
      modules: [],
    };

    // Add the new course to the local array
    setCourses((prev) => [newCourse, ...prev]);
    setIsCreating(false);

    // Navigate to the course editor page
    router.push(`/admin/courses/${newCourse.id}`);
  };

  return (
    <div className="space-y-6">
      <ListPageHeader
        title="Courses"
        description="Manage your courses and their content"
        actionLabel="New course"
        onAction={handleCreateCourse}
        isLoading={isCreating}
      />

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search courses..."
      />

      {/* Course grid */}
      <CourseGrid
        onCreateCourse={handleCreateCourse}
        isCreating={isCreating}
        searchQuery={searchQuery}
      />
    </div>
  );
}
