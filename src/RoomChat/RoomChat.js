import React from 'react';
import {
  Alert, AlertDescription,
  AlertIcon, AlertTitle,
  Box,
  Button, CloseButton,
  Code,
  Flex,
  Heading,
  Input,
  Text,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export const RoomChat = props => {
  const [error, setError] = React.useState(null);

  let menu = document.getElementById('header');
  menu.style.display = 'none';

  function Back() {
    props.setWindowMode('start')
    menu.style.display = 'block';
  }

  function textSend() {
    let body = document.getElementById('chat-text-message-body').value;
    if (body === '') {
      return;
    }
    let message = {
      token: props.roomToken,
      message_type: 'text',
      message_body: body,
    }

    fetch(global.ServerUrl + '/v1/message/send', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    }).then((res) => {
      if (!res.ok) {
        res.json().then((json) => {
          throw new Error(json.error);
        });
      }
      document.getElementById('chat-text-message-body').value = '';
    }).catch((e) => {
      setError(e.message);
    });
  }

  function emojiSend(emoji) {
    let body = emoji.native;
    if (body === '') {
      return;
    }
    let message = {
      token: props.roomToken,
      message_type: 'emoji',
      message_body: body,
    }

    fetch(global.ServerUrl + '/v1/message/send', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    }).then((res) => {
      if (!res.ok) {
        res.json().then((json) => {
          throw new Error(json.error);
        });
      }
    }).catch((e) => {
      setError(e.message);
    });
  }

  function ErrorAlert() {
    return error ? (
      <Alert display={"flex"} pos={"fixed"} status='error'
             w={"auto"} top={10} left={"50%"} transform={"translate3d(-50%, -50%, 0)"} zIndex={100}>
        <AlertIcon />
        <Box >
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription display='block'>
            {error}
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf='flex-end'
          position='relative'
          right={-1}
          top={-5}
          onClick={() => setError(null)}
        />
      </Alert>
    ) : null
  }

  // chakraui theme
  const chakraColor = useColorModeValue('light', 'dark')

  return (
    <Flex
      w={"100vw"}
      h={"100vh"}
      flexDirection="column"
    >
      <ErrorAlert />
      <Box>
        <Flex p={"28px"} w={"100%"} maxW={"1200px"} m={"0 auto"} alignItems={'center'} justifyContent={'space-between'}>
          <Flex>
            <Button ml={2} onClick={Back}>Back</Button>
          </Flex>
          <Flex>
            <Text ml={2} size="lg" letterSpacing={'tighter'} justifySelf="flex-start">
              RoomToken:
            </Text>
            <Code ml={2} size="lg" letterSpacing={'tighter'} justifySelf="flex-start" colorScheme="teal">
              {props.roomToken}
            </Code>
          </Flex>
        </Flex>
      </Box>
      <Flex w={"100%"} h={"100%"} alignItems={'center'} justifyContent={'center'}>
        <Flex className={"chat-controller"}  flexDirection="column" alignItems={'center'} justifyContent={'center'}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            メッセージ
          </Text>
          <Flex mt={2} w={"90%"}>
            <Input id={"chat-text-message-body"} w={"80%"} placeholder="送りたいメッセージ" />
            <Button ml={2} w={"20%"} colorScheme="teal" onClick={textSend}>送信</Button>
          </Flex>
          <Text mt={"32px"} fontWeight={"bold"} fontSize={"xl"}>
            リアクション
          </Text>
          <Picker data={data} onEmojiSelect={emojiSend} theme={chakraColor} />
        </Flex>
      </Flex>
    </Flex>
  );
};