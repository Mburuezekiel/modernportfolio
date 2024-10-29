import React, { useState, useEffect, useRef } from 'react'; // Import useRef
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
  useDisclosure,
  useColorModeValue,
  Container,
  useColorMode,
  Tooltip,
} from '@chakra-ui/react';
import { Menu as MenuIcon, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [showTooltip, setShowTooltip] = useState(false);
  const bg = useColorModeValue('white', 'gray.800');
  const menuRef = useRef(null); // Create a ref for the Menu component

  const handleThemeToggle = () => {
    toggleColorMode();
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };

  const NavLink = ({ children, icon, onClick }) => (
    <Button
      px={4}
      py={1}
      rounded={'md'}
      variant="ghost"
      display="flex"
      alignItems="center"
      gap={2}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      onClick={onClick}
    >
      <i className={`bi ${icon}`} style={{ marginRight: '8px' }}></i>
      {children}
    </Button>
  );

  // Effect to handle clicks outside of the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Close the menu if the click is outside
        onToggle();
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onToggle]);

  return (
    <>
      <Box bg={bg} px={4} position="fixed" w="100%" top={0} zIndex={1000} boxShadow="sm">
        <Container maxW="container.xl">
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Button variant="ghost" fontSize="xl" fontWeight="bold" display="flex" alignItems="center" gap={1}>
              <img src={logo} alt="Ezekiel Njuguna" className="logo-image" />
              E.M
            </Button>
            <Tooltip 
              label={colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'} 
              aria-label="A tooltip"
              isOpen={showTooltip}
            >
              <IconButton
                icon={colorMode === 'light' ? <Moon /> : <Sun />}
                onClick={handleThemeToggle}
                variant="ghost"
                aria-label="Toggle theme"
              />
            </Tooltip>
            <HStack spacing={6} alignItems={'center'}>
              <HStack as={'nav'} spacing={6} display={{ base: 'none', md: 'flex' }}>
                <NavLink icon="bi-house" onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>Home</NavLink>
                <NavLink icon="bi-info-circle" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>About</NavLink>
                <NavLink icon="bi-tools" onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}>Skills</NavLink>
                <NavLink icon="bi-briefcase" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>Projects</NavLink>
                <NavLink icon="bi-envelope" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact</NavLink>
              </HStack>
            </HStack>
            <Box display={{ base: 'block', md: 'none' }} ref={menuRef}>
              <Menu isOpen={isOpen}>
                <MenuButton as={IconButton} aria-label="Options" icon={<MenuIcon />} variant="ghost" onClick={onToggle} />
                <MenuList>
                  <MenuItem onClick={() => { document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); onToggle(); }}>
                    <i className="bi bi-house" style={{ marginRight: '8px' }}></i> Home
                  </MenuItem>
                  <MenuItem onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); onToggle(); }}>
                    <i className="bi bi-info-circle" style={{ marginRight: '8px' }}></i> About
                  </MenuItem>
                  <MenuItem onClick={() => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); onToggle(); }}>
                    <i className="bi bi-tools" style={{ marginRight: '8px' }}></i> Skills
                  </MenuItem>
                  <MenuItem onClick={() => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); onToggle(); }}>
                    <i className="bi bi-briefcase" style={{ marginRight: '8px' }}></i> Projects
                  </MenuItem>
                  <MenuItem onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); onToggle(); }}>
                    <i className="bi bi-envelope" style={{ marginRight: '8px' }}></i> Contact
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Main Content Overlay */}
      {isOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.1)" // Adjust the opacity here
          zIndex={900} // Ensure it is below the Navbar
        />
      )}
    </>
  );
};

export default Navbar;
