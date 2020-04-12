import React, { FC } from 'react';
import cx from 'classnames';
import styles from './CloseButton.module.css';

interface IProps {
  label: string;
  className?: string;
  onClick: (...args: any) => unknown;
}

export const CloseButton: FC<IProps> = React.memo((props) => {
  const { label, className, children, onClick } = props;
  return (
    <button
      aria-label={label}
      className={cx(styles.CloseButton, className)}
      onClick={onClick}
    >
      {children || <span>&times;</span>}
    </button>
  );
});
