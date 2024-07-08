import React from 'react';
const SearchBar = () => {
    return (
        <div className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <input
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    type="text"
                    placeholder="What do you want to read?"
                />
            </div>
        </div>
    );
};

export default SearchBar;
