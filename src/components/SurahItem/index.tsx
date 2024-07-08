import React from 'react';
import { Link } from 'react-router-dom';

interface SurahItemProps {
    chapters?: Array<object>; // Replace `any` with the actual type if known
    book_name?: string;
    name?: string;
    id?: number;
    bookIndex?: number;
    bookName?: string;
}

const SurahItem: React.FC<SurahItemProps> = ({ chapters, bookName, bookIndex, book_name, name, id }) => {
    const link = bookIndex ? `${bookIndex}?sorah=${id}&bookName=${bookName}` : `${id}?bookName=${bookName}`;
    return (
        <Link
            to={`books/${link}`}
            className="cursor-pointer dir-rtl bg-gray-800 p-4 rounded flex items-center justify-between border-gray-800 hover:bg-gray-700 border hover:border-teal-100"
        >
            <div className="flex items-center gap-4">
                <div
                    className={`bg-teal-800 
                    text-white rounded p-2 
                    w-10 h-10 flex items-center 
                    justify-center`}
                >
                    {id}
                </div>
                <div className="text-right">
                    <div className="text-white-400">{book_name || name}</div>
                </div>
            </div>
            <div>
                <div className="text-gray-400">{chapters?.length}</div>
            </div>
        </Link>
    );
};

export default SurahItem;
