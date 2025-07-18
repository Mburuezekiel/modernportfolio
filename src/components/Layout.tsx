import React, { ReactNode } from 'react';
import { Box, Flex, Container, useColorModeValue, Link, IconButton, HStack } from '@chakra-ui/react';
import { Sun, Moon } from 'lucide-react'; // Assuming lucide-react for icons
import { useColorMode } from '@chakra-ui/react'; // For toggling color mode

// Define props for the Layout component
interface LayoutProps {
  children: ReactNode; // ReactNode allows any valid React child (elements, strings, etc.)
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.900'); // Background color for the entire layout
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900'); // Text color

  return (
    <Box bg={bgColor} color={textColor} minH="100vh" display="flex" flexDirection="column">
      {/* Header */}
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

      {/* Main Content Area */}
      <Box as="main" flex="1" py={8}>
        {children} {/* This is where the page-specific content will be rendered */}
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        width="full"
        py={6}
        bg={useColorModeValue('gray.100', 'gray.800')}
        textAlign="center"
        borderTopWidth="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        {/* <Container maxW="7xl">
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            &copy; {new Date().getFullYear()} Ezekiel Mburu. All rights reserved.
          </Text>
        </Container> */}
      </Box>
    </Box>
  );
};

export default Layout;
