import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImageBox from '../../elements/ImageBox';
import styles from './styles.module.css';

export default function InputSearch(props) {
  const { className, onClick, placeholder, resetValue } = props;
  const [value, setValue] = useState('');

  const classes = [styles.root, className].filter(Boolean).join(' ');
  const clearValue = () => setValue('');

  useEffect(() => {
    if (resetValue) {
      setValue('');
    }
  }, [resetValue]);

  return (
    <div className={classes}>
      <input
        className={styles.input}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        type='text'
      />
      {value.length ? (
        <div className={styles.clearIcon} onClick={clearValue}>
          <ImageBox className={styles.icon} src='clear' />
        </div>
      ) : (
        <div style={{ width: '2rem' }} />
      )}
      <div className={styles.icons} onClick={() => onClick(value)}>
        <ImageBox className={styles.icon} src='search' />
      </div>
    </div>
  );
}

InputSearch.defaultProps = {
  className: '',
  onClick: () => {},
  placeholder: 'Search',
  resetValue: false,
};

InputSearch.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  resetValue: PropTypes.bool,
};
