import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

const Header = () => {
  const { currentPage } = useSelector((state) => state);

  return (
    <header className={styles.header}>
      <div className="container">
        <ul className={styles.wrapper}>
          <Link to={'/'}>
            <li className={currentPage == 'home' ? styles.active : ''}>Все котики</li>
          </Link>
          <Link to={'/favorites'}>
            <li className={currentPage == 'favorites' ? styles.active : ''}>Любимые котики</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
