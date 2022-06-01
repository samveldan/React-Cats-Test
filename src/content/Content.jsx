import { useSelector } from 'react-redux';
import Item from '../item/Item';
import ItemLoader from '../item-loader/ItemLoader';
import styles from './content.module.scss';

const Content = ({ isHome }) => {
  const { cats, favorites, isLoading } = useSelector((state) => state);

  return (
    <div className={styles.content}>
      <div className="container">
        <div className={styles.wrapper}>
          {isHome && !isLoading
            ? cats.map((cat, index) => {
                return <Item key={index} {...cat} isHome={true} wholeItem={cat} items={cats} />;
              })
            : favorites.map((cat, index) => {
                return (
                  <Item key={index} {...cat} isHome={false} wholeItem={cat} items={favorites} />
                );
              })}
          {isLoading &&
            [...new Array(10)].map((_, index) => {
              return <ItemLoader key={index} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Content;
