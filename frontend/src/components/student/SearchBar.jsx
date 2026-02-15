import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const SearchBar = () => {
    const [inputData, setInputData] = useState('');
    const navigate = useNavigate();

    const onSearchHandler = (event) => {
        event.preventDefault();
        const keyword = inputData.trim();

        if (!keyword) {
            navigate('/offered-course');
            return;
        }

        navigate(`/offered-course/${keyword}`);
    };

    return (
        <form
            onSubmit={onSearchHandler}
            className="flex items-center gap-3 rounded-full border border-slate-300 bg-white px-4 py-2"
        >
            <img src={assets.search_icon} alt="Search icon" className="h-4 w-4" />
            <input
                type="text"
                value={inputData}
                onChange={(event) => setInputData(event.target.value)}
                placeholder="Search courses"
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-500 outline-none"
            />
        </form>
    )
}

export default SearchBar;
