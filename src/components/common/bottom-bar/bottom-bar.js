import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { ReactComponent as SearchIcon } from './icons/search.svg';
import { ReactComponent as UserIcon } from './icons/user.svg';
import './bottom-bar.css';

const BottomBar = () => {
  const link = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Discover', path: '/discover', icon: SearchIcon },
    { label: 'Listening History', path: '/listening-history', icon: UserIcon }
  ];

  return (
    <nav className="bottom-bar">
      <ul className="bottom-bar__list">
        {
          link.map(({ label, path, icon }) => {
            const Icon = icon;

            return (
              <li key={path}>
                <NavLink
                  className="bottom-bar__link"
                  activeClassName="bottom-bar__link--active"
                  to={path}
                  exact
                >
                  <Icon
                    className="bottom-bar__icon"
                    width="28"
                    height="28"
                    aria-hidden="true"
                  />
                  <span className="bottom-bar__text">{label}</span>
                </NavLink>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
};

export default BottomBar;
