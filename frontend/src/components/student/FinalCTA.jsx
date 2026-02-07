import React from 'react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-slate-200/40 blur-3xl" />
      <div className="container-base">
        <div className="card-strong p-10 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Ready to level up your learning?
          </h2>
          <p className="mt-4 text-slate-600">
            Join Gurukshetra today and build skills that open doors.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/offered-course"
              className="px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 rounded-full transition-all duration-200 shadow-[var(--shadow-soft)]"
            >
              Explore Courses
            </Link>
            <Link
              to="/prof"
              className="px-8 py-3 text-base font-semibold text-slate-700 border border-slate-200 bg-white/70 hover:border-slate-900 hover:text-slate-900 rounded-full transition-all duration-200"
            >
              Start Teaching
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(FinalCTA);
