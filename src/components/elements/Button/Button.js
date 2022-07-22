import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function Button(props) {
  const { children, className, onClick, size, variant } = props;
  const classes = [styles.root, styles[size], styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  children: null,
  className: '',
  onClick: () => {},
  size: 'medium',
  variant: 'contained',
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['contained', 'outlined']),
};
