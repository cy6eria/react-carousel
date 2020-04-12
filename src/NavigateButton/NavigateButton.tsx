import React, { FC } from 'react';
import cx from 'classnames';
import styles from './NavigateButton.module.css';

interface IProps {
  label: string;
  onNavigate: () => void;
  appearance: 'back' | 'forward';
  className?: string;
}

export const NavigateButton: FC<IProps> = React.memo((props) => {
  const { label, onNavigate, appearance, className } = props;
  return (
    <button
      aria-label={label}
      className={cx(styles.NavigateButton, {
        [styles['NavigateButton--back']]: appearance === 'back',
        [styles['NavigateButton--forward']]: appearance === 'forward',
      }, className)}
      onClick={onNavigate}
    >
      <div className={styles.NavigateButton__icon} />
    </button>
  );
});
