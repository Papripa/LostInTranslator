import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

// context that handle authorization
// put initial state for the parameter
const AuthContext = createContext({
  user: {},
  setUser: () => {},
  resetUser: () => {},
});

// provider of the context
function AuthProvider({ children }) {
  // state for saving the information of user
  const [user, setUser] = useState({});

  // reset function for 'user'
  const resetUser = useCallback(() => {
    setUser({});
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    console.log('user = ', user);
    if (user.userId) localStorage.setItem('user', user.userId);
  }, [user]);

  // put state and control function into the store(value)
  const value = useMemo(
    () => ({
      user,
      setUser,
      resetUser,
    }),
    [user, resetUser]
  );

  // return provider of context to available to use context
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// export context and provider
export { AuthContext };
export default AuthProvider;
