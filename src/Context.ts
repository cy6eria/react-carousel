import { createContext } from 'react';
import { PanInfo } from 'framer-motion';

import { defaultComponents, IComponents } from './defaultComponents';

interface IContext {
  components: IComponents;
  page: number;
  direction: number;
  onDrag: (e: MouseEvent | TouchEvent | PointerEvent, params: PanInfo) => void;
}

export const Context = createContext<IContext>({
  components: defaultComponents,
  page: 0,
  direction: 0,
  onDrag: () => {},
});
