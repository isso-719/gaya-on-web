import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button, CloseButton,
  Flex,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import * as PropTypes from 'prop-types';

function Form(props) {
  return null;
}

Form.propTypes = { children: PropTypes.node };
export const Start = props => {
  const [error, setError] = React.useState(null);
  function joinRoom() {
    global.ServerUrl = document.getElementById('room-join-address-input').value;
    let token = document.getElementById('room-token-input').value;


    // fetch による POST リクエスト
    fetch(global.ServerUrl + '/v1/room/find', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((json) => {
          props.setWindowMode('roomChat');
          props.setRoomToken(json.token);
        });
      }
      else {
        res.json().then((json) => {
          setError(json.error);
        });
      }
    }).catch((e) => {
      setError(e.message);
    });
  }

  function createRoom() {
    global.ServerUrl = document.getElementById('room-create-address-input').value;

    fetch(global.ServerUrl + '/v1/room/create', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok) {
        res.json().then((json) => {
          if (json.message === "success") {
            props.setWindowMode('roomCreate');
            props.setRoomToken(json.token);
          }
          else {
            setError(json.error);
          }
        });
      }
      else {
        res.json().then((json) => {
          setError(json.error);
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

  let serverUrl = global.ServerUrl;

  return (
    <Flex w={"100vw"} minH={"100vh"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>

      <ErrorAlert />

      <Flex w={"100vw"} h={"50vh"} className={"start-title"}
        alignItems="center" justifyContent="center" flexDirection="column">
        <Heading size="lg" letterSpacing={'tighter'} justifySelf="flex-start" fontWeight="bold" fontSize={84}>
          GayaON!
        </Heading>
        <Text mt={2} fontWeight="bold">
          プレゼンテーションをもっと楽しく
        </Text>
      </Flex>

      <Flex className={"start-controls"} w={"100vw"} h={"50vh"} alignItems="start" justifyContent={"center"}>

        <Flex className={"start-controls-component"} m={1} pb={"50px"} h={"80%"} alignItems="center" flexDirection="column"
          p={10} maxW={"98vw"} borderWidth={1} borderRadius={8} boxShadow="lg">
          <Text fontWeight="bold" fontSize={24} mb={2}>
            ルームに参加する
          </Text>
          <Text fontSize={16} mb={10} textAlign={"center"}>
            イベントの参加者向け
          </Text>
          <Box textAlign={"center"}>
            <Input id={"room-join-address-input"} display={"block"} mb={1} w={"320px"} maxW={"80vw"} h={"40px"}
                   placeholder="サーバアドレス" defaultValue={serverUrl} />
            <Input id={"room-token-input"} display={"block"} mb={1} w={"320px"} maxW={"80vw"} h={"40px"} placeholder="ルームトークン" />
            <Button display={"block"} w={"320px"} maxW={"80vw"} h={"40px"} colorScheme='teal' onClick={() => joinRoom()}>Join</Button>
          </Box>
        </Flex>

        <Flex className={"start-controls-component"} m={1} pb={"50px"} h={"80%"} alignItems="center" flexDirection="column"
              p={10} maxW={"98vw"} borderWidth={1} borderRadius={8} boxShadow="lg">
          <Text fontWeight="bold" fontSize={24} mb={2}>
            ルームを作成する
          </Text>
          <Text fontSize={16} mb={10} textAlign={"center"}>
            イベントの主催者向け
          </Text>
          <Box textAlign={"center"}>
            <Input id={"room-create-address-input"} display={"block"} mb={1} w={"320px"} maxW={"80vw"} h={"40px"}
                   placeholder="サーバアドレス" defaultValue={serverUrl} />
            <Button display={"block"} mb={1} w={"320px"} maxW={"80vw"} h={"40px"} colorScheme='teal'
                    onClick={() => createRoom()}>Create</Button>
          </Box>
        </Flex>

      </Flex>
    </Flex>
  );
};
