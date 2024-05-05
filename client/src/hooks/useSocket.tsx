import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { Message, Room } from '../interfaces';
import { useAuth } from './useAuth';

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { token } = useAuth();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isUserInRoom, setIsUserInRoom] = useState(false);

  useEffect(() => {
    if (!token) return;

    const newSocket = io({
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
    if (!token) {
      socket?.disconnect();
    }
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    socket.on('receive-rooms-on-join', (roomsData) => {
      setRooms(roomsData);
    });

    socket.on('room-created', (room) => {
      setRooms((prevRooms) => [...prevRooms, room]);
    });

    socket.on('room-modified', (room) => {
      setRooms((prevRooms) =>
        prevRooms.map((r) => (r.id === room.id ? room : r))
      );
    });

    socket.on('receive-messages-on-join', (messagesData) => {
      setMessages(messagesData);
    });

    socket.on('receive-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('disconnect', () => {
      setIsUserInRoom(false);
      setMessages([]);
      setRooms([]);
    });

    return () => {
      // Clean up event listeners when component unmounts
      socket.off('receive-rooms-on-join');
      socket.off('room-created');
      socket.off('room-modified');
      socket.off('receive-messages-on-join');
      socket.off('receive-message');
      socket.off('disconnect');
    };
  }, [socket, rooms]);

  const joinRoom = (roomId: number) => {
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

  const disconnect = () => {
    socket?.disconnect();
  };

  return {
    messages,
    rooms,
    isUserInRoom,
    joinRoom,
    createRoom,
    leaveRoom,
    sendMessage,
    disconnect,
  };
}
