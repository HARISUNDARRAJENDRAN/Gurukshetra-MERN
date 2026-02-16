import React, { useContext, useMemo, useState } from 'react';
import { AppContent } from '../../content/AppContent';

const initialForm = {
    courseTitle: '',
    courseDescription: '',
    coursePrice: '',
    discount: '0',
    courseThumbnail: '',
    level: 'Beginner',
    category: 'Web Development',
    language: 'English',
    durationHours: '',
    totalLectures: '',
    isPublished: false,
};

const AddCourse = () => {
    const { createCourse } = useContext(AppContent);
    const [formData, setFormData] = useState(initialForm);
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const finalPrice = useMemo(() => {
        const price = Number(formData.coursePrice || 0);
        const discount = Number(formData.discount || 0);

        if (!price || discount < 0 || discount > 100) return '0.00';
        return (price - (price * discount) / 100).toFixed(2);
    }, [formData.coursePrice, formData.discount]);

    const onInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setStatusMessage('');

        if (!formData.courseTitle.trim() || !formData.courseDescription.trim()) {
            setStatusMessage('Please add at least a title and course description.');
            return;
        }

        setIsSubmitting(true);

        const data = await createCourse({
            ...formData,
            coursePrice: Number(formData.coursePrice || 0),
            discount: Number(formData.discount || 0),
            durationHours: Number(formData.durationHours || 1),
            totalLectures: Number(formData.totalLectures || 1),
        });

        setIsSubmitting(false);

        if (data.success) {
            setStatusMessage(data.message || 'Course saved successfully.');
            setFormData(initialForm);
            return;
        }

        setStatusMessage(data.message || 'Unable to save course right now.');
    };

    return (
        <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                <h1 className="text-3xl font-semibold text-slate-900">Add Course</h1>
                <p className="mt-2 text-sm text-slate-600">Create and publish a new course for learners.</p>

                <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-800 mb-2">Course Title</label>
                        <input
                            type="text"
                            name="courseTitle"
                            value={formData.courseTitle}
                            onChange={onInputChange}
                            placeholder="e.g. Full-Stack MERN Bootcamp"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-700"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-800 mb-2">Course Description</label>
                        <textarea
                            name="courseDescription"
                            value={formData.courseDescription}
                            onChange={onInputChange}
                            rows={6}
                            placeholder="Describe what students will learn in this course"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-700"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-800 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={onInputChange}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-700"
                        >
                            <option>Web Development</option>
                            <option>Data Science</option>
                            <option>Cybersecurity</option>
                            <option>DevOps</option>
                            <option>Programming Fundamentals</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-800 mb-2">Level</label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={onInputChange}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-700"
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-800 mb-2">Course Price (USD)</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            name="coursePrice"
                            value={formData.coursePrice}
                            onChange={onInputChange}
                            placeholder="49.99"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-800 mb-2">Discount (%)</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            name="discount"
                            value={formData.discount}
                            onChange={onInputChange}
                            placeholder="20"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-800 mb-2">Duration (Hours)</label>
                        <input
                            type="number"
                            min="1"
                            name="durationHours"
                            value={formData.durationHours}
                            onChange={onInputChange}
                            placeholder="12"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-800 mb-2">Total Lectures</label>
                        <input
                            type="number"
                            min="1"
                            name="totalLectures"
                            value={formData.totalLectures}
                            onChange={onInputChange}
                            placeholder="48"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-700"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-800 mb-2">Thumbnail URL</label>
                        <input
                            type="url"
                            name="courseThumbnail"
                            value={formData.courseThumbnail}
                            onChange={onInputChange}
                            placeholder="https://..."
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-700"
                        />
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-xs uppercase tracking-widest text-slate-500">Final Price</p>
                            <p className="mt-1 text-2xl font-semibold text-slate-900">${finalPrice}</p>
                        </div>

                        <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between cursor-pointer">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">Publish Immediately</p>
                                <p className="text-xs text-slate-600 mt-1">Enable to make this course live after saving.</p>
                            </div>
                            <input
                                type="checkbox"
                                name="isPublished"
                                checked={formData.isPublished}
                                onChange={onInputChange}
                                className="h-4 w-4"
                            />
                        </label>
                    </div>

                    {formData.courseThumbnail && (
                        <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">Thumbnail Preview</p>
                            <img
                                src={formData.courseThumbnail}
                                alt="Course thumbnail preview"
                                className="h-48 w-full rounded-xl object-cover"
                                onError={(event) => {
                                    event.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-slate-800 disabled:opacity-60"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Course'}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setFormData(initialForm);
                                setStatusMessage('');
                            }}
                            className="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold uppercase tracking-widest text-slate-700 hover:border-slate-700"
                        >
                            Reset
                        </button>
                    </div>

                    {statusMessage && (
                        <p className="md:col-span-2 text-sm text-slate-700">{statusMessage}</p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default AddCourse;