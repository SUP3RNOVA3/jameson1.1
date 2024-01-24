import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

const DEFAULT_URL = 'http://localhost:8000';

type SocketHookReturnType = [Socket | null, boolean, Error | null, (eventName: string, callback: (...args: any[]) => void) => () => void, (eventName: string, data?: any) => void];

function useSocket(url: string = DEFAULT_URL): SocketHookReturnType {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [connectCallback, setConnectCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    const socketInstance = io(url, {extraHeaders:{connectionType:'phoneboothUI'}});

    socketInstance.on('connect', () => {
      console.log('Connected to socket');
      setSocket(socketInstance);
      setIsLoading(false);

      if (connectCallback) {
        connectCallback();
      }
    });

    socketInstance.on('connect_error', (err: Error) => {
      console.error('Connection error:', err);
      setError(err);
      setIsLoading(false);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from socket');
      setSocket(null);
      setIsLoading(true);
    });

    return () => {
      console.log('Disconnecting from socket');
      socketInstance.disconnect();
      setSocket(null);
      setIsLoading(true);
    };
  }, [url]);

  const addListener = (eventName: string, callback: (...args: any[]) => void) => {
    if (socket) {
      console.log("adding listener", eventName)
      socket.on(eventName, callback);
    }

    return () => {
      if (socket) {
        console.log("removing listener", eventName)
        socket.off(eventName, callback);
      }
    };
  };

  const emitMessage = (eventName: string, data?: any) => {
    if (socket && socket.connected) {
      socket.emit(eventName, data);
    } else {
      console.log('Socket not connected, message not sent');
      setConnectCallback(() => {
        console.log('Sending message after connecting');
        socket?.emit(eventName, data);
      });
    }
  };

  return [socket, isLoading, error, addListener, emitMessage];
}

export default useSocket;
