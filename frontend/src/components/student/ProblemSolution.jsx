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
      <div className="absolute -top-40 right-0 h-72 w-72 rounded-full bg-slate-200/40 blur-3xl" />
      <div className="container-base">
        <div className="text-center mb-12">
          <span className="pill">Why it works</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Problem → Solution</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            We remove the usual learning friction with clear paths, steady pacing, and expert support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.problem} className="card p-6 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                Problem
              </div>
              <p className="mt-3 text-slate-800 font-medium">{item.problem}</p>
              <div className="mt-5 h-px bg-slate-100" />
              <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                Solution
              </div>
              <p className="mt-3 text-slate-600">{item.solution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ProblemSolution);
