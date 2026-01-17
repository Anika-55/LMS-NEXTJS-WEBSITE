"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LessonCompleteButtonProps {
  lessonId: string;
  lessonSlug: string;
  isCompleted: boolean;
}

export function LessonCompleteButton({
  lessonId,
  lessonSlug,
  isCompleted: initialCompleted,
}: LessonCompleteButtonProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const res = await fetch("/api/lesson-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId,
          lessonSlug,
          completed: !isCompleted,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setIsCompleted(result.completed);
      }
    });
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      variant={isCompleted ? "ghost" : "default"}
      className={
        isCompleted
          ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
          : "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
      }
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : isCompleted ? (
        <CheckCircle2 className="w-4 h-4 mr-2" />
      ) : (
        <Circle className="w-4 h-4 mr-2" />
      )}
      {isCompleted ? "Completed" : "Mark as Complete"}
    </Button>
  );
}
