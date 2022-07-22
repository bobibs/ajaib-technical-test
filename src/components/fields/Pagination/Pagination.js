import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function Pagination(props) {
  const { className, onClick, resetValue } = props;
  console.log(props);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(5);

  const classes = [styles.root, className].filter(Boolean).join(' ');
  const pages = 50 / 10;
  const handleClick = (page) => {
    setCurrentPage(page);
    onClick(page);
  };
  const handleClickFirst = () => {
    setCurrentPage(1);
    onClick(1);
  };
  const handleClickPrev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      onClick(currentPage - 1);
    }
  };
  const handleClickNext = () => {
    if (currentPage !== 5) {
      setCurrentPage(currentPage + 1);
      onClick(currentPage + 1);
    }
  };
  const handleClickLast = () => {
    setCurrentPage(5);
    onClick(5);
  };

  useEffect(() => {
    if (resetValue) {
      setCurrentPage(1);
    }
  }, [resetValue]);

  return (
    <div className={classes}>
      <div className={styles.child} onClick={handleClickFirst}>
        First
      </div>
      <div className={styles.child} onClick={handleClickPrev}>
        Prev
      </div>
      <div className={styles.childs}>
        {Array.from(Array(pages).keys()).map((i, idx) => (
          <div
            className={`${styles.child} ${
              currentPage === idx + 1 ? styles.childActive : ''
            }`}
            key={idx}
            onClick={() => handleClick(i + 1)}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className={styles.child} onClick={handleClickNext}>
        Next
      </div>
      <div className={styles.child} onClick={handleClickLast}>
        Last
      </div>
    </div>
  );
}

Pagination.defaultProps = {
  className: '',
  onClick: () => {},
  resetValue: false,
};

Pagination.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  resetValue: PropTypes.bool,
};
