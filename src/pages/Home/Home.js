import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Button from '../../components/elements/Button';
import Loader from '../../components/elements/Loader';
import Table from '../../components/elements/Table';
import InputSearch from '../../components/fields/InputSearch';
import Pagination from '../../components/fields/Pagination';
import SelectOption from '../../components/fields/SelectOption';
import { filterGenderList, listTableHead } from './data';
import styles from './styles.module.css';

export default function Home() {
  const { data, getAllUsers } = useSelector((s) => s.homeReducer);
  const [resetSearch, setResetSearch] = useState(false);
  const [resetGender, setResetGender] = useState(false);
  const [resetPagination, setResetPagination] = useState(false);
  const [filterGender, setFilterGender] = useState('');
  const [filterSearch, setFilterSearch] = useState('');

  const dispatch = useDispatch();

  const resetAllValue = () => {
    setResetSearch(false);
    setResetGender(false);
    setResetPagination(false);

    setTimeout(() => {
      setResetSearch(true);
      setResetGender(true);
      setResetPagination(true);
    }, 500);

    const val = {
      gender: '',
      page: 1,
    };

    dispatch(getAllUsers(val));
  };

  const getValueSearch = (val) => {
    setFilterSearch(val);
    setResetPagination(false);

    const vals = {
      gender: filterGender,
      page: 1,
    };

    dispatch(getAllUsers(vals));
  };

  const getValueGender = (val) => {
    setFilterGender(val);
    setResetPagination(false);
    const vals = {
      gender: val,
      page: 1,
    };

    dispatch(getAllUsers(vals));
  };

  const onClickPagination = (page) => {
    const val = {
      gender: filterGender,
      page,
    };

    dispatch(getAllUsers(val));
  };

  useEffect(() => {
    setResetPagination(true);
  }, [filterGender, filterSearch]);

  useEffect(() => {
    dispatch(getAllUsers(1));
  }, []);

  if (!Object.keys(data).length) {
    return (
      <div className={styles.root}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.filter}>
        <InputSearch
          className={styles.filterInput}
          onClick={getValueSearch}
          resetValue={resetSearch}
        />
        <SelectOption
          className={styles.filterSelect}
          onClick={getValueGender}
          optionList={filterGenderList}
          resetValue={resetGender}
        />
        <Button size='small' variant='outlined' onClick={resetAllValue}>
          Reset Filter
        </Button>
      </div>
      <Table column={listTableHead} dataSource={data} />
      <div className={styles.filterPagination}>
        <Pagination
          onClick={onClickPagination}
          resetValue={resetPagination}
          totalData={data.results ? data.results.length : 10}
        />
      </div>
    </div>
  );
}
