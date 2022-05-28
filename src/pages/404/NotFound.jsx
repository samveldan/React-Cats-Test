import { Link } from 'react-router-dom';
import styles from './notFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>Ничего не найдено :(</h1>
      <Link to={'/'}>
        <button className={styles.btn}>Вернуться на главную</button>
      </Link>
    </div>
  );
};

export default NotFound;
