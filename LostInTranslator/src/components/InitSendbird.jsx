import React, { useContext, useEffect } from 'react';
import SendbirdChat from '@sendbird/chat';
import { OpenChannelModule } from '@sendbird/chat/openChannel';
import { APP_ID } from '../secret';
import { SendbirdContext } from '../contexts/sendbird';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';

const InitSendbird = ({ children }) => {
  const { setSbClient } = useContext(SendbirdContext);

  useEffect(() => {
    setSbClient(
      SendbirdChat.init({
        appId: APP_ID,
        modules: [new OpenChannelModule(), new GroupChannelModule()],
      })
    );
  }, [setSbClient]);

  return children;
};

export default InitSendbird;
