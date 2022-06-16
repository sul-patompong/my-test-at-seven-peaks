import { useNavigate } from 'react-router-dom';
import SevenPeaksLogo from '../assets/images/Logo_White.png';
import { SearchBox } from '../components/SearchBox/SearchBox';

export const NavBar = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <div className='navbar-wrapper'>
        <div className='navbar-logo-wrapper'>
          <img
            className='navbar-logo'
            src={SevenPeaksLogo}
            onClick={() => navigate('/')}
          />
        </div>
        <div className='navbar-search-wrapper'>
          <SearchBox
            className='navbar-searchBox'
            placeholder='Search all news'
          ></SearchBox>
        </div>
      </div>
    </div>
  );
};
