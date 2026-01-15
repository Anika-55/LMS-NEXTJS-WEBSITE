export type CourseTier = "free" | "pro" | "ultra";

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  videoId?: string;
  duration?: string;
  completedBy?: string[];
  hasVideo?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description?: string;
  tier?: CourseTier;
  thumbnail?: string;
  category?: string;
  modules: Module[];

  // derived (calculated)
  moduleCount?: number;
  lessonCount?: number;
  completedBy?: string[];
}

/* ======================
   RAW COURSE DATA
====================== */

const rawCourses: Course[] = [
  {
    id: "course-1",
    slug: "nextjs-bootcamp",
    title: "Next.js 16 Bootcamp",
    description: "Learn Next.js 16 from scratch",
    tier: "pro",
    thumbnail: "/images/nextjs.png",
    category: "Web Development",
    modules: [
      {
        id: "module-1",
        title: "Introduction",
        lessons: [
          {
            id: "lesson-1",
            slug: "what-is-nextjs",
            title: "What is Next.js?",
            videoId: "ZVnjOPwW4ZA",
            duration: "08:45",
            hasVideo: true
          },
          {
            id: "lesson-2",
            slug: "install-nextjs",
            title: "Install Next.js 16",
            videoId: "mTz0GXj8NN0",
            duration: "10:20",
            hasVideo: true
          }
        ]
      },

      {
        id: "module-2",
        title: "Routing & App Router",
        lessons: [
          {
            id: "lesson-3",
            slug: "app-router-explained",
            title: "App Router Explained",
            videoId: "mTz0GXj8NN0",
            duration: "12:30",
            hasVideo: true
          },
          {
            id: "lesson-4",
            slug: "dynamic-routing",
            title: "Dynamic Routing",
            videoId: "ZVnjOPwW4ZA",
            duration: "09:40",
            hasVideo: true
          }
        ]
      },

      {
        id: "module-3",
        title: "Styling & UI",
        lessons: [
          {
            id: "lesson-5",
            slug: "tailwind-css",
            title: "Tailwind CSS Setup",
            videoId: "pQN-pnXPaVg",
            duration: "14:10",
            hasVideo: true
          },
          {
            id: "lesson-6",
            slug: "responsive-design",
            title: "Responsive Design",
            videoId: "kUMe1FH4CHE",
            duration: "11:50",
            hasVideo: true
          }
        ]
      },

      {
        id: "module-4",
        title: "Data Fetching",
        lessons: [
          {
            id: "lesson-7",
            slug: "server-components",
            title: "Server Components",
            videoId: "ZVnjOPwW4ZA",
            duration: "13:25",
            hasVideo: true
          },
          {
            id: "lesson-8",
            slug: "fetch-api",
            title: "Fetching with Fetch API",
            videoId: "mTz0GXj8NN0",
            duration: "10:55",
            hasVideo: true
          }
        ]
      },

      {
        id: "module-5",
        title: "Authentication",
        lessons: [
          {
            id: "lesson-9",
            slug: "next-auth",
            title: "NextAuth Setup",
            videoId: "kUMe1FH4CHE",
            duration: "15:00",
            hasVideo: true
          },
          {
            id: "lesson-10",
            slug: "protected-routes",
            title: "Protected Routes",
            videoId: "pQN-pnXPaVg",
            duration: "09:30",
            hasVideo: true
          }
        ]
      },

      {
        id: "module-6",
        title: "Deployment",
        lessons: [
          {
            id: "lesson-11",
            slug: "vercel-deploy",
            title: "Deploy to Vercel",
            videoId: "mTz0GXj8NN0",
            duration: "07:55",
            hasVideo: true
          },
          {
            id: "lesson-12",
            slug: "env-config",
            title: "Environment Variables",
            videoId: "ZVnjOPwW4ZA",
            duration: "06:40",
            hasVideo: true
          }
        ]
      }
    ]
  }
];

/* ======================
   AUTO CALCULATED EXPORT
====================== */

export const courses: Course[] = rawCourses.map(course => {
  const lessonCount = course.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );

  return {
    ...course,
    moduleCount: course.modules.length,
    lessonCount
  };
});
