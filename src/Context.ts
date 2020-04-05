import { createContext } from 'react';
import { PanInfo } from 'framer-motion';

interface IContext {
  page: number;
  direction: number;
  onDrag: (e: MouseEvent | TouchEvent | PointerEvent, params: PanInfo) => void;
}

export const Context = createContext<IContext>({
  page: 0,
  direction: 0,
  onDrag: () => {},
});
