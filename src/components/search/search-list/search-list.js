import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SearchItem from '../search-item';
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
        results.map((podcast, index) => {
          return (
            <li key={podcast.id} className="search-list__item">
              <SearchItem
                ref={focusedRef}
                podcast={podcast}
                index={index}
                onItemClick={onItemClick}
                focusedId={focusedId}
              />
            </li>
          );
        })
      }
    </ul>
  );
};

SearchList.propTypes = {
  results: PropTypes.array.isRequired,
  focusedId: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default SearchList;
