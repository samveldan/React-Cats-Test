import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Content from '../../content/Content';
import { setPage } from '../../redux/reducers/catsReducer';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('home'));
  }, []);

  return (
    <>
      <Content isHome={true} />
    </>
  );
};

export default Home;
