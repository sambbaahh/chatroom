import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { useLocalStorage } from './useLocalStorage';

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [token] = useLocalStorage('token', null);

  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isUserInRoom, setIsUserInRoom] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      extraHeaders: {
        Authorization: token,
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    socket.on('receive-rooms-on-join', (roomsData) => {
      console.log('receive-rooms-on-join');
      setRooms(roomsData);
    });

    socket.on('room-created', (room) => {
      console.log('room-created');
      setRooms((prevRooms) => [...prevRooms, room]);
    });

    socket.on('receive-messages-on-join', (messagesData) => {
      console.log('receive-messages-on-join');
      setMessages(messagesData);
    });

    socket.on('receive-message', (message) => {
      console.log('receive-message');
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Clean up event listeners when component unmounts
      socket.off('receive-rooms-on-join');
      socket.off('room-created');
      socket.off('receive-messages-on-join');
      socket.off('receive-message');
    };
  }, [socket]);

  const joinRoom = (roomId: number) => {
    if (isUserInRoom) {
      leaveRoom();
    }
    socket?.emit('join-room', roomId);
    setIsUserInRoom(true);
  };

  const createRoom = (roomName: string) => {
    if (isUserInRoom) {
      leaveRoom();
    }
    socket?.emit('create-room', roomName);
    setIsUserInRoom(true); // user is automatically joined to the room they created
  };

  const leaveRoom = () => {
    socket?.emit('leave-room');
    setMessages([]);
    setIsUserInRoom(false);
  };

  const sendMessage = (message: string) => {
    socket?.emit('send-message', message);
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
