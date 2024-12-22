import React, { useState } from 'react';
import logo from '../assets/favicon.ico';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Avatar,
  Badge,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { Menu as MenuIcon, Sun, Moon, Search, Bell } from 'lucide-react';

const Navbar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [showTooltip, setShowTooltip] = useState(false);
  const bg = useColorModeValue('white', 'gray.800');

  const handleThemeToggle = () => {
    toggleColorMode();
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  const NavLink = ({ children, icon }) => (
    <Button
      px={4}
      py={1}
      rounded="md"
      variant="ghost"
      display="flex"
      alignItems="center"
      gap={2}
      _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
    >
      <i className={`bi ${icon}`} style={{ marginRight: '8px' }}></i>
      {children}
    </Button>
  );

  return (
    <>
      <Box bg={bg} px={4} position="fixed" w="100%" top={0} zIndex={1000} boxShadow="lg" backdropFilter="blur(10px)">
        <Container maxW="container.xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            {/* Logo */}
            <Button variant="ghost" fontSize="xl" fontWeight="bold" display="flex" alignItems="center" gap={2}>
              <img src={logo} alt="Logo" style={{ width: '30px' }} />
              E.M
            </Button>

            {/* Search Bar */}
            <InputGroup display={{ base: 'none', md: 'flex' }} maxW="300px">
              <Input placeholder="Search..." />
              <InputRightElement>
                <IconButton
                  icon={<Search />}
                  size="sm"
                  variant="ghost"
                  aria-label="Search"
                />
              </InputRightElement>
            </InputGroup>

            {/* Action Buttons */}
            <HStack spacing={4} alignItems="center">
              <Tooltip label={colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
                <IconButton
                  icon={colorMode === 'light' ? <Moon /> : <Sun />}
                  onClick={handleThemeToggle}
                  variant="ghost"
                  aria-label="Toggle theme"
                />
              </Tooltip>

              {/* Notifications */}
              <IconButton
                icon={
                  <Badge colorScheme="red" borderRadius="full" px={2}>
                    <Bell />
                  </Badge>
                }
                variant="ghost"
                aria-label="Notifications"
              />

              {/* User Avatar */}
              <Menu>
                <MenuButton>
                  <Avatar size="sm" />
                </MenuButton>
                <MenuList>
                  <MenuItem>View Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            {/* Mobile Menu */}
            <Box display={{ base: 'block', md: 'none' }}>
              <Menu isOpen={isOpen}>
                <MenuButton as={IconButton} aria-label="Options" icon={<MenuIcon />} variant="ghost" onClick={onToggle} />
                <MenuList>
                  <MenuItem>
                    <i className="bi bi-house" style={{ marginRight: '8px' }}></i> Home
                  </MenuItem>
                  <MenuItem>
                    <i className="bi bi-info-circle" style={{ marginRight: '8px' }}></i> About
                  </MenuItem>
                  <MenuItem>
                    <i className="bi bi-tools" style={{ marginRight: '8px' }}></i> Skills
                  </MenuItem>
                  <MenuItem>
                    <i className="bi bi-briefcase" style={{ marginRight: '8px' }}></i> Projects
                  </MenuItem>
                  <MenuItem>
                    <i className="bi bi-envelope" style={{ marginRight: '8px' }}></i> Contact
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
