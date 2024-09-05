import React from 'react';
import AuthProvider from './auth';
import ModalProvider from './modal';
import SendbirdProvider from './sendbird';

// provider of the context
function ContextProvider({ children }) {
  return (
    <SendbirdProvider>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </SendbirdProvider>
  );
}

export default ContextProvider;
