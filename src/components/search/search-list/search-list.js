import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import styles from './search-list.module.css';

const SearchList = ({ results, focusedId, onItemClick }) => {
  const focusedRef = useRef();

  useEffect(() => {
    if (focusedId >= 0) {
      focusedRef.current.focus();
    }
  }, [focusedId]);

  return (
    <ul className={styles.list}>
      {
        results.map(({ id, title, author, coverUrl60 }, index) => {
          return (
            <li key={id} className={styles.item}>
              <Link
                href={`/podcast/${id}`}
              >
                <a
                  className={styles.link}
                  onClick={onItemClick}
                  ref={index === focusedId ? focusedRef : null}
                >
                  <div className={styles.cover}>
                    <Image
                      src={coverUrl60}
                      width="40"
                      height="40"
                      alt={title}
                    />
                  </div>
                  <div>
                    <h4 className={styles.title}>{title}</h4>
                    <p className={styles.author}>{author}</p>
                  </div>
                </a>
              </Link>
            </li>
          );
        })
      }
    </ul>
  );
};

SearchList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      coverUrl60: PropTypes.string.isRequired
    })
  ).isRequired,
  focusedId: PropTypes.number,
  onItemClick: PropTypes.func.isRequired
};

export default SearchList;
