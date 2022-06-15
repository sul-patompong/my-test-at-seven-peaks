import * as React from 'react';
import { NewsCard } from '../components/NewsCard/NewsCard';
import '../assets/styles/category-base.css';
import appStore from '../store/AppStore';
import { convertFristCharUpperCase } from '../utils/StringUtil';
import { observer } from 'mobx-react-lite';

const CategoryBase = (): JSX.Element => {
  const filterCategory = 'sport|culture|lifeandstyle';

  React.useEffect(() => {
    beginLoadNews();
  }, []);

  React.useEffect(() => {
    beginLoadNews();
  }, [appStore.sorting]);

  const beginLoadNews = async () => {
    await appStore.getNewsByCategoryBase(filterCategory);
  };

  return (
    <React.Fragment>
      {appStore.newItemByGroups &&
        appStore.newItemByGroups.map((category, idx) => {
          return (
            <div key={idx}>
              <h1 key={category.group}>
                {convertFristCharUpperCase(category.group)}
              </h1>
              <div className='category-base card-container'>
                {category.newsItem.map((item, idx) => (
                  <NewsCard
                    key={`${category.group}_${idx}`}
                    displayBody={false}
                    newsItem={item}
                  />
                ))}
              </div>
            </div>
          );
        })}
    </React.Fragment>
  );
};

export default observer(CategoryBase);
