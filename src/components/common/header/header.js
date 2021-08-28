import React from 'react';
import Search from '../../search';
import Navigation from '../navigation';
import BottomBar from '../bottom-bar';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <Search />
      <Navigation />
      <BottomBar />
    </header>
  );
};

export default Header;
