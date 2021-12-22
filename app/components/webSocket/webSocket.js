import React, { useEffect } from 'react';
import { useAuthContext } from '../../context/authContext';

const Websocket = () => {
  const { user, setUser } = useAuthContext();
  const { token, isAuthenticated } = user;
  const pingInterval = 5000;
  const retryInterval = 60000;
  const webSocketUrl = process.env.WEB_SOCKET_URL;
  let webSocket;
  const heartBeat = () => {
    if (!webSocket) return;
    if (webSocket.readyState !== 1) return;
    webSocket.send(JSON.stringify('heartbeat'));
    setTimeout(heartBeat, pingInterval);
  };

  const connect = () => {
    webSocket = new WebSocket(webSocketUrl, [token]);
    webSocket.onmessage = (message) => {
      if (message.data) {
        setUser({ ...user, permissionUpdated: true });
      }
    };
    webSocket.onclose = (closeEvent) => {
      if (!closeEvent.wasClean) {
        setTimeout(() => {
          webSocket = connect();
        }, retryInterval);
      }
    };
    webSocket.onopen = () => {
      heartBeat();
    };
    return webSocket;
  };
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isAuthenticated) {
      webSocket = connect();
      return () => webSocket.close();
    }
    webSocket?.close();
  }, []);

  return <></>;
};
export default Websocket;
