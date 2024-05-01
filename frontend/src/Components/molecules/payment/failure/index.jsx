import React from 'react';
import tick from '../../../../Assests/cancel-64.svg';
import styles from './Failure.module.scss';

const Cancel = () => (
  <div className={styles.payment}>
    <img
      className={styles.images}
      src={tick}
      alt="nothing"
    />
    <div className={styles.failureMessage}>Oops..payment failed</div>
    <div className={styles.failure}>Your payment was not completed please try again!</div>

  </div>
);

export default Cancel;
