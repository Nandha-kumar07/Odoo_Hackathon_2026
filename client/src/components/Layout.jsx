import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen font-sans">
            <Sidebar />
            <Navbar />
            <main className="flex-1 p-4 lg:p-8 w-full overflow-x-hidden relative mb-20 lg:mb-0">
                {children}
            </main>
        </div>
    );
};

export default Layout;
