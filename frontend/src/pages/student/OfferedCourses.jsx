import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../../components/student/SearchBar';
import CourseCard from '../../components/student/CourseCard';
import Footer from '../../components/student/Footer';
import { assets, dummyCourses } from '../../assets/assets';

const OfferedCourses = () => {
    const [filteredCourse, setFilteredCourse] = useState([]);
    const { input } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const keyword = (input || '').toLowerCase().trim();

        if (!keyword) {
            setFilteredCourse(dummyCourses);
            return;
        }

        const filteredData = dummyCourses.filter((course) =>
            course.courseTitle.toLowerCase().includes(keyword)
        );

        setFilteredCourse(filteredData);
    }, [input]);

    return (
        <>
            <div className="min-h-screen bg-slate-100 pt-24 pb-16">
                <div className="container-base">
                    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">Course List</h1>
                            <p className="mt-2 text-sm text-slate-600">
                                <span
                                    onClick={() => navigate('/')}
                                    className="cursor-pointer font-medium text-slate-800 hover:text-slate-900"
                                >
                                    Home
                                </span>
                                {' / '}Course List
                            </p>
                        </div>

                        <div className="w-full md:max-w-sm">
                            <SearchBar />
                        </div>
                    </div>

                    {!!input && (
                        <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700">
                            Search result for <b className="text-slate-900">{input}</b>
                            <img
                                src={assets.cross_icon}
                                alt="Clear filter"
                                className="h-3.5 w-3.5 cursor-pointer"
                                onClick={() => navigate('/offered-course')}
                            />
                        </div>
                    )}

                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredCourse.map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                    </div>

                    {filteredCourse.length === 0 && (
                        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
                            No course found for this keyword.
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default OfferedCourses;
