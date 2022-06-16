import * as React from 'react';
import { NewsCard } from '../components/NewsCard/NewsCard';
import AppStore from '../store/AppStore';

import { MainContainer } from '../layouts/MainContainer';
import { ThreeColumnContainer } from '../layouts/ThreeColumnContainer';
import { observer } from 'mobx-react-lite';
import appStore from '../store/AppStore';
import PageHeader from '../layouts/PageHeader';

const SearchResult = (): JSX.Element => {
  const { searchItem } = AppStore;
  const [currentPage, setCurrentPage] = React.useState(2);

  React.useEffect(() => {
    loadNextPage();
  }, [currentPage]);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  // Fetch news at page loads
  React.useEffect(() => {
    setCurrentPage(2)
    beginLoadNews();
  }, [AppStore.searchKeyword, appStore.sorting]);

  const handleScroll = (e: any) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  const loadNextPage = async () => {
    await appStore.getSearchByKeywordNextPage(
      currentPage,
      AppStore.searchKeyword
    );
  };

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
    </MainContainer>
  );
};

export default observer(SearchResult);
