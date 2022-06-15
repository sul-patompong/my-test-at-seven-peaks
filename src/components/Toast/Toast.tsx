import * as React from 'react';
import { ToastWrapper } from './ToastWrapper';

import OnIcon from '../../assets/images/bookmarkon-icon@2x.svg';
import OffIcon from '../../assets/images/bookmarkoff-icon@2x.svg';

interface IToastProps {
  text: string;
  isSuccess: boolean;
}

export const Toast = (props: IToastProps): JSX.Element => {
  return (
    <ToastWrapper isSuccess={props.isSuccess}>
      <img src={props.isSuccess ? OnIcon : OffIcon} />
      <p>{props.text}</p>
    </ToastWrapper>
  );
};
