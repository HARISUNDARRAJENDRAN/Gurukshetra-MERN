import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';
import { AppContent } from '../../content/AppContent';

const MyEnrollments = () => {
    const navigate = useNavigate();
    const { enrolledCourses } = useContext(AppContent);

    return (
        <>
            <div className="min-h-screen bg-slate-100 pt-24 pb-16">
                <div className="container-base">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">My Enrollments</h1>

                    <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-600 truncate">Course</th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-600 truncate">Duration</th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-600 truncate">Completed</th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-600 truncate">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {enrolledCourses.map((course) => {
                                    const progressPercent = course.totalLectures
                                        ? (course.lectureCompleted / course.totalLectures) * 100
                                        : 0;

                                    return (
                                        <tr key={course.courseId} className="border-b border-slate-100 last:border-none">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={course.courseThumbnail}
                                                        alt={course.courseTitle}
                                                        className="h-14 w-24 rounded-lg object-cover"
                                                    />
                                                    <p className="text-sm font-semibold text-slate-900">{course.courseTitle}</p>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate-700">{course.duration}</td>

                                            <td className="px-5 py-4 min-w-[220px]">
                                                <p className="text-sm text-slate-700 mb-2">
                                                    {course.lectureCompleted} / {course.totalLectures} Lessons
                                                </p>
                                                <Line
                                                    percent={progressPercent}
                                                    strokeWidth={4}
                                                    trailWidth={4}
                                                    strokeColor="#0f172a"
                                                    trailColor="#e2e8f0"
                                                />
                                            </td>

                                            <td className="px-5 py-4">
                                                <button
                                                    onClick={() => navigate(`/player/${course.courseId}`)}
                                                    className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-slate-800"
                                                >
                                                    Watch Course
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {enrolledCourses.length === 0 && (
                            <div className="px-5 py-10 text-center text-sm text-slate-600">
                                You are not enrolled in any courses yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default MyEnrollments;
 