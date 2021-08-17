import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
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
                  <Link href={path}>
                    <a className={styles.link}>{label}</a>
                  </Link>
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
