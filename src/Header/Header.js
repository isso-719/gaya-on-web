import React from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Box, Flex, Heading, Menu } from '@chakra-ui/react';

export const Header = props => {

  return (
    <Menu>
      <Box id={"header"} pos={"fixed"} w={'100vw'} top={0} zIndex={10}>
        <Flex m={"0 auto"} maxW={"1200px"} h={16} alignItems={'center'} justifyContent={'space-between'} px={"24px"}>
          <Heading size="lg" letterSpacing={'tighter'} justifySelf="flex-start">
            GayaON!
          </Heading>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Box>
    </Menu>
  );
};
