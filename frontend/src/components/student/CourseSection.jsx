import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import { dummyCourses } from '../../assets/assets';

const CourseSection = () => {
  const featured = dummyCourses.slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Featured Courses</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Learn from industry experts with our top-rated courses
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
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#1A1B24] border border-[#1A1B24]/20 hover:bg-[#1A1B24]/5 rounded-full transition-all duration-200"
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
