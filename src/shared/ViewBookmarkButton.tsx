import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Button } from '../components/Button/Button';
import BookmarkOnIcon from '../assets/images/bookmarkon-icon@2x.svg';
import { useNavigate } from 'react-router-dom';

export const ViewBookmarkButton = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Button
      text='VIEW BOOKMARK'
      icon={BookmarkOnIcon}
      onClick={() => navigate('/bookmark')}
    ></Button>
  );
};

export default observer(ViewBookmarkButton);
