import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  isSuccess: boolean
}

export const ToastWrapper = styled.div<IProps>`
  width: 100%;
  height: 3rem;
  background-color: ${(props) => props.isSuccess ? '#2E7E2E' : '#C61A24'};
  color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-weight: 500;

  img {
    height: 1rem;
    margin-right: 1rem;
  }
`;
