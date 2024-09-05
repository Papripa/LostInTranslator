import React, { createContext, useEffect, useMemo, useState } from 'react';

// context that handle authorization
// put initial state for the parameter
const SendbirdContext = createContext({
  sbClient: {},
  setSbClient: () => {},
});

// provider of the context
function SendbirdProvider({ children }) {
  // state for saving the information of user
  const [sbClient, setSbClient] = useState();

  useEffect(() => {
    console.log('sbClient = ', sbClient);
  }, [sbClient]);

  // put state and control function into the store(value)
  const value = useMemo(
    () => ({
      sbClient,
      setSbClient,
    }),
    [sbClient, setSbClient]
  );

  // return provider of context to available to use context
  return (
    <SendbirdContext.Provider value={value}>
      {children}
    </SendbirdContext.Provider>
  );
}

// export context and provider
export { SendbirdContext };
export default SendbirdProvider;
