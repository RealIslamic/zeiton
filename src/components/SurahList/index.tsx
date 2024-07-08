import React, { useEffect, useState, ChangeEvent } from 'react';
import { SurahItem } from 'components';

interface Surah {
    book_name: string;
    name?: string;
    chapter: number;
    [key: string]: any;
}
type Props = {
    data: Surah[] | null | undefined;
    bookIndex?: number;
    bookName: string;
};

const SurahList = ({ data, bookIndex, bookName }: Props) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = data?.filter((surah) => {
        const searchKey = surah?.book_name || surah.name;
        return searchKey?.toLowerCase().includes(searchQuery?.toLowerCase());
    });
    return (
        <>
            <div className="bg-gray-700 p-4 my-4 rounded">
                <div className="container mx-auto text-white">
                    <input
                        className="text-right dir-rtl w-full p-2 rounded bg-gray-700 text-white ring-0 focus:ring-0"
                        type="text"
                        placeholder="جستجوی نام کتاب"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="container mx-auto my-4 gap-4 grid sm:grid-cols-3 grid-cols-1 dir-rtl">
                {filteredData?.map((surah, i) => (
                    <SurahItem
                        key={surah.chapter}
                        bookName={bookName}
                        bookIndex={bookIndex}
                        id={surah?.book_index || surah?.chapter}
                        {...surah}
                    />
                ))}
            </div>
        </>
    );
};

export default SurahList;
