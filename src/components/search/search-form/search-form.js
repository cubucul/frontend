import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from './search.svg';
import { ReactComponent as SpinnerIcon } from './spinner.svg';
import { ReactComponent as CloseIcon } from './close.svg';
import styles from './search-form.module.css';

const SearchForm = React.forwardRef(({
  term, loading, onSubmit, onChange, onFocus, onClear, onKeyDown }, ref) => {
  const iconSeachClass = classNames(styles.icon, styles.iconSearch);
  const iconSpinnerClass = classNames(styles.icon, styles.iconSpinner);
  const iconCloseClass = classNames(styles.icon, styles.iconClose);

  return (
    <form ref={ref} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label className="visually-hidden" htmlFor="search">Find podcasts</label>
        <input
          className={styles.input}
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
            className={iconSeachClass}
            width="18"
            height="18"
            aria-hidden="true"
          />
        }
        { loading &&
          <SpinnerIcon
            className={iconSpinnerClass}
            width="18"
            height="18"
            aria-hidden="true"
          />
        }
        { term.length > 0 &&
          <button
            className={styles.clear}
            type="button"
            aria-label="Clear field"
            onClick={onClear}
          >
            <CloseIcon
              className={iconCloseClass}
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
