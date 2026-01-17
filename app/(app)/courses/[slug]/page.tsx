// import { notFound } from "next/navigation";
// import { CourseHero, ModuleAccordion } from "@/components/courses";
// import { courses } from "@/lib/data/courses";
// import { currentUser } from "@clerk/nextjs/server";

// interface CoursePageProps {
//   params: { slug: string };
// }

// export default async function CoursePage({ params }: CoursePageProps) {
//   const course = courses.find((c) => c.slug === params.slug);

//   if (!course) return notFound();

//   // Get current user for progress tracking (optional)
//   const user = await currentUser();
//   const userId = user?.id ?? null;

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-6">
//       <CourseHero
//         title={course.title}
//         description={course.description}
//         tier={course.tier}
//         thumbnail={course.thumbnail}
//         category={course.category}
//         moduleCount={course.moduleCount}
//         lessonCount={course.lessonCount}
//       />

//       {/* Pass course.slug to ModuleAccordion for correct lesson links */}
//       <ModuleAccordion modules={course.modules ?? []} userId={userId} courseSlug={course.slug} />
//     </div>
//   );
// }


import { notFound } from "next/navigation";
import { CourseHero, ModuleAccordion } from "@/components/courses";
import { courses } from "@/lib/data/courses";
import { currentUser } from "@clerk/nextjs/server";

// Update the props type to show params is a Promise
interface CoursePageProps {
  params: Promise<{ slug: string }>;   // ← important!
}

export default async function CoursePage({ params }: CoursePageProps) {
  // Await it here — this resolves the Promise
  const { slug } = await params;

  const course = courses.find((c) => c.slug === slug);

  if (!course) return notFound();

  const user = await currentUser();
  const userId = user?.id ?? null;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <CourseHero
        title={course.title}
        description={course.description}
        tier={course.tier}
        thumbnail={course.thumbnail}
        category={course.category}
        moduleCount={course.moduleCount}
        lessonCount={course.lessonCount}
      />

      <ModuleAccordion
        modules={course.modules ?? []}
        userId={userId}
        courseSlug={course.slug}
      />
    </div>
  );
}
