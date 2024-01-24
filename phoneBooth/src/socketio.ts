import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export const subscribeToTopic = (topic: string, cb: (data: any) => void): void => {
  socket.on(topic, data => cb(data));
};

export const unsubscribeFromTopic = (topic: string): void => {
  socket.off(topic);
};
