import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from './search.svg';
import { ReactComponent as SpinnerIcon } from './spinner.svg';
import { ReactComponent as CloseIcon } from './close.svg';
import './search-form.css';

const SearchForm = React.forwardRef(({
  term, loading, onSubmit, onChange, onFocus, onClear, onKeyDown }, ref) => {
  return (
    <form ref={ref} className="search-form" onSubmit={onSubmit}>
      <div className="search-form__field">
        <label className="visually-hidden" htmlFor="search">Find podcasts</label>
        <input
          className="search-form__input"
          id="search"
          type="text"
          value={term}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          placeholder="Find podcasts"
        />
        { !loading &&
          <SearchIcon
            className="search-form__icon search-form__icon-search"
            width="18"
            height="18"
            aria-hidden="true"
          />
        }
        { loading &&
          <SpinnerIcon
            className="search-form__icon search-form__icon-spinner"
            width="18"
            height="18"
            aria-hidden="true"
          />
        }
        { term.length > 0 &&
          <button
            className="search-form__clear"
            type="button"
            aria-label="Clear field"
            onClick={onClear}
          >
            <CloseIcon
              className="search-form__icon search-form__icon-close"
              width="18"
              height="18"
              aria-hidden="true"
            />
          </button>
        }
      </div>
    </form>
  );
});

SearchForm.propTypes = {
  term: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func
};

export default SearchForm;
