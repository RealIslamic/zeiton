import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="z-50 bg-gray-900 text-white p-4 sticky top-0">
            <div className=" mx-auto flex justify-between items-center gap-6">
                <Link to={'/'} className="text-xl font-bold flex items-center flex-row-reverse">
                    زیتون
                    <img alt="zeitoon" className="w-10 h-10" src="icon.png" />
                </Link>
            </div>
        </header>
    );
};

export default Header;
