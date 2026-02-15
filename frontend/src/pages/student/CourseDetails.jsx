import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, dummyCourses } from '../../assets/assets';
import Loading from '../../components/student/Loading';
import Footer from '../../components/student/Footer';
import CourseRating from '../../components/student/CourseRating';

const CourseDetails = () => {
    const { id: courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [openSectionIndex, setOpenSectionIndex] = useState(null);

    useEffect(() => {
        setCourseData(null);

        const timer = setTimeout(() => {
            const selectedCourse = dummyCourses.find((course) => course._id === courseId) || null;
            setCourseData(selectedCourse);
        }, 250);

        return () => clearTimeout(timer);
    }, [courseId]);

    const totalLectures = useMemo(() => {
        if (!courseData?.courseContent) return 0;
        return courseData.courseContent.reduce(
            (sum, chapter) => sum + chapter.chapterContent.length,
            0
        );
    }, [courseData]);

    const totalDuration = useMemo(() => {
        if (!courseData?.courseContent) return '0 min';

        const totalMinutes = courseData.courseContent.reduce((sum, chapter) => (
            sum + chapter.chapterContent.reduce((chapterSum, lecture) => chapterSum + Number(lecture.lectureDuration || 0), 0)
        ), 0);

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        if (!hours) return `${minutes} min`;
        if (!minutes) return `${hours}h`;
        return `${hours}h ${minutes}m`;
    }, [courseData]);

    const averageRating = useMemo(() => {
        if (!courseData?.courseRatings?.length) return 0;
        const total = courseData.courseRatings.reduce((sum, item) => sum + item.rating, 0);
        return total / courseData.courseRatings.length;
    }, [courseData]);

    const finalPrice = useMemo(() => {
        if (!courseData) return '0.00';
        return (courseData.coursePrice - (courseData.coursePrice * courseData.discount) / 100).toFixed(2);
    }, [courseData]);

    const toggleAccordion = (index) => {
        setOpenSectionIndex((prev) => (prev === index ? null : index));
    };

    if (!courseData) {
        return <Loading />;
    }

    return (
        <>
            <div className="min-h-screen bg-slate-100 pt-24 pb-16">
                <div className="container-base grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">{courseData.courseTitle}</h1>

                            <div
                                className="mt-4 prose prose-slate max-w-none"
                                dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
                            />

                            <div className="mt-5">
                                <CourseRating
                                    averageRating={averageRating}
                                    totalRatings={courseData.courseRatings.length}
                                />
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                            <h2 className="text-2xl font-semibold text-slate-900">Course Structure</h2>

                            <div className="mt-5 space-y-3">
                                {courseData.courseContent.map((chapter, index) => (
                                    <div key={chapter.chapterId} className="overflow-hidden rounded-2xl border border-slate-200">
                                        <button
                                            type="button"
                                            onClick={() => toggleAccordion(index)}
                                            className="flex w-full items-center justify-between bg-white px-4 py-4 text-left"
                                        >
                                            <div>
                                                <p className="font-semibold text-slate-900">{chapter.chapterTitle}</p>
                                                <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                                                    {chapter.chapterContent.length} lectures
                                                </p>
                                            </div>
                                            <img
                                                src={assets.down_arrow_icon}
                                                alt="Toggle chapter"
                                                className={`h-4 w-4 transition-transform duration-200 ${openSectionIndex === index ? 'rotate-180' : 'rotate-0'}`}
                                            />
                                        </button>

                                        {openSectionIndex === index && (
                                            <div className="border-t border-slate-200 bg-slate-50 px-4 py-4">
                                                <ul className="space-y-3">
                                                    {chapter.chapterContent.map((lecture) => (
                                                        <li key={lecture.lectureId} className="flex items-center justify-between gap-3 text-sm text-slate-700">
                                                            <div className="flex items-center gap-2">
                                                                <img src={assets.play_icon} alt="Play" className="h-4 w-4" />
                                                                <span>{lecture.lectureTitle}</span>
                                                            </div>
                                                            <span>{lecture.lectureDuration} min</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                            <h3 className="text-2xl font-semibold text-slate-900">Course Description</h3>
                            <div
                                className="mt-4 prose prose-slate max-w-none"
                                dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
                            <img
                                src={courseData.courseThumbnail}
                                alt={courseData.courseTitle}
                                className="aspect-video w-full rounded-2xl object-cover"
                            />

                            <div className="mt-5 space-y-3 text-sm text-slate-700">
                                <div className="flex items-center gap-2">
                                    <img src={assets.time_clock_icon} alt="Duration" className="h-4 w-4" />
                                    <span>{totalDuration} total duration</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src={assets.lesson_icon} alt="Lectures" className="h-4 w-4" />
                                    <span>{totalLectures} total lectures</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src={assets.user_icon} alt="Students" className="h-4 w-4" />
                                    <span>{courseData.enrolledStudents.length} enrolled students</span>
                                </div>
                            </div>

                            <div className="mt-6 flex items-end gap-2">
                                <span className="text-3xl font-semibold text-slate-900">${finalPrice}</span>
                                <span className="text-base text-slate-500 line-through">${courseData.coursePrice.toFixed(2)}</span>
                                <span className="text-sm font-semibold text-slate-700">{courseData.discount}% off</span>
                            </div>

                            <button className="mt-6 w-full rounded-full bg-slate-900 py-3 text-white font-semibold hover:bg-slate-800 transition-colors">
                                Enroll Now
                            </button>

                            <div className="mt-7 border-t border-slate-200 pt-5">
                                <h4 className="text-base font-semibold text-slate-900">What's in the Course</h4>
                                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                                    <li>Lifetime access to all course lectures</li>
                                    <li>Structured chapters and practical lessons</li>
                                    <li>Downloadable resources and reference material</li>
                                    <li>Beginner-friendly and project-oriented content</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default CourseDetails;
