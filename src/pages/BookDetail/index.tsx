import { ArrowDownIcon } from 'assets/icons';
import { Verses } from 'components';
import React, { useEffect, useState, useRef, RefObject } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'utils/useQuery';

interface Verse {
    book_name: string;
    book_index: number;
    chapter: number;
    verse: number;
    originalText: string;
    transliteration: string;
    text: string;
    content: string[];
}

const BookDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const query = useQuery();
    const sorah = query.get('sorah');
    const bookName = query.get('bookName');
    const sorahIndex = sorah ? +sorah - 1 : 0;
    const [books, setBooks] = useState<Verse[]>([]);
    const [chapters, setChapters] = useState<number[]>([]);
    const [verses, setVerses] = useState<Verse[]>([]);
    const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
    const [selectedVerseIndex, setSelectedVerseIndex] = useState<number>(1);
    const versesRefs = useRef<RefObject<HTMLDivElement>[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${bookName}.json`);
                const jsonData: Verse[] = await response.json();
                const filteredBooks = jsonData.filter((item) => item.book_index.toString() === id);

                setBooks(filteredBooks);
                const chapterNumbers = Array.from(new Set(filteredBooks.map((item) => item.chapter)));
                setChapters(chapterNumbers);
                handleChapterClick(sorahIndex);
                const initialVerses = filteredBooks.filter((item) => item.chapter === chapterNumbers[sorahIndex]);
                setVerses(initialVerses);
                versesRefs.current = initialVerses.map(() => React.createRef<HTMLDivElement>());
                setSelectedVerseIndex(0);
            } catch (error) {
                console.error('Error fetching the JSON data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleChapterClick = (chapter: number) => {
        const chapterVerses = books.filter((item) => item.chapter === chapter);
        setVerses(chapterVerses);
        setSelectedChapter(chapter);
        setSelectedVerseIndex(0);
        versesRefs.current = chapterVerses.map(() => React.createRef<HTMLDivElement>());
    };

    const handleVerseClick = (index: number) => {
        setSelectedVerseIndex(index);
        versesRefs.current[index].current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (books.length === 0) {
        return <div className="text-center mt-20 text-white">Loading...</div>;
    }

    return (
        <div className="grid grid-cols-12 h-screen">
            <div className="col-span-1 overflow-y-auto bg-gray-900 text-white">
                {chapters.map((chapter) => (
                    <div
                        key={chapter}
                        className={`cursor-pointer hover:bg-gray-700 p-2 rounded ${
                            selectedChapter === chapter ? 'bg-gray-700' : ''
                        }`}
                        onClick={() => handleChapterClick(chapter)}
                    >
                        <p className="text-sm">
                            {books[0]?.book_name} - {chapter}
                        </p>
                    </div>
                ))}
            </div>
            <div className="col-span-1  overflow-y-auto pr-4 bg-gray-900 text-white">
                {verses.map((verse, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer hover:bg-gray-600 p-2 rounded ${
                            selectedVerseIndex === index ? 'bg-gray-600' : ''
                        }`}
                        onClick={() => handleVerseClick(index)}
                    >
                        <p className="text-sm">خط - {verse.verse}</p>
                    </div>
                ))}
            </div>
            <div className="relative col-span-10 container mx-auto px-4 bg-gray-900 text-white min-h-screen overflow-y-auto">
                <div className="z-50 fixed right-52 m-auto left-0 top-[10px]  max-w-[500px] text-2xl mb-4  w-full ">
                    <div className=" py-[10px] m-auto flex items-center justify-between">
                        <div
                            className="-rotate-90 cursor-pointer "
                            onClick={() => handleVerseClick(selectedVerseIndex - 1)}
                        >
                            <ArrowDownIcon width={30} height={30} />
                        </div>
                        <span className="font-bold text-[16px]">
                            {books[0]?.book_name} {selectedChapter}
                        </span>
                        <div
                            className="rotate-90 cursor-pointer"
                            onClick={() => handleVerseClick(selectedVerseIndex + 1)}
                        >
                            <ArrowDownIcon width={30} height={30} />
                        </div>
                    </div>
                </div>

                {verses.map((verse, index) => {
                    const originalKeys = verse.originalText.split(' ');
                    const transliterationKeys = verse.transliteration.split(' ');
                    return (
                        <Verses
                            onClick={() => handleVerseClick(index)}
                            key={index}
                            content={verse.content}
                            versesRefs={versesRefs.current[index]}
                            verse={verse?.verse}
                            originalText={originalKeys}
                            transliterationText={transliterationKeys}
                            persianText={verse.text}
                            selectedVerse={selectedVerseIndex === index}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default BookDetail;
