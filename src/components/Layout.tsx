import React, { ReactNode } from 'react';
import { Box, Flex, Container, useColorModeValue, Link, IconButton, HStack } from '@chakra-ui/react';
import { Sun, Moon } from 'lucide-react';
import { useColorMode } from '@chakra-ui/react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');

  return (
    <Box bg={bgColor} color={textColor} minH="100vh" display="flex" flexDirection="column">
      <Flex
        as="header"
        width="full"
        py={4}
        px={8}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow="sm"
        align="center"
        justify="space-between"
        position="sticky"
        top="0"
        zIndex="sticky"
      >
     
      </Flex>

      <Box as="main" flex="1" py={8}>
        {children}
      </Box>

      <Box
        as="footer"
        width="full"
        py={6}
        bg={useColorModeValue('gray.100', 'gray.800')}
        textAlign="center"
        borderTopWidth="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
      </Box>
    </Box>
  );
};

export default Layout;
