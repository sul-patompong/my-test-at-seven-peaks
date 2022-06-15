import * as React from 'react';
import { NewsCard } from '../components/NewsCard/NewsCard';
import '../assets/styles/topStory.css';
import appStore, { NewsItem } from '../store/AppStore';
import { observer } from 'mobx-react-lite';

const TopStory = (): JSX.Element => {
  // Fetch news at page loads
  React.useEffect(() => {
    beginLoadNews();
  }, []);

  React.useEffect(() => {
    beginLoadNews();
  }, [appStore.sorting]);

  const beginLoadNews = async () => {
    await appStore.getTopStories();
  };

  return (
    <div className='top-stories card-container'>
      {appStore.topStories &&
        appStore.topStories.map((item, idx) => {
          return (
            <NewsCard
              key={idx}
              titleOnly={idx === 3 || idx === 4}
              displayBody={true}
              newsItem={item}
            />
          );
        })}
    </div>
  );
};
export default observer(TopStory);
