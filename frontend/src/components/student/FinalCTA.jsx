import React from 'react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <section className="section bg-slate-100 relative overflow-hidden border-y border-slate-200">
      <div className="container-base">
        <div className="relative overflow-hidden rounded-[32px] border-2 border-slate-900 bg-white px-8 py-12 sm:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Ready to level up your learning?
          </h2>
          <p className="mt-4 text-slate-600">
            Join Gurukshetra today and build skills that open doors.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/offered-course"
              className="px-8 py-3 text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-all duration-200 shadow-[var(--shadow-soft)]"
            >
              Explore Courses
            </Link>
            <Link
              to="/prof"
              className="px-8 py-3 text-base font-semibold text-slate-900 border-2 border-slate-900 bg-white hover:bg-slate-100 rounded-full transition-all duration-200"
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
