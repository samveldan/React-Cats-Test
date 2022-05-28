import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCats, setFavorites } from '../redux/reducers/catsReducer';
import { Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import Favorites from '../pages/Favorites/Favorites';
import Home from '../pages/Home/Home';
import './app.scss';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://api.thecatapi.com/v1/images/search?limit=15&size=small&mime_types=jpg,png',
      headers: {
        '-x-api-key': 'e8222a91-b519-4510-80ea-acc718a86f1c',
      },
    }).then((data) => dispatch(setCats(data.data)));

    axios({
      method: 'GET',
      url: 'https://api.thecatapi.com/v1/favourites/',
      headers: {
        'x-api-key': 'e8222a91-b519-4510-80ea-acc718a86f1c',
      },
    }).then((data) => dispatch(setFavorites(data.data)));
  }, []);

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
      </Routes>
    </main>
  );
};

export default App;
