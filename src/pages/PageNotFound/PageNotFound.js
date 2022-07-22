import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/elements/Button';
import ImageBox from '../../components/elements/ImageBox';
import styles from './styles.module.css';

export default function PageNotFound() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/');

  return (
    <div className={styles.root}>
      <ImageBox className={styles.image} src='404' />
      <Button onClick={handleClick} size='small' variant='outlined'>
        Back to home
      </Button>
    </div>
  );
}
