import React, { useState, ReactNode } from 'react';

interface Tab {
    label: string;
    content: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full mx-auto">
            <div className="flex border-b border-gray-200">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 focus:outline-none ${
                            activeTab === index
                                ? 'border-b-2 border-gray-400 text-white'
                                : 'text-gray-500 hover:text-gray-200'
                        }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="p-4">{tabs[activeTab] && tabs[activeTab].content}</div>
        </div>
    );
};

export default Tabs;
