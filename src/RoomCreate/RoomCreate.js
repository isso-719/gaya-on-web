import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text, useClipboard,
} from '@chakra-ui/react';

export const RoomCreate = props => {

  function CopyForm(text) {
    const { hasCopied, onCopy } = useClipboard(text.text)

    return (
      <>
        <Flex mb={2}>
          <Input
            mr={2}
            readOnly
            value={text.text}
          />
          <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
        </Flex>
      </>
    )
  }

  return (
    <Flex
      w={"100vw"}
      h={"100vh"}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      border={"1px solid black"}
    >
      <Box p={10} maxW={"98vw"} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading size="lg" letterSpacing={'tighter'} justifySelf="flex-start">
          ルームを作成しました
        </Heading>
        <Text mt={2} mb={2}>
          以下の情報を共有して、参加者を招待しましょう。
        </Text>
        <Box mt={10} mb={10} textAlign={"center"}>
          <FormControl>
            <FormLabel>サーバアドレス</FormLabel>
            {/*<Input w={"78%"} value={global.ServerUrl} />*/}
            {/*<Button mb={1} ml={1} w={"20%"} colorScheme={"teal"} onClick={copyToClipboard(global.ServerUrl, this)}>コピー</Button>*/}
            <CopyForm text={global.ServerUrl} />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>ルームトークン</FormLabel>
            {/*<Input w={"78%"} value={props.roomToken} />*/}
            {/*<Button mb={1} ml={1} w={"20%"} colorScheme={"teal"} onClick={copyToClipboard(props.roomToken, this)}>コピー</Button>*/}
            <CopyForm text={props.roomToken} />
          </FormControl>
        </Box>
        <Button colorScheme='teal' onClick={() => props.setWindowMode('start')}>Back</Button>
      </Box>
    </Flex>
  );
};