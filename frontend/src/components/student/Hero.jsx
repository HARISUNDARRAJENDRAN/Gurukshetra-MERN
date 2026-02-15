import React from 'react';
import { Link } from 'react-router-dom';

const quickStats = [
  { label: 'Completion', value: '87%' },
  { label: 'Learners', value: '24k+' },
  { label: 'Avg. Rating', value: '4.8/5' },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 pt-28 pb-20 sm:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(15,23,42,0.06)_0%,transparent_36%),radial-gradient(circle_at_90%_85%,rgba(15,23,42,0.05)_0%,transparent_34%)]" />
      <div className="relative z-10 container-base text-center">
        <span className="pill">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-800" />
          Monochrome Learning Platform
        </span>

        <h1 className="mt-6 text-4xl sm:text-6xl font-semibold leading-tight text-slate-900">
          GURUKSHETRA
          <span className="block mt-4 text-xl sm:text-3xl font-medium text-slate-700">
            Build skills faster with focused, guided roadmaps.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-700 max-w-3xl mx-auto">
          A calm, distraction-free LMS that turns courses into outcomes with clear paths, steady momentum, and proof-of-skill projects.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/offered-course"
            className="px-8 py-3 text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-all duration-200 shadow-[var(--shadow-soft)]"
          >
            Explore Courses
          </Link>
          <Link
            to="/prof"
            className="px-8 py-3 text-base font-semibold text-slate-900 border border-slate-300 bg-white hover:border-slate-700 rounded-full transition-all duration-200"
          >
            Start Teaching
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickStats.map((stat, index) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
