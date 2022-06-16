import styled from 'styled-components';

export const ArticleContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 5rem;

  @media (min-width: 50rem) {
    grid-template-columns: 1.5fr 1fr;
  }

  img {
    width: 100%;
    height: auto;
  }

  .img-article {
    align-self: center;
  }
`;
