import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './navigation.module.css';

const Navigation = ({ links }) => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.navigation}>
      <div className={styles.limiter}>
        <ul className={styles.list}>
          {
            links.map(({ label, path }) => {
              const linkClass = classNames(styles.link, {
                [styles.active]: path === pathname
              });

              return (
                <li key={path}>
                  <Link href={path}>
                    <a className={linkClass}>{label}</a>
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
