import React, { useCallback, useContext } from 'react';
import styles from './MainPage.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { SendbirdContext } from '../../contexts/sendbird';

const MainPage = () => {
  const navigate = useNavigate();
  const { user, resetUser } = useContext(AuthContext);
  const { sbClient } = useContext(SendbirdContext);

  const onLogout = useCallback(() => {
    resetUser();
    sbClient.disconnect();
    navigate('/login');
  }, [navigate, resetUser, sbClient]);

  return (
    <div className={styles.container}>
      <h3>MainPage</h3>
      <p>Hello, {user.userId}</p>
      <div className={styles.buttons}>
        <div className={styles.main_button}>
          <button className={styles.logout_button} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
