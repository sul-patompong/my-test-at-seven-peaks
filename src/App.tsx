import * as React from 'react';
import './App.css';
import { NavBar } from './layouts/NavBar';
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import SearchResult from './pages/SearchResult';
import ArticlePage from './pages/ArticlePage';
import BookmarkPage from './pages/BookmarkPage';
import { Footer } from './layouts/Footer';
import appStore from './store/AppStore';
import { observer } from 'mobx-react-lite';
import Spinner from './components/Loader/Spinner';
import Loader from './components/Loader/Loader';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <div className='mainContent'>
      {appStore.isLoading ? (
        <Loader>
          <Spinner />
        </Loader>
      ) : (
        ''
      )}
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/search' element={<SearchResult />} />
          <Route path='/article/*' element={<ArticlePage />} />
          <Route path='/bookmark' element={<BookmarkPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default observer(App);
