"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  slug?: string;
  content?: string;
  videoId?: string; // YouTube video ID
}

// Sample initial lesson
const initialLesson: Lesson = {
  id: "lesson-1",
  title: "Untitled Lesson",
  description: "",
  slug: "untitled-lesson",
  content: "",
  videoId: "",
};

export function LessonEditor() {
  const [lesson, setLesson] = useState<Lesson>(initialLesson);

  const updateField = (field: keyof Lesson, value: string) => {
    setLesson({ ...lesson, [field]: value });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top bar placeholder */}
      <div className="flex justify-end gap-3 text-sm text-zinc-400">
        Manual Editor • Preview not available
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Title & Description */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-3">
            <Input
              value={lesson.title}
              onChange={(e) => updateField("title", e.currentTarget.value)}
              placeholder="Lesson Title"
              className="text-2xl font-semibold text-white"
            />
            <Textarea
              value={lesson.description}
              onChange={(e) => updateField("description", e.currentTarget.value)}
              placeholder="Add a short description..."
              rows={3}
              className="text-zinc-400"
            />
          </div>

          {/* Slug */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <Label>URL Slug</Label>
            <Input
              value={lesson.slug}
              onChange={(e) => updateField("slug", e.currentTarget.value)}
              placeholder="lesson-slug"
            />
          </div>

          {/* Content / Rich Text */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <Label>Lesson Content</Label>
            <Textarea
              value={lesson.content}
              onChange={(e) => updateField("content", e.currentTarget.value)}
              placeholder="Write lesson content here..."
              rows={10}
              className="text-zinc-400"
            />
          </div>
        </div>

        {/* Right Column - Video */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 lg:sticky lg:top-6 space-y-3">
            <Label>Lesson Video (YouTube ID)</Label>
            <Input
              value={lesson.videoId}
              onChange={(e) => updateField("videoId", e.currentTarget.value)}
              placeholder="ZVnjOPwW4ZA"
            />
            {lesson.videoId && (
              <div className="mt-3">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${lesson.videoId}`}
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
