import { ArrowDownIcon, BarsIcon } from 'assets/icons';
import { Verses } from 'components';
import React, { useEffect, useState, useRef, RefObject } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { isMobile } from 'utils/isMobile';
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
    const [showSorah, setShowSorah] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`books/${bookName}.json`);
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
        setShowSorah(false);
    };

    if (books.length === 0) {
        return <div className="text-center mt-20 text-white">Loading...</div>;
    }
    const handleShowSorah = () => {
        setShowSorah(!showSorah);
    };
    return (
        <div className="grid grid-cols-12 h-screen">
            {(showSorah || !isMobile()) && (
                <>
                    <div className={`min-h-[90vh] col-span-6 lg:col-span-1 overflow-y-auto bg-gray-900 text-white `}>
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

                    <div className="min-h-[95vh] col-span-6 lg:col-span-1  overflow-y-auto pr-4 bg-gray-900 text-white">
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
                </>
            )}

            <div
                className={`relative lg:col-span-10 col-span-12 container mx-auto px-4 bg-gray-900 text-white ${
                    !showSorah && !isMobile() && 'min-h-screen'
                }  overflow-y-auto `}
            >
                <div className="z-50 fixed right-0 bg-gray-900  lg:bg-transparent lg:right-52 m-auto left-0 top-0 lg:top-[10px] lg:max-w-[500px] text-2xl mb-4  w-full ">
                    <div className="flex items-center gap-4 px-4 h-[72px] lg:h-[50px]">
                        <div onClick={handleShowSorah} className="lg:hidden">
                            <BarsIcon width={30} height={30} />
                        </div>
                        <div className=" py-[10px] m-auto flex items-center justify-between w-3/5 lg:w-full">
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
                </div>
                <div className={`${showSorah && 'hidden'}`}>
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
        </div>
    );
};

export default BookDetail;
