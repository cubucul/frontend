import React from 'react';
import Search from '../../search';
import Navigation from '../../ui/navigation';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <Search />
      <Navigation />
    </header>
  );
};

export default Header;
