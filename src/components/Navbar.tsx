import React, { useState } from 'react'; // Import useState
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
  const [showTooltip, setShowTooltip] = useState(false); // State to manage tooltip visibility
  const bg = useColorModeValue('white', 'gray.800');

  const handleThemeToggle = () => {
    toggleColorMode(); // Toggle the theme
    setShowTooltip(true); // Show the tooltip

    // Set a timeout to hide the tooltip after 3 seconds
    setTimeout(() => {
      setShowTooltip(false); // Hide the tooltip
    }, 3000);
  };

  const NavLink = ({ children, icon }: { children: React.ReactNode; icon: string }) => (
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
      onClick={() => {
        const targetId = children.toString().toLowerCase();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.warn(`Element with ID "${targetId}" not found.`);
        }
      }}
    >
      <i className={`bi ${icon}`} style={{ marginRight: '8px' }}></i>
      {children}
    </Button>
  );

  return (
    <Box bg={bg} px={4} position="fixed" w="100%" top={0} zIndex={1000} boxShadow="sm">
      <Container maxW="container.xl">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Button variant="ghost" fontSize="xl" fontWeight="bold" display="flex" alignItems="center" gap={1}>
            <img src={logo} alt="Ezekiel Njuguna" className="logo-image" />
            E.M
          </Button>
            {/* Theme Switcher Button */}
            <Tooltip 
              label={colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'} 
              aria-label="A tooltip"
              isOpen={showTooltip} // Control visibility with state
            >
              <IconButton
                icon={colorMode === 'light' ? <Moon /> : <Sun />}
                onClick={handleThemeToggle} // Call the handler
                variant="ghost"
                aria-label="Toggle theme"
              />
            </Tooltip>
          <HStack spacing={6} alignItems={'center'}>
            <HStack as={'nav'} spacing={6} display={{ base: 'none', md: 'flex' }}>
              <NavLink icon="bi-house">Home</NavLink>
              <NavLink icon="bi-info-circle">About</NavLink>
              <NavLink icon="bi-tools">Skills</NavLink>
              <NavLink icon="bi-briefcase">Projects</NavLink>
              <NavLink icon="bi-blog">BlogPage</NavLink>
              <NavLink icon="bi-envelope">Contact</NavLink>
            </HStack>

            
          </HStack>

          <Box display={{ base: 'block', md: 'none' }}>
            <Menu>
              <MenuButton as={IconButton} aria-label="Options" icon={<MenuIcon />} variant="ghost" />
              <MenuList>
                <MenuItem onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>
                  <i className="bi bi-house" style={{ marginRight: '8px' }}></i> Home
                </MenuItem>
                <MenuItem onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                  <i className="bi bi-info-circle" style={{ marginRight: '8px' }}></i> About
                </MenuItem>
                <MenuItem onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}>
                  <i className="bi bi-tools" style={{ marginRight: '8px' }}></i> Skills
                </MenuItem>
                <MenuItem onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  <i className="bi bi-briefcase" style={{ marginRight: '8px' }}></i> Projects
                </MenuItem>
                <MenuItem onClick={() => document.getElementById('BlogPage')?.scrollIntoView({ behavior: 'smooth' })}>
                  <i className="bi bi-blog" style={{ marginRight: '8px' }}></i> Blogs
                </MenuItem>
                <MenuItem onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  <i className="bi bi-envelope" style={{ marginRight: '8px' }}></i> Contact
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
