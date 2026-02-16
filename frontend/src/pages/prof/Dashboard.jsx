import React, { useContext, useEffect } from 'react';
import { AppContent } from '../../content/AppContent';

const Dashboard = () => {
    const { dashboardData, fetchDashboardData } = useContext(AppContent);

    useEffect(() => {
        if (!dashboardData) {
            fetchDashboardData();
        }
    }, [dashboardData, fetchDashboardData]);

    const statCards = [
        {
            label: 'Total Enrollments',
            value: dashboardData?.totalEnrollments ?? 0,
        },
        {
            label: 'Total Courses',
            value: dashboardData?.totalCourses ?? 0,
        },
        {
            label: 'Total Earnings',
            value: `$${(dashboardData?.totalEarnings ?? 0).toFixed(2)}`,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-semibold text-slate-900">Prof Dashboard</h1>
                <p className="mt-2 text-sm text-slate-600">Track enrollments, earnings, and student activity.</p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {statCards.map((item) => (
                        <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                            <p className="text-xs uppercase tracking-widest text-slate-500">{item.label}</p>
                            <p className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6">
                    <h2 className="text-xl font-semibold text-slate-900">Enrolled Students</h2>

                    {(dashboardData?.enrolledStudentsData?.length || 0) === 0 ? (
                        <p className="mt-4 text-sm text-slate-600">No student enrollments yet.</p>
                    ) : (
                        <div className="mt-5 overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-600">Student</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-600">Email</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-600">Course</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboardData.enrolledStudentsData.map((entry, index) => (
                                        <tr key={`${entry.student._id}-${entry.courseTitle}-${index}`} className="border-b border-slate-100 last:border-none">
                                            <td className="px-3 py-3 text-sm font-medium text-slate-900">{entry.student.name}</td>
                                            <td className="px-3 py-3 text-sm text-slate-700">{entry.student.email}</td>
                                            <td className="px-3 py-3 text-sm text-slate-700">{entry.courseTitle}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
