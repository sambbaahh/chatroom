import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { useLocalStorage } from './useLocalStorage';

export function useSocket() {
  const [token] = useLocalStorage('token', null);
  const socket: Socket = io('http://localhost:3000', {
    extraHeaders: {
      Authorization: token,
    },
  });

  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isUserInRoom, setIsUserInRoom] = useState(true);

  useEffect(() => {
    socket.on('receive-rooms-on-join', (roomsData) => {
      setRooms(roomsData);
    });

    socket.on('room-created', (room) => {
      setRooms((prevRooms) => [...prevRooms, room]);
    });

    socket.on('receive-messages-on-join', (messagesData) => {
      setMessages(messagesData);
    });

    socket.on('receive-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const joinRoom = (roomId: number) => {
    socket.emit('join-room', roomId);
    setIsUserInRoom(true);
  };

  const createRoom = (roomName: string) => {
    socket.emit('create-room', roomName);
  };

  const leaveRoom = (roomId: number) => {
    socket.emit('leave-room', roomId);
    setMessages([]);
    setIsUserInRoom(false);
  };

  const sendMessage = (message: string) => {
    socket.emit('send-message', message);
  };

  return {
    messages,
    rooms,
    isUserInRoom,
    joinRoom,
    createRoom,
    leaveRoom,
    sendMessage,
  };
}
