import React, { FC } from 'react';
import styles from './Preloader.module.css';

interface IProps {

}

export const Preloader: FC<IProps> = React.memo((props) => {
  return (
    <div className={styles.Preloader}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
});
