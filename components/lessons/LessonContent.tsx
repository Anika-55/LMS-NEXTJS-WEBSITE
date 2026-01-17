"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

interface LessonContentProps {
  content: string | null | undefined;
}

export function LessonContent({ content }: LessonContentProps) {
  if (!content) return null;

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-6 mb-3 text-white">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-5 mb-2 text-white">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-zinc-300 leading-relaxed mb-4">{children}</p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-violet-500 pl-4 my-4 italic text-zinc-400">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-zinc-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-zinc-300">
              {children}
            </ol>
          ),
          code: ({ children }) => (
            <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-violet-300 font-mono">
              {children}
            </code>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 underline"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <div className="relative w-full aspect-video my-6 rounded-lg overflow-hidden">
              <Image
                src={src || ""}
                alt={alt || "Lesson image"}
                fill
                className="object-contain"
              />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
