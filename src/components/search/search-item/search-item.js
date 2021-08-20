import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './search-item.css';

const SearchItem = React.forwardRef(({ podcast, onItemClick, index, focusedId }, ref) => {
  const { id, title, author, coverUrl60 } = podcast;

  return (
    <div className="seach-item">
      <Link
        className="search-item__link"
        to={`/podcast/${id}`}
        onClick={onItemClick}
        ref={index === focusedId ? ref : null}
      >
        <img className="search-item__cover" src={coverUrl60} alt={title}/>
        <div>
          <h4 className="search-item__title">{title}</h4>
          <p className="search-item__author">{author}</p>
        </div>
      </Link>
    </div>
  );
});

SearchItem.propTypes = {
  podcast: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    coverUrl60: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
  focusedId: PropTypes.number.isRequired
};

export default SearchItem;
