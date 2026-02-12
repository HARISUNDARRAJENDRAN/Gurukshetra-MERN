import React from 'react';

const ProblemSolution = () => {
  const items = [
    {
      problem: 'Scattered resources and unclear learning paths',
      solution: 'Structured, curated roadmaps with clear milestones for each skill.'
    },
    {
      problem: 'Low engagement and poor course completion',
      solution: 'Interactive lessons, progress tracking, and bite‑sized content to stay on track.'
    },
    {
      problem: 'Limited access to expert guidance',
      solution: 'Learn from vetted instructors with community support and Q&A.'
    }
  ];

  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="absolute -top-32 right-10 h-40 w-40 rounded-full bg-[#B7FA66]/50 blur-3xl" />
      <div className="container-base">
        <div className="text-center mb-12">
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B7FA66]" />
            Why it works
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Problem → Solution</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            We remove the usual learning friction with clear paths, steady pacing, and expert support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.problem}
              className="rounded-3xl border-2 border-slate-900 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-900" />
                Problem
              </div>
              <p className="mt-3 text-slate-900 font-medium">{item.problem}</p>
              <div className="mt-5 h-px bg-slate-200" />
              <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <span className="h-2 w-2 rounded-full bg-[#B7FA66]" />
                Solution
              </div>
              <p className="mt-3 text-slate-700">{item.solution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ProblemSolution);
