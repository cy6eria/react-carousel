import { ComponentType } from 'react';
import { Preloader } from './Preloader';
import { CloseButton } from './CloseButton';
import { ErrorMessage } from './ErrorMessage';
import { NavigateButton } from './NavigateButton';

type AnyComponent = ComponentType<any>;

export interface IComponents {
  Preloader: AnyComponent
  CloseButton: AnyComponent;
  ErrorMessage: AnyComponent;
  BackButton: AnyComponent;
  ForwardButton: AnyComponent;
}

export const defaultComponents: IComponents = {
  Preloader,
  CloseButton,
  ErrorMessage,
  BackButton: NavigateButton,
  ForwardButton: NavigateButton,
};
