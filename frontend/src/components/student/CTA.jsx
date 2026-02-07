import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1A1B24] to-[#0f1016] relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#1A1B24]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#1A1B24]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
          Start your learning journey today
        </h2>
        <p className="mt-4 text-white/80 text-lg max-w-xl mx-auto">
          Join thousands of students and educators on Gurukshetra. Your next skill is just a click away.
        </p>
        <Link
          to="/offered-course"
          className="inline-block mt-8 px-8 py-3.5 text-base font-semibold text-[#1A1B24] bg-white hover:bg-gray-50 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default React.memo(CTA);
