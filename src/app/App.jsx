import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCats, setFavorites, setIsLoading } from '../redux/reducers/catsReducer';
import { Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import Favorites from '../pages/Favorites/Favorites';
import Home from '../pages/Home/Home';
import './app.scss';
import NotFound from '../pages/404/NotFound';

const App = () => {
  const dispatch = useDispatch();
  const { cats } = useSelector((state) => state);
  const [fetching, setIsFetching] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalLength, setTotalLength] = React.useState(0);

  React.useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://api.thecatapi.com/v1/images/search?limit=15&size=small&mime_types=jpg,png',
      headers: {
        '-x-api-key': 'e8222a91-b519-4510-80ea-acc718a86f1c',
      },
    }).then((data) => {
      setTotalLength(data.headers['content-length']);
      dispatch(setCats(data.data));
      dispatch(setIsLoading(false));
    });

    axios({
      method: 'GET',
      url: 'https://api.thecatapi.com/v1/favourites/',
      headers: {
        'x-api-key': 'e8222a91-b519-4510-80ea-acc718a86f1c',
      },
    }).then((data) => dispatch(setFavorites(data.data)));

    document.addEventListener('scroll', scrollContent);

    return function () {
      document.removeEventListener('scroll', scrollContent);
    };
  }, []);

  const scrollContent = (e) => {
    const leftToBottom =
      e.target.documentElement.scrollHeight -
      (window.innerHeight + e.target.documentElement.scrollTop);

    if (leftToBottom < 150) setIsFetching(true);
  };

  React.useEffect(() => {
    if (fetching && totalLength > cats.length) {
      axios({
        method: 'GET',
        url: `https://api.thecatapi.com/v1/images/search?limit=15&size=small&mime_types=jpg,png&page=${currentPage}`,
        headers: {
          '-x-api-key': 'e8222a91-b519-4510-80ea-acc718a86f1c',
        },
      })
        .then((data) => {
          dispatch(setCats([...cats, ...data.data]));
          dispatch(setIsLoading(false));
        })
        .finally(() => {
          setCurrentPage((prev) => prev + 1);
          setIsFetching(false);
        });
    }
  }, [fetching]);

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <span className="catLoading">... загружаем еще котиков ...</span>
    </main>
  );
};

export default App;
