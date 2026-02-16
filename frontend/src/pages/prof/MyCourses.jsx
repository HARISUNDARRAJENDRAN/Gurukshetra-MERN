import React, { useContext, useEffect } from 'react';
import { AppContent } from '../../content/AppContent';

const MyCourses = () => {
    const { courses, fetchEducatorCourses } = useContext(AppContent);

    useEffect(() => {
        fetchEducatorCourses();
    }, [fetchEducatorCourses]);

    return (
        <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                <h1 className="text-3xl font-semibold text-slate-900">My Courses</h1>
                <p className="mt-2 text-sm text-slate-600">Manage and review your published and draft courses.</p>

                {courses.length === 0 ? (
                    <p className="mt-6 text-sm text-slate-600">No courses found yet. Create your first course from Add Course.</p>
                ) : (
                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-600">Course</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-600">Category</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-600">Price</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr key={course._id} className="border-b border-slate-100 last:border-none">
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={course.courseThumbnail || 'https://placehold.co/160x90?text=Course'}
                                                    alt={course.courseTitle}
                                                    className="h-12 w-20 rounded-lg object-cover"
                                                />
                                                <p className="text-sm font-medium text-slate-900">{course.courseTitle}</p>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-sm text-slate-700">{course.category || 'General'}</td>
                                        <td className="px-3 py-3 text-sm text-slate-700">${Number(course.coursePrice || 0).toFixed(2)}</td>
                                        <td className="px-3 py-3 text-sm text-slate-700">{course.isPublished ? 'Published' : 'Draft'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyCourses;
