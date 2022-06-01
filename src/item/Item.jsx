import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, setFavorites, removeFromFavorite } from '../redux/reducers/catsReducer';
import styles from './item.module.scss';

const Item = ({ wholeItem, items }) => {
  const { favorites, currentPage } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    favorites.forEach((fav) => {
      if (
        (typeof wholeItem.id == 'string' ? wholeItem.id : wholeItem.image_id) ==
        (typeof fav.id == 'string' ? fav.id : fav.image_id)
      ) {
        setIsFavorite(true);
      }
    });
  }, [favorites, currentPage]);

  const changeFavs = () => {
    axios({
      method: 'GET',
      url: 'https://api.thecatapi.com/v1/favourites/',
      headers: {
        'x-api-key': 'e8222a91-b519-4510-80ea-acc718a86f1c',
      },
    }).then((data) => dispatch(setFavorites(data.data)));
  };

  const addToFav = (e) => {
    if (!isFavorite) {
      dispatch(addToFavorite(wholeItem));
      axios({
        method: 'POST',
        url: 'https://api.thecatapi.com/v1/favourites/',
        headers: {
          'x-api-key': 'e8222a91-b519-4510-80ea-acc718a86f1c',
        },
        data: {
          image_id: wholeItem.id,
          sub_id: '123',
        },
      })
        .then(() => changeFavs())
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(removeFromFavorite(wholeItem));
      axios({
        method: 'GET',
        url: `https://api.thecatapi.com/v1/favourites`,
        headers: {
          'x-api-key': 'e8222a91-b519-4510-80ea-acc718a86f1c',
        },
      })
        .then((data) => {
          data.data.forEach((item) => {
            if (
              item.image_id == (typeof wholeItem.id == 'string' ? wholeItem.id : wholeItem.image_id)
            ) {
              setIsFavorite(false);
              axios({
                method: 'DELETE',
                url: `https://api.thecatapi.com/v1/favourites/${item.id}`,
                headers: {
                  'x-api-key': 'e8222a91-b519-4510-80ea-acc718a86f1c',
                },
              }).then(() => changeFavs());
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className={styles.item}>
      <img src={wholeItem.url || wholeItem.image.url} alt="" />
      <button className={styles.heart} onClick={addToFav}>
        <img
          src={require('../assets/images/empty-heart.svg').default}
          alt=""
          className={!isFavorite ? styles.active + ' empty' : 'empty'}
        />
        <img
          src={require('../assets/images/full-heart.svg').default}
          alt=""
          className={isFavorite ? styles.active + ' full' : 'full'}
        />
      </button>
    </div>
  );
};

export default Item;
