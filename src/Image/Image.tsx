import React, { FC, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Context } from '../Context';
import { getLang } from '../getLang';
import styles from './Image.module.css';

interface IProps {
  url: string;
  [key: string]: any;
}

interface IState {
  isLoading: boolean;
  data?: string;
  error: boolean;
}

const dragConstraints = { left: 0, right: 0 };

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? window.innerWidth : -window.innerWidth,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? window.innerWidth : -window.innerWidth,
      opacity: 0
    };
  }
};

const transition = {
  x: { type: 'spring', stiffness: 300, damping: 200 },
  opacity: { duration: 0.2 }
};

export const Image: FC<IProps> = React.memo((props) => {
  const { page, direction, components, onDrag } = useContext(Context);
  const { url, ...otherProps } = props;
  const { Preloader, ErrorMessage } = components;
  const [state, setState] = useState<IState>({
    isLoading: true,
    data: undefined,
    error: false,
  });
  const lang = getLang();

  useEffect(() => {
    setState({
      isLoading: true,
      data: undefined,
      error: false,
    });

    axios.get(url, { responseType: 'blob' }).then(
      (resp) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setState({
            isLoading: false,
            data: reader.result as string,
            error: false,
          });
        }
        reader.readAsDataURL(resp.data);
      },
      (err) => {
        setState({
          isLoading: false,
          data: undefined,
          error: true,
        });
      }
    )
  }, [url]);

  let content;

  switch (true) {
    case state.isLoading: {
      content = <Preloader />;
      break;
    }
    case state.error: {
      content = (
        <ErrorMessage message={lang.errorMessage} />
      );
      break;
    }
    case !!state.data: {
      content = <img src={state.data} {...otherProps} />
      break;
    }
    default: {
      content = null;
    }
  }

  return (
    <motion.div
      className={styles.Image}
      key={page}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      drag="x"
      dragConstraints={dragConstraints}
      dragElastic={1}
      onDragEnd={onDrag}
    >
      {content}
    </motion.div>
  );
});

export default Image;
