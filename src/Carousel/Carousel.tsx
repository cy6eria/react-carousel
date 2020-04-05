import React, {
  FC, MouseEvent, Children, useCallback, useState, useMemo,
} from 'react';
import cx from 'classnames';
import { wrap } from '@popmotion/popcorn';
import { AnimatePresence } from 'framer-motion';
import { Context } from '../Context';
import { getLang } from '../getLang';
import styles from './Carousel.module.css';

interface IProps {
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
}

const swipeConfidenceThreshold = 10000;

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Carousel: FC<IProps> = (props) => {
  const { onClose, children } = props;
  const lang = getLang();

  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

  const imageIndex = wrap(0, Children.count(children), page);

  const paginate = useCallback((newDirection: number) => {
    setPage(([currentPage]) => [currentPage + newDirection, newDirection]);
  }, []);

  const handleDrag = useCallback((e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  }, []);

  const handlePrev = useCallback(() => {
    paginate(-1)
  }, []);

  const handleNext = useCallback(() => {
    paginate(1);
  }, []);

  const context = useMemo(() => ({
    page, direction,
    onDrag: handleDrag,
  }), [page, direction]);

  return (
    <Context.Provider value={context}>
      <div className={styles.Carousel}>
        <AnimatePresence initial={false} custom={direction}>
          {children[imageIndex]}
        </AnimatePresence>
        <button
          className={cx(styles['Carousel__button'], styles['Carousel__button--prev'])}
          onClick={handlePrev}
        >
          <div className={styles.Carousel__icon} />
        </button>
        <button
          className={cx(styles['Carousel__button'], styles['Carousel__button--next'])}
          onClick={handleNext}
        >
          <div className={styles.Carousel__icon} />
        </button>
        {onClose && (
          <button
            aria-label={lang.close}
            className={styles['Carousel__close']}
            onClick={onClose}
          >
            &times;
          </button>
        )}
      </div>
    </Context.Provider>
  );
};

export default Carousel;
