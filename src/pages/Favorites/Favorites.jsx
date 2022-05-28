import React from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../../redux/reducers/catsReducer';
import Content from '../../content/Content';

const Favorites = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setPage('favorites'));
  }, []);

  return <Content isHome={false} />;
};

export default Favorites;
