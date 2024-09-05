import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

// context that handle modal
// put initial state for the parameter
const ModalContext = createContext({
  modal: '',
  setModal: (modal) => {},
  resetModal: () => {},
});

// provider of the context
function ModalProvider({ children }) {
  // state for handling the main value 'modal'
  const [modal, setModal] = useState('');

  // reset function for 'modal'
  const resetModal = useCallback(() => {
    setModal('');
  }, []);

  useEffect(() => {
    console.log('modal = ' + modal);
  }, [modal]);

  // put state and control function into the store(value)
  const value = useMemo(
    () => ({
      modal,
      setModal,
      resetModal,
    }),
    [modal, resetModal],
  );

  // return provider of context to available to use context
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

// export context and provider
export { ModalContext };
export default ModalProvider;
