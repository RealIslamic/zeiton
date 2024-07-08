import { CloseIcon, MoreIcon } from 'assets/icons';
import React, { useState } from 'react';

type Props = {
    versesRefs?: any;
    verse?: number;
    originalText?: Array<string>;
    transliterationText: Array<string>;
    persianText?: string;
    selectedVerse?: boolean;
    content: string[];
    onClick?: () => void;
};

const Verses = ({
    versesRefs,
    verse,
    originalText,
    transliterationText,
    persianText,
    selectedVerse,
    content,
    onClick,
}: Props) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleShowContent = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div
            ref={versesRefs}
            onClick={onClick}
            className={`border-b p-2 justify-between border-gray-700 pb-4 cursor-pointer flex gap-4 ${
                selectedVerse ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
        >
            <div className="flex gap-4">
                <div className="text-gray-400 text-xs">{verse}</div>

                <div className="flex flex-wrap w-full">
                    <div className="ml-0.75 flex flex-col gap-2">
                        <div className="flex gap-2">
                            {originalText?.map((text, i) => (
                                <div className="flex flex-col gap-1" key={i}>
                                    <span className="font-medium text-xl">{text}</span>
                                    <span className="font-medium text-xs text-gray-500">{transliterationText[i]}</span>
                                </div>
                            ))}
                        </div>
                        <div className="font-medium text-sm h-3 text-white">{persianText}</div>
                    </div>
                </div>
            </div>
            {content?.length > 0 && (
                <div className="flex flex-col justify-center items-center gap-4 pl-4">
                    <button onClick={handleShowContent} className="rounded-full hover:bg-teal-800 p-2">
                        <MoreIcon width={16} height={16} />
                    </button>
                </div>
            )}
            <div
                className={`fixed overflow-auto bottom-0 left-0 h-[90vh] w-full bg-gray-800 p-4 border-t border-gray-700 transition-transform duration-300 ${
                    isDrawerOpen ? 'transform translate-y-0' : 'transform translate-y-full'
                }`}
            >
                <div className="flex justify-end mb-4">
                    <button onClick={() => setIsDrawerOpen(false)} className="text-white">
                        <CloseIcon />
                    </button>
                </div>
                <div className="text-white">
                    {content?.map((text, index) => (
                        <p key={index}>{text}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Verses;
