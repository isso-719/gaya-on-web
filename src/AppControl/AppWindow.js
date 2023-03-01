import { Box, Button, Flex, Heading, Spinner } from '@chakra-ui/react';
import React from 'react';
import { Start } from '../Start/Start';
import { RoomCreate } from '../RoomCreate/RoomCreate';
import { RoomChat } from '../RoomChat/RoomChat';

export const AppWindow = props => {
  // AppWindow には start, roomCreate, roomChat の 3 つの画面がある
  const [windowMode, setWindowMode] = React.useState('start');
  const [roomToken, setRoomToken] = React.useState(null);

  switch (windowMode) {
    case 'start':
      return (
        <Start setWindowMode={setWindowMode} setRoomToken={setRoomToken} />
      );
    case 'roomCreate':
      return (
        <RoomCreate setWindowMode={setWindowMode} roomToken={roomToken} />
      );
    case 'roomChat':
      return (
        <RoomChat setWindowMode={setWindowMode} roomToken={roomToken} />
      );
    default:
      return null;
  }
};
