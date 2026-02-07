import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const CourseCard = ({ course }) => {
  // Calculate average rating
  const avgRating =
    course.courseRatings.length > 0
      ? course.courseRatings.reduce((sum, r) => sum + r.rating, 0) / course.courseRatings.length
      : 0;

  const discountedPrice = (course.coursePrice - (course.coursePrice * course.discount) / 100).toFixed(2);

  // Count total lectures
  const totalLectures = course.courseContent.reduce(
    (sum, ch) => sum + ch.chapterContent.length,
    0
  );

  return (
    <Link
      to={`/course/${course._id}`}
      className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          width="400"
          height="225"
          loading="lazy"
        />
        {course.discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {course.discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-[#1A1B24] transition-colors duration-200">
          {course.courseTitle}
        </h3>

        <p className="text-xs text-gray-400 mt-1">{totalLectures} lectures</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-sm font-medium text-gray-700">{avgRating > 0 ? avgRating.toFixed(1) : 'New'}</span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <img
                key={s}
                src={s <= Math.round(avgRating) ? assets.star : assets.star_blank}
                alt=""
                className="w-3.5 h-3.5"
                width="14"
                height="14"
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({course.courseRatings.length})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold text-gray-900">${discountedPrice}</span>
          {course.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">${course.coursePrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default React.memo(CourseCard);
