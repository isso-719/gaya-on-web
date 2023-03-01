import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

export const SplashScreen = props => {
  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center" flexDirection="column">
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        mb={"50px"}
      />
    </Flex>
  );
};
