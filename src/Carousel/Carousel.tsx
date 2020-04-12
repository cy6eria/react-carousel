import React, {
  FC, MouseEvent, Children, useCallback, useState, useMemo,
} from 'react';
import cx from 'classnames';
import { wrap } from '@popmotion/popcorn';
import { AnimatePresence } from 'framer-motion';
import { Context } from '../Context';
import { getLang } from '../getLang';
import { defaultComponents } from '../defaultComponents';
import styles from './Carousel.module.css';

interface IProps {
  className?: string;
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void;
  components?: object;
}

const swipeConfidenceThreshold = 10000;

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Carousel: FC<IProps> = (props) => {
  const { onClose, className, components, children } = props;
  const lang = getLang();

  const mergedComponents = useMemo(() => {
    return {
      ...defaultComponents,
      ...components,
    }
  }, [components]);

  const { CloseButton, BackButton, ForwardButton } = mergedComponents;

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
    components: mergedComponents,
    page, direction,
    onDrag: handleDrag,
  }), [page, direction]);

  return (
    <Context.Provider value={context}>
      <div className={cx(styles.Carousel, className)}>
        <AnimatePresence initial={false} custom={direction}>
          {children[imageIndex]}
        </AnimatePresence>
        <BackButton
          label={lang.back}
          appearance="back"
          onNavigate={handlePrev}
        />
        <ForwardButton
          label={lang.forward}
          appearance="forward"
          onNavigate={handleNext}
        />
        {onClose && (
          <CloseButton
            label={lang.close}
            onClick={onClose}
          />
        )}
      </div>
    </Context.Provider>
  );
};

Carousel.defaultProps = {

}

export default Carousel;
