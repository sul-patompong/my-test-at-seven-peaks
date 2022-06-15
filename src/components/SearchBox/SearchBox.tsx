import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppStore from '../../store/AppStore';

// Custom assets
import SearchIcon from '../../assets/images/search-icon@2x.svg';
import './searchbox.css';

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
}

interface ISearchBox {
  isActive: boolean;
}

export const SearchBox = (props: SearchBoxProps): JSX.Element => {
  const [searchBox, setSearchBox] = useState<ISearchBox>({ isActive: false });
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const navigate = useNavigate();

  const onSearchIconClicked = (): void => {
    setSearchBox({
      isActive: !searchBox.isActive,
    });
  };

  const onEnterSearchBox = () => {
    navigate('/search')
    AppStore.setSearchKeyword(searchKeyword);
  }

  return (
    <div
      className={
        props.className +
        ' searchBox-container' +
        (searchBox?.isActive ? ' active' : ' inactive')
      }
    >
      <input
        type='text'
        placeholder={props.placeholder}
        onBlur={() => setSearchBox({ isActive: false })}
        onKeyDown={(key) => key.code === 'Enter' ?  onEnterSearchBox() : ''}
        onChange={(e) => setSearchKeyword(e.target.value)}
      ></input>
      <img
        className='searchBox-icon'
        src={SearchIcon}
        onClick={onSearchIconClicked}
      ></img>
    </div>
  );
};
