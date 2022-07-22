import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function ImageBox(props) {
  const { className, format, onClick, src } = props;
  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <img
      alt={src}
      className={classes}
      onClick={onClick}
      src={require(`../../../assets/${src}.${format}`)}
    />
  );
}

ImageBox.defaultProps = {
  className: '',
  format: 'svg',
  onClick: () => {},
  src: '',
};

ImageBox.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  format: PropTypes.oneOf(['jpg', 'jpeg', 'png', 'svg']),
  src: PropTypes.string,
};
