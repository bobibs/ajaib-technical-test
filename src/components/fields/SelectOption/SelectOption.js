import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImageBox from '../../elements/ImageBox';
import styles from './styles.module.css';

export default function SelectOption(props) {
  const { className, onClick, optionList, resetValue } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const classes = [styles.root, className].filter(Boolean).join(' ');
  const handleClick = () => setOpen(!open);
  const handleClickOption = (val) => {
    setValue(val);
    setOpen(false);
    onClick(val.length ? val : '');
  };

  const list = [{ label: 'All', value: '' }, ...optionList];

  useEffect(() => {
    if (resetValue) {
      setValue('');
    }
  }, [resetValue]);

  return (
    <div className={classes}>
      <button className={styles.select} onClick={handleClick}>
        <div className={styles.value}>{value.length ? value : 'All'}</div>
        <ImageBox
          className={styles.icon}
          src={open ? 'caret-down-blue' : 'caret-up-blue'}
        />
      </button>
      {open ? (
        <div className={styles.dropdown}>
          {list.map((i, idx) => (
            <div
              className={styles.option}
              key={idx}
              onClick={() => handleClickOption(i.value)}
            >
              {i.label}
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

SelectOption.defaultProps = {
  className: '',
  onClick: () => {},
  optionList: [],
  resetValue: false,
};

SelectOption.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  optionList: PropTypes.array,
  resetValue: PropTypes.bool,
};
