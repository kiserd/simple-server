// library
import React from 'react';

const Layout = ({ children }) => {
    return (
    <div className="min-h-screen bg-custom-background pt-10">
        <header className='headline'>
            <div>
                todo list
            </div>
            <div className='text-xs text-custom-text-secondary'>
                Please wait a few seconds for updates...
            </div>
        </header>
        <main>{children}</main>
    </div>
    );
};
export default Layout;