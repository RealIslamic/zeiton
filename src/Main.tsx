import React from 'react';
import { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer, Header } from 'components';
import { BookDetail, Home, NotFound } from 'pages';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Import the service worker registration file

function Main() {
    return (
        <Router>
            <Suspense
                fallback={<div className="w-full h-[300px] flex items-center justify-center gap-2">درحال بارگذاری</div>}
            >
                <div className="bg-gray-900 min-h-screen text-white px-0 sm:px-2 flex flex-col">
                    <Header />
                    <div className="flex-1 ">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/books/:id" element={<BookDetail />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Suspense>
        </Router>
    );
}
serviceWorkerRegistration.register();

export default Main;
