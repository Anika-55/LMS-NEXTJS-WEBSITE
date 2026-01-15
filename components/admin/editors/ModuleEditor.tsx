"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface Lesson {
  id: string;
  title: string;
  videoId?: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons?: Lesson[];
}

// Sample initial module
const initialModule: Module = {
  id: "module-1",
  title: "Untitled Module",
  description: "",
  lessons: [{ id: "lesson-1", title: "Untitled Lesson", videoId: "" }],
};

export function ModuleEditor() {
  const [module, setModule] = useState<Module>(initialModule);

  // Update module fields
  const updateModuleField = (field: keyof Module, value: string) => {
    setModule({ ...module, [field]: value });
  };

  // Update lesson field
  const updateLessonField = (index: number, field: keyof Lesson, value: string) => {
    const lessons = module.lessons ? [...module.lessons] : [];
    lessons[index] = { ...lessons[index], [field]: value };
    setModule({ ...module, lessons });
  };

  // Add a new lesson
  const addLesson = () => {
    const lessons = module.lessons ? [...module.lessons] : [];
    lessons.push({ id: `lesson-${lessons.length + 1}`, title: "Untitled Lesson", videoId: "" });
    setModule({ ...module, lessons });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Module Header */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
        <Input
          value={module.title}
          onChange={(e) => updateModuleField("title", e.currentTarget.value)}
          placeholder="Module Title"
          className="text-2xl font-semibold text-white"
        />
        <Textarea
          value={module.description}
          onChange={(e) => updateModuleField("description", e.currentTarget.value)}
          placeholder="Add a description..."
          rows={3}
          className="text-zinc-400"
        />
      </div>

      {/* Lessons */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-lg">Lessons</h3>

        {module.lessons?.map((lesson, index) => (
          <div key={lesson.id} className="border border-zinc-800 rounded-xl p-4 space-y-2">
            <Input
              value={lesson.title}
              onChange={(e) => updateLessonField(index, "title", e.currentTarget.value)}
              placeholder="Lesson Title"
            />
            <Input
              value={lesson.videoId || ""}
              onChange={(e) => updateLessonField(index, "videoId", e.currentTarget.value)}
              placeholder="YouTube Video ID"
              className="text-sm text-zinc-400"
            />
          </div>
        ))}

        <Button onClick={addLesson}>➕ Add Lesson</Button>
      </div>
    </div>
  );
}
