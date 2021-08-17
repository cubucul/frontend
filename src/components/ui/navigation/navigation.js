import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';

const Navigation = ({ links }) => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.limiter}>
        <ul className={styles.list}>
          {
            links.map(({ label, path }) => {
              return (
                <li key={path}>
                  <NavLink
                    className={styles.link}
                    activeClassName={styles.active}
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
