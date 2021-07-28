import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './search-list.css';

const SearchList = ({ results, focusedId, onItemClick }) => {
  const focusedRef = useRef();

  useEffect(() => {
    if (focusedId >= 0) {
      focusedRef.current.focus();
    }
  }, [focusedId]);

  return (
    <ul className="search-list">
      {
        results.map(({ id, title, author, coverUrl60 }, index) => {
          return (
            <li key={id} className="search-list__item">
              <Link
                className="search-list__link"
                to={`/podcast/${id}`}
                onClick={onItemClick}
                ref={index === focusedId ? focusedRef : null}
              >
                <img className="search-list__cover" src={coverUrl60} alt={title}/>
                <div>
                  <h4 className="search-list__title">{title}</h4>
                  <p className="search-list__author">{author}</p>
                </div>
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
