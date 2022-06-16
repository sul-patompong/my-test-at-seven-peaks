import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import appStore from '../store/AppStore';
import { MainContainer } from '../layouts/MainContainer';
import { ArticleContainer } from '../layouts/ArticleContainer';
import { Button } from '../components/Button/Button';
import BookMarkIcon from '../assets/images/bookmarkon-icon@2x.svg';
import { Toast } from '../components/Toast/Toast';

const ArticlePage = (): JSX.Element => {
  const [showToast, setShowToast] = React.useState<boolean>(false);
  const params = useParams();
  const id: string = params['*'] ?? '';

  React.useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
  }, []);

  const loadData = async () => {
    await appStore.loadArticleById(id);

  };

  const handleBookmarkOnClick = () => {
    if (appStore.isBookmarkExist(id)) appStore.removeFromBookmark(id);
    else appStore.addToBookmark(id);

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  return (
    <MainContainer>
      <Button
        text={appStore.isBookmarkExist(id) ? 'Remove Bookmark' : 'Add Bookmark'}
        icon={BookMarkIcon}
        onClick={handleBookmarkOnClick}
        disabled={appStore.isBookmarkExist(id)}
      ></Button>
      <ArticleContainer>
        <div>
          <p>
            {appStore.articleItem?.webPublicationDate
              ? new Date(appStore.articleItem?.webPublicationDate)
                  .toDateString()
                  .toUpperCase()
              : 'NO PUBLISH DATE'}
          </p>
          <h1>{appStore.articleItem?.webTitle}</h1>
          <h3>{appStore.articleItem?.fields.headline}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: appStore.articleItem?.fields.body ?? '',
            }}
          />
        </div>
        {appStore.articleItem?.fields.thumbnail && (
          <img
            className='img-article'
            src={appStore.articleItem.fields.thumbnail}
          />
        )}
      </ArticleContainer>
      {showToast && (
        <Toast
          isSuccess={appStore.isBookmarkExist(id)}
          text={
            appStore.isBookmarkExist(id)
              ? 'SAVED TO BOOKMARK'
              : 'REMOVED FROM BOOKMARK'
          }
        ></Toast>
      )}
    </MainContainer>
  );
};

export default observer(ArticlePage);
