import React from 'react';
import Search from '../../search';
import Navigation from '../../ui/navigation';
import styles from './header.module.css';

const Header = () => {
  const links = [
    { label: 'Home', path: '/' },
    { label: 'Discover', path: '/discover' },
    // { label: 'New Releases', path: '/new-releases' },
    // { label: 'In Progress', path: '/in-progress' },
    // { label: 'Starred', path: '/starred' },
    { label: 'Listening History', path: '/listening-history' }
  ];

  return (
    <header className={styles.header}>
      <Search />
      <Navigation links={links} />
    </header>
  );
};

export default Header;
