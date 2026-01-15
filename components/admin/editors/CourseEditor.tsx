"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Types
export type CourseTier = "free" | "pro" | "ultra";

export interface Lesson {
  id: string;
  title: string;
  videoId?: string;
  duration?: string;
  hasVideo?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons?: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  tier?: CourseTier;
  thumbnail?: string;
  category?: string;
  featured?: boolean;
  modules?: Module[];
}

// Sample initial course
const initialCourse: Course = {
  id: "course-1",
  title: "Next.js Bootcamp",
  description: "Learn Next.js from scratch",
  tier: "pro",
  thumbnail: "",
  category: "Web Development",
  featured: true,
  modules: [
    {
      id: "module-1",
      title: "Introduction",
      lessons: [
        { id: "lesson-1", title: "What is Next.js?", videoId: "" },
      ],
    },
  ],
};

export function CourseEditor() {
  const [course, setCourse] = useState<Course>(initialCourse);

  // Update course field
  const updateCourse = (field: keyof Course, value: any) => {
    setCourse({ ...course, [field]: value });
  };

  // Update module
  const updateModule = (index: number, field: keyof Module, value: any) => {
    const modules = course.modules ? [...course.modules] : [];
    modules[index] = { ...modules[index], [field]: value };
    setCourse({ ...course, modules });
  };

  // Update lesson
  const updateLesson = (
    moduleIndex: number,
    lessonIndex: number,
    field: keyof Lesson,
    value: any
  ) => {
    const modules = course.modules ? [...course.modules] : [];
    const lessons = modules[moduleIndex].lessons ? [...modules[moduleIndex].lessons!] : [];
    lessons[lessonIndex] = { ...lessons[lessonIndex], [field]: value };
    modules[moduleIndex].lessons = lessons;
    setCourse({ ...course, modules });
  };

  // Add module
  const addModule = () => {
    const modules = course.modules ? [...course.modules] : [];
    modules.push({ id: `module-${modules.length + 1}`, title: "", lessons: [] });
    setCourse({ ...course, modules });
  };

  // Add lesson
  const addLesson = (moduleIndex: number) => {
    const modules = course.modules ? [...course.modules] : [];
    const lessons = modules[moduleIndex].lessons ? [...modules[moduleIndex].lessons!] : [];
    lessons.push({ id: `lesson-${lessons.length + 1}`, title: "" });
    modules[moduleIndex].lessons = lessons;
    setCourse({ ...course, modules });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
        <Input
          value={course.title}
          onChange={(e) => updateCourse("title", e.target.value)}
          placeholder="Course Title"
          className="text-2xl font-semibold text-white"
        />
        <Textarea
          value={course.description}
          onChange={(e) => updateCourse("description", e.target.value)}
          placeholder="Course Description"
          className="text-zinc-400"
          rows={3}
        />
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Modules */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-lg mb-2">Modules</h3>

          {course.modules?.map((mod, mi) => (
            <div key={mod.id} className="border border-zinc-800 rounded-xl p-4 space-y-2">
              <Input
                value={mod.title}
                onChange={(e) => updateModule(mi, "title", e.target.value)}
                placeholder="Module Title"
                className="mb-2"
              />

              {/* Lessons */}
              <div className="pl-4 space-y-2">
                {mod.lessons?.map((lesson, li) => (
                  <div key={lesson.id} className="flex flex-col space-y-1">
                    <Input
                      value={lesson.title}
                      onChange={(e) => updateLesson(mi, li, "title", e.target.value)}
                      placeholder="Lesson Title"
                    />
                    <Input
                      value={lesson.videoId || ""}
                      onChange={(e) => updateLesson(mi, li, "videoId", e.target.value)}
                      placeholder="YouTube Video ID"
                      className="text-sm text-zinc-400"
                    />
                  </div>
                ))}
                <Button size="sm" onClick={() => addLesson(mi)}>
                  ➕ Add Lesson
                </Button>
              </div>
            </div>
          ))}

          <Button onClick={addModule}>➕ Add Module</Button>
        </div>

        {/* Sidebar: Settings */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4 h-fit">
          <Label>Thumbnail URL</Label>
          <Input
            value={course.thumbnail || ""}
            onChange={(e) => updateCourse("thumbnail", e.target.value)}
          />

          <Label>Category</Label>
          <Input
            value={course.category || ""}
            onChange={(e) => updateCourse("category", e.target.value)}
          />

          <Label>Access Tier</Label>
          <select
            value={course.tier}
            onChange={(e) => updateCourse("tier", e.target.value as CourseTier)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1"
          >
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="ultra">Ultra</option>
          </select>

          <Label>Featured</Label>
          <input
            type="checkbox"
            checked={course.featured}
            onChange={(e) => updateCourse("featured", e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}
