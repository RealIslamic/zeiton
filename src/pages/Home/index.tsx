import React, { useEffect, useState } from 'react';
import { SurahList, Tabs } from 'components';

interface Surah {
    book_name: string;
    chapter: number;
    [key: string]: any;
}

function Home() {
    const [books, setBooks] = useState<Surah[] | null>();
    const tabs = [
        { label: 'قرآن', content: <SurahList bookName="quran" bookIndex={44} data={books && books[43].chapters} /> },
        { label: 'تورات', content: <SurahList bookName="torah" data={books?.slice(0, 39)} /> },
        { label: 'انجیل', content: <SurahList bookName="babel" data={books?.slice(39, 43)} /> },
    ];
    useEffect(() => {
        fetch('books/books.json')
            .then((response) => response.json())
            .then((jsonData: Surah[]) => {
                const dataWithIndex = jsonData.map((item, index) => ({
                    ...item,
                    book_index: index + 1,
                }));
                setBooks(dataWithIndex);
            })
            .catch((error) => console.error('Error fetching the JSON data:', error));
    }, []);

    return (
        <>
            <div className="container mx-auto flex-1 ">
                <Tabs tabs={tabs} />
            </div>
        </>
    );
}

export default Home;
