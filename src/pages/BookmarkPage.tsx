import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { NewsCard } from '../components/NewsCard/NewsCard';
import { MainContainer } from '../layouts/MainContainer';
import { ThreeColumnContainer } from '../layouts/ThreeColumnContainer';
import PageHeader from '../layouts/PageHeader';
import appStore from '../store/AppStore';

const BookmarkPage = (): JSX.Element => {
  useEffect(() => {
    appStore.loadArticlesInBookMark();
  }, [appStore.sorting]);

  return (
    <MainContainer>
      <PageHeader title='All Bookmarks' />
      <ThreeColumnContainer>
        {appStore.articleByBookmark &&
          appStore.articleByBookmark.map((article, idx) => (
            <NewsCard
              key={idx}
              titleOnly={idx === 3 || idx === 4}
              displayBody={true}
              newsItem={article}
              height='300px'
            />
          ))}
      </ThreeColumnContainer>
    </MainContainer>
  );
};

export default observer(BookmarkPage);
