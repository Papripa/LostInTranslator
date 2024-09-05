import React, {
  useRef,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { AuthContext } from '../../contexts/auth';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import mainLogo from '../../icon/titlelogo.png';
import { SendbirdContext } from '../../contexts/sendbird';

const LoginPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const { sbClient } = useContext(SendbirdContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const [form, setForm] = useState({
    username: '',
  });

  const usernameRef = useRef(null);

  const navigate = useNavigate();

  const login = useCallback(
    (username) => {
      if (sbClient) {
        sbClient
          .connect(username)
          .then(async (user) => {
            console.log('success! ', user);

            await sbClient.updateCurrentUserInfo({
              nickname: username,
              userId: username,
            });

            console.log(sbClient.currentUser.metaData);
            if (!sbClient.currentUser.metaData.language) {
              await sbClient.currentUser.createMetaData({
                language: 'English',
              });
            }

            setUser(user);
            navigate('/');
          })
          .catch((e) => console.log('error! ', e));
      }
    },
    [navigate, sbClient, setUser]
  );

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!user.userId && savedUser) {
      login(savedUser);
    } else {
      setIsLoaded(true);
    }
  }, [login, user.userId]);

  // onClick method for button
  const onClickSubmit = useCallback(() => {
    if (form.username === '') {
      alert('Enter your nickname');
      if (usernameRef.current) usernameRef.current.focus();
    } else {
      login(form.username);
    }
  }, [form.username, login]);

  return isLoaded ? (
    <div className={styles.container}>
      <img
        className={styles.logo}
        src={mainLogo}
        alt='logo'
        onClick={() => {
          navigate('/login');
        }}
      />
      <h3 className={styles.title}>Enter your nickname to start</h3>
      <div className={styles.forms}>
        <input
          type='text'
          placeholder='Enter your nickname'
          id='username'
          value={form.username}
          onChange={({ target }) =>
            setForm({ ...form, username: target.value })
          }
          ref={usernameRef}
        />
      </div>
      <div className={styles.buttons}>
        <div className={styles.main_button}>
          <button className={styles.login_button} onClick={onClickSubmit}>
            Enter!
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default LoginPage;
