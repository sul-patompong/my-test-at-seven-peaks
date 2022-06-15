import styled from 'styled-components';

export const MainContainer = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  width: 80%;
  min-height: calc(100% - 13rem);

  @media (min-width: 50em) {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding: 3rem 0;
    width: 80%;
    min-height: calc(100% - 13rem);
  }
`;
