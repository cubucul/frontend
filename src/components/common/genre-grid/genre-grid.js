import React from 'react';
import { Link } from 'react-router-dom';
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
                  className={styles.link}
                  to={`/discover/genre/${id}`}
                >{label}</Link>
              </Heading>
            </li>
          );
        })
      }
    </ul>
  );
};

export default GenreGrid;
