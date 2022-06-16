import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Dropdown from '../components/Dropdown/Dropdown';
import ViewBookmarkButton from '../shared/ViewBookmarkButton';
import appStore from '../store/AppStore';

interface PageHeaderProps {
  title: string;
  showBookmarkButton?: boolean;
}

export const PageHeader = (props: PageHeaderProps): JSX.Element => {
  return (
    <div className='homepage-topic-container'>
      <h1>{props.title}</h1>
      <div className='page_header_container'>
        {props.showBookmarkButton ? <ViewBookmarkButton /> : <span></span>}
        <Dropdown
          value={appStore.sorting}
          onSelectedChange={(sort) => appStore.setSorting(sort)}
          list={[
            { value: 'newest', text: 'Newest First' },
            { value: 'oldest', text: 'Oldest First' },
          ]}
        />
      </div>
    </div>
  );
};

export default observer(PageHeader);
