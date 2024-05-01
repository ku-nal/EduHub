import React from 'react';
import styles from './navbar.module.scss';

function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.navContainer}>
          Q&A Community Forum
        </div>
        <hr className={styles.horizontalLine} />
      </div>
    </div>
  );
}

export default Navbar;
