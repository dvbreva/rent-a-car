import React from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import Main from './main/Main';

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};

export default Layout;
