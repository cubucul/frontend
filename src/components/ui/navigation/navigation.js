import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './navigation.css';

const Navigation = ({ links }) => {
  return (
    <nav className="navigation">
      <div className="navigation__limiter">
        <ul className="navigation__list">
          {
            links.map(({ label, path }) => {
              return (
                <li key={path}>
                  <NavLink
                    className="navigation__link"
                    activeClassName="navigation__link--active"
                    to={path}
                    exact
                  >{label}</NavLink>
                </li>
              );
            })
          }
        </ul>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Navigation;
