import React from 'react';
import { assets } from '../../assets/assets';

const CourseRating = ({ averageRating = 0, totalRatings = 0 }) => {
  const safeRating = Number.isFinite(averageRating) ? averageRating : 0;

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
      <span className="font-semibold text-slate-900">{safeRating > 0 ? safeRating.toFixed(1) : 'New'}</span>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <img
            key={star}
            src={star <= Math.round(safeRating) ? assets.star : assets.star_blank}
            alt=""
            className="h-4 w-4"
          />
        ))}
      </div>
      <span>({totalRatings} ratings)</span>
    </div>
  );
};

export default React.memo(CourseRating);
