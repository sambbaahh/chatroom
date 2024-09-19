import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { Message, Room } from '../interfaces';
import { useAuth } from './use-auth';

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { token } = useAuth();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);

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
  }, [token, socket]);

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
      setCurrentRoom((prevCurrentRoom) =>
        prevCurrentRoom && prevCurrentRoom.id === room.id
          ? room
          : prevCurrentRoom
      );
    });

    socket.on('room-joined', (room) => {
      setCurrentRoom(room);
    });

    socket.on('room-left', () => {
      setCurrentRoom(undefined);
      setMessages([]);
    });

    socket.on('messages-received-on-join', (messagesData) => {
      setMessages(messagesData);
    });

    socket.on('message-received', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('disconnect', () => {
      setCurrentRoom(undefined);
      setMessages([]);
      setRooms([]);
    });

    return () => {
      // Clean up event listeners when component unmounts
      socket.off('receive-rooms-on-join');
      socket.off('room-created');
      socket.off('room-modified');
      socket.off('room-joined');
      socket.off('room-left');
      socket.off('messages-received-on-join');
      socket.off('message-received');
      socket.off('disconnect');
    };
  }, [socket, rooms]);

  const joinRoom = (roomId: number) => {
    socket?.emit('join-room', roomId);
  };

  const createRoom = (roomName: string) => {
    socket?.emit('create-room', roomName);
  };

  const leaveRoom = () => {
    socket?.emit('leave-room');
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
    currentRoom,
    joinRoom,
    createRoom,
    leaveRoom,
    sendMessage,
    disconnect,
  };
}
