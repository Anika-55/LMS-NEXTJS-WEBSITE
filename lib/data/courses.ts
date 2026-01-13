export type CourseTier = "free" | "pro" | "ultra";

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  completedBy?: string[];
  hasVideo?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons?: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description?: string;
  tier?: "free" | "pro";
  thumbnail?: string;
  category?: string;
  moduleCount?: number;
  lessonCount?: number;
  completedBy?: string[];
  modules?: Module[];
}

// Example courses
export const courses: Course[] = [
  {
    id: "course-1",
    slug: "nextjs-bootcamp",
    title: "Next.js 16 Bootcamp",
    description: "Learn Next.js 16 from scratch",
    tier: "pro",
    thumbnail: "/images/nextjs.png",
    category: "Web Development",
    moduleCount: 3,
    lessonCount: 5,
    modules: [
      {
        id: "module-1",
        title: "Introduction",
        lessons: [
          { id: "lesson-1", slug: "welcome", title: "Welcome" },
          { id: "lesson-2", slug: "setup", title: "Setup Next.js" },
        ],
      },
      {
        id: "module-2",
        title: "Core Concepts",
        lessons: [
          { id: "lesson-3", slug: "pages", title: "Pages & Routing" },
          { id: "lesson-4", slug: "api", title: "API Routes" },
        ],
      },
      {
        id: "module-3",
        title: "Advanced Features",
        lessons: [
          { id: "lesson-5", slug: "ssr", title: "SSR & SSG" },
        ],
      },
    ],
  },
];
