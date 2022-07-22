// library
import React from 'react';

const Layout = ({ children }) => {
    return (
    <div className="min-h-screen bg-custom-background pt-10">
        <header className='headline'>todo list</header>
        <main>{children}</main>
    </div>
    );
};
export default Layout;