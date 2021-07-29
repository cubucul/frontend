import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findPodcasts, changeSearchTerm, clearSearchTerm } from '../../actions/search';
import * as selectors from '../../selectors/search';
import SearchForm from './search-form';
import SearchList from './search-list';
import SearchError from './search-error';
import './search.css';

const Search = () => {
  const [showResults, setShowResults] = useState(false);
  const [focusedId, setFocusedId] = useState(-1);
  const term = useSelector(selectors.searchTermSelector);
  const loading = useSelector(selectors.searchLoadingSelector);
  const error = useSelector(selectors.searchErrorSelector);
  const results = useSelector(selectors.searchResultsSelector);
  const dispatch = useDispatch();
  const popup = useRef();
  const form = useRef();

  const getPodcasts = useCallback((term, options) => {
    if (term !== '') {
      dispatch(findPodcasts(term, options));
    }
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    getPodcasts(term);
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    dispatch(changeSearchTerm(inputValue));
  };

  const handleClear = () => {
    dispatch(clearSearchTerm());
    setFocusedId(-1);
  };

  const handleClose = (event) => {
    if (
      !popup.current.contains(event.target) &&
      !form.current.contains(event.target)
    ) {
      setShowResults(false);
      setFocusedId(-1);
    }
  };

  const handleItemClick = () => {
    setShowResults(false);
    handleClear();
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getPodcasts(term, { signal });

    return () => abortController.abort();
  }, [term, getPodcasts]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown' && focusedId < results.length - 1) {
        setFocusedId((prev) => prev + 1);
      }

      if (event.key === 'ArrowUp' && focusedId > 0) {
        setFocusedId((prev) => prev - 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedId, results.length]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClose);

    return () => {
      document.removeEventListener('mousedown', handleClose);
    }
  }, []);

  return (
    <div className="search">
      <SearchForm
        ref={form}
        term={term}
        loading={loading}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onClear={handleClear}
        onFocus={() => setShowResults(true)}
      />
      <div ref={popup}>
        { showResults && term.length > 0 &&
          <>
            { error &&
              <div className="search__popup">
                <SearchError />
              </div>
            }
            { results.length > 0 &&
              <div className="search__popup">
                <SearchList
                  results={results}
                  focusedId={focusedId}
                  onItemClick={handleItemClick}
                />
              </div>
            }
          </>
        }
      </div>
    </div>
  );
};

export default Search;
