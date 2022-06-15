import * as React from 'react';
import CategoryBase from '../shared/CategoryBase';
import TopStory from '../shared/TopStory';
import '../assets/styles/homepage.css';
import { MainContainer } from '../layouts/MainContainer';
import { observer } from 'mobx-react-lite';
import PageHeader from '../layouts/PageHeader';

const HomePage = (): JSX.Element => {
  return (
    <MainContainer>
      <PageHeader showBookmarkButton title='Top Stories' />
      <div>
        <TopStory />
      </div>
      <div>
        <CategoryBase />
      </div>
    </MainContainer>
  );
};

export default observer(HomePage);
