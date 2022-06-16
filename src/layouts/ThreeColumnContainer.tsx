import styled from 'styled-components';

export const ThreeColumnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > div {
    width: 30%;
    margin: 1rem;
    min-width: 20rem;
  }
`;
