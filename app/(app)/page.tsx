import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Rocket, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    
    <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
      
        {/* Animated gradient mesh background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
          {/* navigation */}
          <Header />
          {/* Hero section */}
          <main className="relative z-10">
              
          </main>

          {/* /* Featured Courses */} 
        <section id="courses" className="px-6 lg:px-12 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Courses built for{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                real results
              </span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Each course is packed with modules and lessons designed to take
              you from zero to job-ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* {courses.map((course) => (
              <CourseCard
                key={course.slug!.current!}
                slug={{ current: course.slug!.current! }}
                title={course.title}
                description={course.description}
                tier={course.tier}
                thumbnail={course.thumbnail}
                moduleCount={course.moduleCount}
                lessonCount={course.lessonCount}
              />
            ))} */}
          </div>

          <div className="text-center mt-10">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-zinc-700 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                View All Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>


            {/* Testimonials */}
        <section
          id="testimonials"
          className="px-6 lg:px-12 py-20 max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Students{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                love it
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Chen",
                role: "Junior Developer",
                content:
                  "Sonny's teaching style is incredible. I went from knowing nothing to landing my first dev job in 6 months!",
                avatar: "🧑‍💻",
              },
              {
                name: "Sarah Miller",
                role: "Freelancer",
                content:
                  "The Ultra tier is worth every penny. The exclusive content and 1-on-1 sessions transformed my career.",
                avatar: "👩‍💼",
              },
              {
                name: "James Wilson",
                role: "CS Student",
                content:
                  "Best investment I've made. The Pro courses filled gaps my university courses never covered.",
                avatar: "🎓",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`star-${testimonial.name}-${i}`}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-zinc-300 mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-zinc-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      
                   {/* CTA Section */}
        <section className="px-6 lg:px-12 py-20 max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-cyan-600/20 border border-white/10 p-12 md:p-20 text-center overflow-hidden">
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-xl" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/30">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to level up your skills?
              </h2>
              <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
                Start with free courses or unlock everything with Pro and Ultra.
                Your coding journey begins now.
              </p>
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-xl shadow-violet-600/30 px-10 h-14 text-lg font-semibold"
                >
                  View Pricing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
          </section>
          
          {/* Footer */}
        <footer className="px-6 lg:px-12 py-12 border-t border-zinc-800/50 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">Anika&apos;s Academy</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-zinc-500">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-sm text-zinc-600">
              © 2026 Anika&apos;s Academy. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
  );
}


