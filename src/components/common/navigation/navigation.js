import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from './home.svg';
import { ReactComponent as SearchIcon } from './search.svg';
import { ReactComponent as UserIcon } from './user.svg';
import './navigation.css';

const Navigation = () => {
  const links = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Discover', path: '/discover', icon: SearchIcon },
    // { label: 'New Releases', path: '/new-releases' },
    // { label: 'In Progress', path: '/in-progress' },
    // { label: 'Favourites', path: '/favourites' },
    { label: 'Listening History', path: '/listening-history', icon: UserIcon }
  ];

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {
          links.map(({ label, path, icon }) => {
            const Icon = icon;

            return (
              <li key={path}>
                <NavLink
                  className="navigation__link"
                  activeClassName="navigation__link--active"
                  to={path}
                  exact
                >
                  <Icon
                    className="navigation__icon"
                    width="26"
                    height="26"
                    aria-hidden="true"
                  />
                  <span className="navigation__text">{label}</span>
                </NavLink>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
};

export default Navigation;
