import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import { dummyCourses } from '../../assets/assets';

const CourseSection = () => {
  const featured = dummyCourses.slice(0, 4);

  return (
    <section className="section bg-white">
      <div className="container-base">
        <div className="mb-12 text-center">
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B7FA66]" />
            Featured
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Featured Courses</h2>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            Learn from industry experts with our top-rated courses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/offered-course"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-slate-900 border-2 border-slate-900 hover:bg-[#B7FA66] rounded-full transition-all duration-200"
          >
            View All Courses
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CourseSection);
