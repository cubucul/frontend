import React from 'react';
import Link from 'next/link';
import Heading from '../../ui/heading';
import { genres } from '../../../utils/genres';
import styles from './genre-grid.module.css';

const GenreGrid = () => {
  return (
    <ul className={styles.grid}>
      {
        genres.map(({ id, label }) => {
          return (
            <li key={id}>
              <Heading as="h3" size="h6">
                <Link
                  href={`/discover/genre/${id}`}
                >
                  <a className={styles.link}>{label}</a>
                </Link>
              </Heading>
            </li>
          );
        })
      }
    </ul>
  );
};

export default GenreGrid;
