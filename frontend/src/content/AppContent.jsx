import { createContext, useEffect, useMemo, useState } from "react";
import { dummyCourses } from "../assets/assets";

export const AppContent = createContext();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const AppContentProvider = (props)=>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [publicCourses, setPublicCourses] = useState([]);
    const [dashboardData, setDashboardData] = useState(null);
    const [courseRatingsMap, setCourseRatingsMap] = useState({});

    const request = async (endpoint, options = {}) => {
        const response = await fetch(`${BACKEND_URL}/api/auth${endpoint}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            ...options,
        });

        return response.json();
    };

    const userRequest = async (endpoint, options = {}) => {
        const response = await fetch(`${BACKEND_URL}/api/user${endpoint}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
            ...options,
        });

        return response.json();
    };

    const courseRequest = async (endpoint, options = {}) => {
        const response = await fetch(`${BACKEND_URL}/api/course${endpoint}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
            ...options,
        });

        return response.json();
    };

    const fetchMe = async () => {
        const data = await request('/me', { method: 'GET' });
        if (data.success) {
            setUser(data.user);
            setIsAuthenticated(true);
        }
        return data;
    };

    const checkAuth = async () => {
        try {
            setAuthLoading(true);
            const status = await request('/is-auth', { method: 'GET' });
            if (!status.success) {
                setUser(null);
                setIsAuthenticated(false);
                return status;
            }
            return await fetchMe();
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            return { success: false, message: error.message };
        } finally {
            setAuthLoading(false);
        }
    };

    const register = async (payload) => {
        const data = await request('/register', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        if (data.success) {
            setUser(data.user || null);
            setIsAuthenticated(true);
        }

        return data;
    };

    const login = async (payload) => {
        const data = await request('/login', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        if (data.success) {
            setUser(data.user || null);
            setIsAuthenticated(true);
        }

        return data;
    };

    const logout = async () => {
        const data = await request('/logout', { method: 'POST' });
        if (data.success) {
            setUser(null);
            setIsAuthenticated(false);
        }
        return data;
    };

    const sendVerifyOtp = async () => {
        return request('/send-verify-otp', { method: 'POST' });
    };

    const verifyEmail = async (otp) => {
        const data = await request('/verify-email', {
            method: 'POST',
            body: JSON.stringify({ otp }),
        });

        if (data.success) {
            await fetchMe();
        }
        return data;
    };

    const sendResetOtp = async (email) => {
        return request('/send-reset-otp', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    };

    const resetPassword = async ({ email, otp, newPassword }) => {
        return request('/reset-password', {
            method: 'POST',
            body: JSON.stringify({ email, otp, newPassword }),
        });
    };

    const becomeEducator = async () => {
        const data = await userRequest('/become-educator', { method: 'POST' });

        if (data.success) {
            await fetchMe();
        }

        return data;
    };

    const fetchEducatorCourses = async () => {
        const data = await userRequest('/educator-courses', { method: 'GET' });

        if (data.success) {
            setCourses(data.courses || []);
        }

        return data;
    };

    const fetchDashboardData = async () => {
        const data = await userRequest('/dashboard-data', { method: 'GET' });

        if (data.success) {
            setDashboardData(data.dashboardData || null);
        }

        return data;
    };

    const fetchPublishedCourses = async () => {
        const data = await courseRequest('/published', { method: 'GET' });

        if (data.success) {
            setPublicCourses(data.courses || []);
        }

        return data;
    };

    const createCourse = async (payload) => {
        const data = await courseRequest('/create', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        if (data.success) {
            await Promise.all([
                fetchEducatorCourses(),
                fetchDashboardData(),
                fetchPublishedCourses(),
            ]);
        }

        return data;
    };

    const fetchUserEnrolledCourses = async () => {
        const simulatedEnrolledCourses = dummyCourses.slice(0, 3).map((course, index) => {
            const totalLectures = course.courseContent.reduce(
                (sum, chapter) => sum + chapter.chapterContent.length,
                0
            );

            const totalMinutes = course.courseContent.reduce((sum, chapter) => {
                return sum + chapter.chapterContent.reduce(
                    (chapterSum, lecture) => chapterSum + Number(lecture.lectureDuration || 0),
                    0
                );
            }, 0);

            const completedLecture = Math.min(index + 1, totalLectures);

            return {
                courseId: course._id,
                courseTitle: course.courseTitle,
                courseThumbnail: course.courseThumbnail,
                duration: `${Math.max(1, Math.round(totalMinutes / 60))}h`,
                lectureCompleted: completedLecture,
                totalLectures,
            };
        });

        setEnrolledCourses(simulatedEnrolledCourses);
        return simulatedEnrolledCourses;
    };

    const fetchUserCourseProgress = async (courseId) => {
        const data = await userRequest(`/course-progress/${courseId}`, { method: 'GET' });

        if (data.success) {
            setEnrolledCourses((prev) => prev.map((course) => (
                course.courseId === courseId
                    ? { ...course, lectureCompleted: data.progressData.lectureCompleted }
                    : course
            )));
        }

        return data;
    };

    const updateCourseProgress = async ({ courseId, lectureId }) => {
        const data = await userRequest('/course-progress', {
            method: 'POST',
            body: JSON.stringify({ courseId, lectureId }),
        });

        if (data.success) {
            setEnrolledCourses((prev) => prev.map((course) => (
                course.courseId === courseId
                    ? { ...course, lectureCompleted: data.progressData.lectureCompleted }
                    : course
            )));
        }

        return data;
    };

    const fetchUserCourseRating = async (courseId) => {
        const data = await userRequest(`/course-rating/${courseId}`, { method: 'GET' });

        if (data.success && data.ratingData) {
            const userId = user?._id || user?.id;
            if (userId) {
                setCourseRatingsMap((prev) => ({
                    ...prev,
                    [courseId]: {
                        ...(prev[courseId] || {}),
                        [userId]: data.ratingData.userRating || 0,
                    },
                }));
            }
        }

        return data;
    };

    const updateCourseRating = async ({ courseId, userId, rating }) => {
        if (!courseId || !userId) {
            return { success: false, message: 'Missing course or user details' };
        }

        const data = await userRequest('/course-rating', {
            method: 'POST',
            body: JSON.stringify({ courseId, rating }),
        });

        if (data.success) {
            setCourseRatingsMap((prev) => ({
                ...prev,
                [courseId]: {
                    ...(prev[courseId] || {}),
                    [userId]: data.ratingData?.userRating ?? rating,
                },
            }));
        }

        return data;
    };

    useEffect(() => {
        checkAuth();
        fetchUserEnrolledCourses();
        fetchPublishedCourses();
    }, []);

    const isEducator = (user?.publicMetadata?.role || user?.role) === 'educator';

    useEffect(() => {
        if (isEducator) {
            fetchEducatorCourses();
            fetchDashboardData();
        }
    }, [isEducator]);

    const value = useMemo(() => ({
        user,
        isAuthenticated,
        authLoading,
        isEducator,
        backendUrl: BACKEND_URL,
        register,
        login,
        logout,
        checkAuth,
        fetchMe,
        sendVerifyOtp,
        verifyEmail,
        sendResetOtp,
        resetPassword,
        becomeEducator,
        createCourse,
        enrolledCourses,
        fetchUserEnrolledCourses,
        fetchUserCourseProgress,
        updateCourseProgress,
        fetchUserCourseRating,
        updateCourseRating,
        courseRatingsMap,
        courses,
        publicCourses,
        dashboardData,
        fetchDashboardData,
        fetchPublishedCourses,
        fetchEducatorCourses,
    }), [
        user,
        isAuthenticated,
        authLoading,
        isEducator,
        enrolledCourses,
        courses,
        publicCourses,
        dashboardData,
        courseRatingsMap,
    ]);

    return (
        <AppContent.Provider value ={value}>
            {props.children}
        </AppContent.Provider>
    )
}
export default AppContent;
