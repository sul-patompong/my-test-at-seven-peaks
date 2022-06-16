import styled from 'styled-components';

export const Loader = styled.div`
  position: absolute;
  height: 100%;
  background-color: white;
  top: 8rem;
  bottom: 0;
  left: 0;
  z-index: 99999;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loader;
