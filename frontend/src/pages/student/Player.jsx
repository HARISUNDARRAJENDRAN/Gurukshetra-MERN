import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import humanizeDuration from 'humanize-duration';
import { Rating } from 'react-simple-star-rating';
import { Line } from 'rc-progress';
import { assets, dummyCourses } from '../../assets/assets';
import Footer from '../../components/student/Footer';
import Loading from '../../components/student/Loading';
import { AppContent } from '../../content/AppContent';

const Player = () => {
    const { courseID } = useParams();
    const {
        user,
        enrolledCourses,
        fetchUserEnrolledCourses,
        fetchUserCourseProgress,
        fetchUserCourseRating,
        updateCourseProgress,
        updateCourseRating,
        courseRatingsMap,
    } = useContext(AppContent);

    const [courseData, setCourseData] = useState(null);
    const [openSectionIndex, setOpenSectionIndex] = useState(0);
    const [playerData, setPlayerData] = useState({ chapter: 0, lecture: 0 });
    const [progressData, setProgressData] = useState(null);
    const [initialRating, setInitialRating] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');

    const loggedInUserId = user?._id || user?.id;

    useEffect(() => {
        if (!enrolledCourses.length) {
            fetchUserEnrolledCourses();
        }
    }, [enrolledCourses.length, fetchUserEnrolledCourses]);

    const getCourseData = () => {
        setCourseData(null);
        setProgressData(null);
        setInitialRating(0);

        const timer = setTimeout(async () => {
            const selectedCourse = dummyCourses.find((course) => course._id === courseID) || null;
            setCourseData(selectedCourse);
            setOpenSectionIndex(0);
            setPlayerData({ chapter: 0, lecture: 0 });

            if (!selectedCourse) {
                return;
            }

            if (selectedCourse.courseRatings?.length && loggedInUserId) {
                for (const ratingObj of selectedCourse.courseRatings) {
                    if (String(ratingObj.userId) === String(loggedInUserId)) {
                        setInitialRating(ratingObj.rating * 20);
                        break;
                    }
                }
            }

            const userSavedRating = courseRatingsMap?.[selectedCourse._id]?.[loggedInUserId];
            if (userSavedRating) {
                setInitialRating(userSavedRating * 20);
            }

            const progressResponse = await fetchUserCourseProgress(selectedCourse._id);
            if (progressResponse.success) {
                setProgressData(progressResponse.progressData);
            }

            const ratingResponse = await fetchUserCourseRating(selectedCourse._id);
            if (ratingResponse.success) {
                setInitialRating((ratingResponse.ratingData?.userRating || 0) * 20);
            }
        }, 250);

        return () => clearTimeout(timer);
    };

    useEffect(() => {
        const cleanup = getCourseData();
        return cleanup;
    }, [courseID, loggedInUserId, courseRatingsMap]);

    const selectedLecture = useMemo(() => {
        if (!courseData?.courseContent?.length) return null;
        const chapter = courseData.courseContent[playerData.chapter];
        if (!chapter) return null;
        return chapter.chapterContent[playerData.lecture] || null;
    }, [courseData, playerData]);

    const courseDurationText = useMemo(() => {
        if (!courseData?.courseContent) return '0 min';
        const totalMinutes = courseData.courseContent.reduce((sum, chapter) => (
            sum + chapter.chapterContent.reduce(
                (chapterSum, lecture) => chapterSum + Number(lecture.lectureDuration || 0),
                0
            )
        ), 0);
        return humanizeDuration(totalMinutes * 60 * 1000, { largest: 2, round: true });
    }, [courseData]);

    const completedProgress = useMemo(() => {
        if (!courseData?.courseContent) return { completed: 0, total: 0 };
        const total = courseData.courseContent.reduce((sum, chapter) => sum + chapter.chapterContent.length, 0);
        const completed = progressData?.completedLectures?.length || 0;
        return { completed, total };
    }, [courseData, progressData]);

    const progressPercent = completedProgress.total
        ? (completedProgress.completed / completedProgress.total) * 100
        : 0;

    const extractYoutubeVideoId = (url = '') => {
        const regExp = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : '';
    };

    const onLectureClick = (chapterIndex, lectureIndex) => {
        setPlayerData({ chapter: chapterIndex, lecture: lectureIndex });
    };

    const markAsCompleted = async () => {
        if (!selectedLecture) return;

        const response = await updateCourseProgress({
            courseId: courseData._id,
            lectureId: selectedLecture.lectureId,
        });

        if (response.success) {
            setProgressData(response.progressData);
            setStatusMessage(response.message || 'Lecture marked as completed');
            return;
        }

        setStatusMessage(response.message || 'Unable to update lecture progress');
    };

    const handleRating = async (ratingValue) => {
        setInitialRating(ratingValue);

        const response = await updateCourseRating({
            courseId: courseData._id,
            userId: loggedInUserId,
            rating: ratingValue / 20,
        });

        if (response.success) {
            setStatusMessage(response.message || 'Rating submitted successfully');
            return;
        }

        setStatusMessage(response.message || 'Unable to submit rating');
    };

    if (!courseData || !selectedLecture) {
        return <Loading />;
    }

    const videoId = extractYoutubeVideoId(selectedLecture.lectureUrl);

    return (
        <>
            <div className="min-h-screen bg-slate-100 pt-24 pb-16">
                <div className="container-base flex flex-col lg:flex-row gap-5">
                    <div className="w-full lg:w-[38%]">
                        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
                            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">Course Structure</h2>
                            <p className="mt-2 text-sm text-slate-600">{courseData.courseTitle}</p>

                            <div className="mt-5 space-y-3">
                                {courseData.courseContent.map((chapter, chapterIndex) => (
                                    <div key={chapter.chapterId} className="overflow-hidden rounded-2xl border border-slate-200">
                                        <button
                                            type="button"
                                            onClick={() => setOpenSectionIndex((prev) => (prev === chapterIndex ? null : chapterIndex))}
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
                                                className={`h-4 w-4 transition-transform duration-200 ${openSectionIndex === chapterIndex ? 'rotate-180' : 'rotate-0'}`}
                                            />
                                        </button>

                                        {openSectionIndex === chapterIndex && (
                                            <div className="border-t border-slate-200 bg-slate-50 px-4 py-4">
                                                <ul className="space-y-2">
                                                    {chapter.chapterContent.map((lecture, lectureIndex) => {
                                                        const isActive =
                                                            chapterIndex === playerData.chapter && lectureIndex === playerData.lecture;
                                                        const isCompleted = progressData?.completedLectures?.includes(lecture.lectureId);

                                                        return (
                                                            <li key={lecture.lectureId}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => onLectureClick(chapterIndex, lectureIndex)}
                                                                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                                                                        isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <img src={isCompleted ? assets.blue_tick_icon : assets.play_icon} alt="Lecture status" className="h-4 w-4" />
                                                                        <span>{lecture.lectureTitle}</span>
                                                                    </div>

                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-xs">{humanizeDuration(lecture.lectureDuration * 60 * 1000, { round: true, largest: 1 })}</span>
                                                                        {isCompleted && <span className="text-[10px] uppercase tracking-wider">Done</span>}
                                                                    </div>
                                                                </button>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[62%]">
                        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
                            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">{selectedLecture.lectureTitle}</h1>
                            <p className="mt-2 text-sm text-slate-600">Total course duration: {courseDurationText}</p>

                            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-black">
                                {videoId ? (
                                    <YouTube
                                        videoId={videoId}
                                        opts={{ width: '100%', playerVars: { autoplay: 0 } }}
                                        className="aspect-video w-full"
                                        iframeClassName="aspect-video w-full"
                                    />
                                ) : (
                                    <div className="aspect-video w-full flex items-center justify-center text-slate-200 text-sm">
                                        Unable to load video for this lecture.
                                    </div>
                                )}
                            </div>

                            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="text-sm text-slate-700">
                                    Completed {completedProgress.completed} of {completedProgress.total} lectures
                                </div>

                                <button
                                    onClick={markAsCompleted}
                                    className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                                >
                                    Mark as Completed
                                </button>
                            </div>

                            <div className="mt-4">
                                <Line
                                    percent={progressPercent}
                                    strokeWidth={4}
                                    trailWidth={4}
                                    strokeColor="#0f172a"
                                    trailColor="#e2e8f0"
                                />
                            </div>

                            <div className="mt-7 border-t border-slate-200 pt-5">
                                <h3 className="text-base font-semibold text-slate-900">Rate this course</h3>
                                <div className="mt-3">
                                    <Rating
                                        onClick={handleRating}
                                        initialValue={initialRating}
                                        allowFraction
                                        size={24}
                                        transition
                                        fillColor="#0f172a"
                                        emptyColor="#cbd5e1"
                                    />
                                </div>
                                <p className="mt-2 text-sm text-slate-600">
                                    {initialRating > 0 ? `Your rating: ${(initialRating / 20).toFixed(1)} / 5` : 'Select a rating for this course.'}
                                </p>
                                {statusMessage && <p className="mt-2 text-xs text-slate-500">{statusMessage}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Player;
