import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImageBox from '../ImageBox';
import { convertData, sortAsc, sortDesc, sortData } from './actions';
import styles from './styles.module.css';

export default function Table(props) {
  const { column, dataSource } = props;
  const [sortBy, setSortBy] = useState('');
  const [sortFormat, setSortFormat] = useState('');

  const handleSortAsc = (key) => {
    if (sortFormat !== 'asc') {
      setSortBy(key);
      setSortFormat('asc');
    } else {
      setSortBy('');
      setSortFormat('');
    }
  };

  const handleSortDesc = (key) => {
    if (sortFormat !== 'desc') {
      setSortBy(key);
      setSortFormat('desc');
    } else {
      setSortBy('');
      setSortFormat('');
    }
  };

  const data = column.map((i) => ({
    ...i,
    data: convertData(sortData(dataSource, sortBy, sortFormat)).map(
      (j) => j.filter((k) => k.key === i.key)[0],
    ),
  }));

  return (
    <div className={styles.root}>
      <Tables
        data={data}
        sortBy={sortBy}
        sortByAsc={handleSortAsc}
        sortByDesc={handleSortDesc}
        sortFormat={sortFormat}
      />
    </div>
  );
}

Table.defaultProps = {
  column: [],
  dataSource: {},
};

Table.propTypes = {
  column: PropTypes.array,
  dataSource: PropTypes.object,
};

export const Tables = (props) => {
  const { data, sortBy, sortByAsc, sortByDesc, sortFormat } = props;

  useEffect(() => {
    document.documentElement.style.setProperty('--arrayLength', data.length);
  }, []);

  return (
    <div className={styles.table}>
      {data.map((i, idx) => (
        <div key={idx}>
          <div className={styles.tableHead}>
            <div>{i.title}</div>
            {i.ascDesc ? (
              <div className={styles.tableHeadAction}>
                <ImageBox
                  className={`${styles.tableHeadIcon} ${styles.ascIcon} ${
                    sortBy === i.key && sortFormat === 'asc'
                      ? styles.tableHeadIconActive
                      : ''
                  }`}
                  onClick={() => sortByAsc(i.key)}
                  src='caret-up'
                />
                <ImageBox
                  className={`${styles.tableHeadIcon} ${styles.descIcon} ${
                    sortBy === i.key && sortFormat === 'desc'
                      ? styles.tableHeadIconActive
                      : ''
                  }`}
                  onClick={() => sortByDesc(i.key)}
                  src='caret-down'
                />
              </div>
            ) : (
              ''
            )}
          </div>
          <div className={styles.tableBody}>
            {i.data.map((j, jdx) => (
              <div className={styles.tableBodyText} key={jdx}>
                <div>{j && j.text}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

Tables.defaultProps = {
  data: [],
  sortBy: '',
  sortByAsc: () => {},
  sortByDesc: () => {},
  sortFormat: '',
};

Tables.propTypes = {
  data: PropTypes.array,
  sortBy: PropTypes.string,
  sortByAsc: PropTypes.func,
  sortByDesc: PropTypes.func,
  sortFormat: PropTypes.string,
};
