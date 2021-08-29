import React, { useState } from 'react';
import classNames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { ReactComponent as SearchIcon } from './icons/search.svg';
import { ReactComponent as UserIcon } from './icons/user.svg';
import { ReactComponent as ClockIcon } from './icons/clock.svg';
import { ReactComponent as LoaderIcon } from './icons/loader.svg';
import { ReactComponent as StarIcon } from './icons/star.svg';
import './bottom-bar.css';

const BottomBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const link = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Discover', path: '/discover', icon: SearchIcon }
  ];

  const popupLinks = [
    { label: 'In Progress', path: '/in-progress', icon: LoaderIcon },
    { label: 'Favourites', path: '/favourites', icon: StarIcon },
    { label: 'Listening History', path: '/listening-history', icon: ClockIcon }
  ];

  const popupClass = classNames('bottom-bar__popup', {
    'bottom-bar__popup--expanded': isExpanded
  });

  const userIconClass = classNames('bottom-bar__icon', {
    'bottom-bar__icon--active': isExpanded
  });

  const handleClick = () => setIsExpanded((s) => !s);

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
        <li>
          <button
            className="bottom-bar__button"
            type="button"
            onClick={handleClick}
            aria-label="Show more options"
          >
            <UserIcon
              className={userIconClass}
              width="28"
              height="28"
              aria-hidden="true"
            />
            <span className="bottom-bar__text">More options</span>
          </button>
          <ul className={popupClass}>
            {
              popupLinks.map(({ label, path, icon }) => {
                const Icon = icon;

                return (
                  <li key={path}>
                    <Link
                      className="bottom-bar__popup-link"
                      to={path}
                      onClick={handleClick}
                    >
                      <Icon
                        className="bottom-bar__popup-icon"
                        width="26"
                        height="26"
                        aria-hidden="true"
                      />
                      <span className="bottom-bar__title">{label}</span>
                    </Link>
                  </li>
                );
              })
            }
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default BottomBar;
