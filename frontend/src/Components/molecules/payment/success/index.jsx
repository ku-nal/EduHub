import React from 'react';
import tick from '../../../../Assests/tick.svg';
import styles from './Success.module.scss';

const Success = () => (
  <div className={styles.payment}>
    <img
      className={styles.images}
      src={tick}
      alt="nothing"
    />
    <div className={styles.successMessage}>Success!!</div>
    <div className={styles.success}>Your request has been processed successfully</div>

  </div>
);

export default Success;
