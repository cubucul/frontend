import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { hasPodcastInSubscriptions } from '../../../selectors/subscriptions';
import { ReactComponent as CheckIcon } from './check.svg';
import './search-item.css';

const SearchItem = React.forwardRef(({ podcast, onItemClick, index, focusedId }, ref) => {
  const { id, title, author, coverUrl60 } = podcast;

  const isSubscribed = useSelector((state) => hasPodcastInSubscriptions(state, id.toString()));

  const searchItemClass = classNames('search-item', {
    'search-item--subscribed': isSubscribed
  });

  return (
    <Link
      className={searchItemClass}
      to={`/podcast/${id}`}
      onClick={onItemClick}
      ref={index === focusedId ? ref : null}
    >
      <img className="search-item__cover" src={coverUrl60} alt={title}/>
      <div>
        <h4 className="search-item__title">{title}</h4>
        <p className="search-item__author">{author}</p>
      </div>
      {
        isSubscribed &&
          <CheckIcon
            className="search-item__icon"
            width="16"
            height="16"
            aria-hidden="true"
          />
      }
    </Link>
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
