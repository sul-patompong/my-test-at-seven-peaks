import * as React from 'react';
import { NewsCard } from '../components/NewsCard/NewsCard';
import AppStore from '../store/AppStore';

import { MainContainer } from '../layouts/MainContainer';
import { ThreeColumnContainer } from '../layouts/ThreeColumnContainer';
import { observer } from 'mobx-react-lite';
import appStore from '../store/AppStore';
import PageHeader from '../layouts/PageHeader';

function isBottom(ref: React.RefObject<HTMLButtonElement>) {
  if (!ref.current) {
    return false;
  }
  return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
}

const SearchResult = (): JSX.Element => {
  const [page, setPage] = React.useState<number>(2);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { searchItem } = AppStore;
  const observItem = React.useRef<HTMLButtonElement>(null);

  // Fetch news at page loads
  React.useEffect(() => {
    beginLoadNews();
  }, [AppStore.searchKeyword, appStore.sorting]);

  const loadNextPage = async () => {
    setLoading(true);
    await appStore.getSearchByKeywordNextPage(page, AppStore.searchKeyword);
    setPage(page + 1);
    setLoading(false);
  };

  React.useEffect(() => {
    const onScroll = () => {
      if (!loading && isBottom(observItem)) {
        loadNextPage();
      }
    };
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [loadNextPage, loading]);

  const beginLoadNews = async () => {
    await AppStore.getSearchByKeyword(1, AppStore.searchKeyword);
  };

  return (
    <MainContainer>
      <PageHeader showBookmarkButton title='Search Result' />
      <ThreeColumnContainer>
        {searchItem &&
          searchItem.map((item, idx) => {
            return (
              <NewsCard
                key={idx}
                titleOnly={idx === 3 || idx === 4}
                displayBody={true}
                newsItem={item}
                height='300px'
              />
            );
          })}
      </ThreeColumnContainer>
      <button
        ref={observItem}
        style={{ display: 'none' }}
        onClick={loadNextPage}
      >
        Load more...
      </button>
    </MainContainer>
  );
};

export default observer(SearchResult);
