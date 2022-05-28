import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorites } from '../redux/reducers/catsReducer';
import styles from './item.module.scss';

const Item = ({ url, id, isHome, image, image_id }) => {
  const { favorites } = useSelector((state) => state);
  const isFavorite = favorites.find((i) => i.image_id == id || image_id);
  const dispatch = useDispatch();

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
    const block = e.target.closest(`.${styles.item}`);

    const btn = e.target.closest(`.${styles.heart}`),
      emptyHeart = btn.querySelector('.empty'),
      fullHeart = btn.querySelector('.full');

    if (emptyHeart.classList.contains(styles.active)) {
      emptyHeart.classList.remove(styles.active);
      fullHeart.classList.add(styles.active);

      axios({
        method: 'POST',
        url: 'https://api.thecatapi.com/v1/favourites/',
        headers: {
          'x-api-key': 'e8222a91-b519-4510-80ea-acc718a86f1c',
        },
        data: {
          image_id: id,
          sub_id: '123',
        },
      })
        .then(() => changeFavs())
        .catch((error) => {
          console.log(error);
        });
    } else {
      emptyHeart.classList.add(styles.active);
      fullHeart.classList.remove(styles.active);
      // !isHome && block.remove();

      axios({
        method: 'GET',
        url: `https://api.thecatapi.com/v1/favourites`,
        headers: {
          'x-api-key': 'e8222a91-b519-4510-80ea-acc718a86f1c',
        },
      })
        .then((data) => {
          data.data.forEach((item) => {
            if (item.id == id) {
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
  };

  return (
    <div className={styles.item}>
      <img src={isHome ? url : image.url} alt="" />
      <button className={styles.heart} onClick={addToFav}>
        <img
          src={require('../assets/images/empty-heart.svg').default}
          alt=""
          className={isFavorite ? 'empty' : styles.active + ' empty'}
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
