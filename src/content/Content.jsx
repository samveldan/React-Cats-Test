import { useSelector } from 'react-redux';
import Item from '../item/Item';
import styles from './content.module.scss';

const Content = ({ isHome }) => {
  const { cats, favorites } = useSelector((state) => state);

  return (
    <div className={styles.content}>
      <div className="container">
        <div className={styles.wrapper}>
          {isHome
            ? cats.map((cat, index) => {
                return <Item key={index} {...cat} isHome={true} wholeItem={cat} items={cats} />;
              })
            : favorites.map((cat, index) => {
                return (
                  <Item key={index} {...cat} isHome={false} wholeItem={cat} items={favorites} />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Content;
