import React, { useState, useEffect } from 'react';
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
  Image,
  Text,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack
} from '@chakra-ui/react';
import { Menu as MenuIcon, Sun, Moon, Home, Info, Tool, Briefcase, FileText, Mail, X } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const navItems = [
  { name: 'Home', icon: <Home size={18} />, id: 'home' },
  { name: 'About', icon: <Info size={18} />, id: 'about' },
  { name: 'Skills', icon: <Tool size={18} />, id: 'skills' },
  { name: 'Projects', icon: <Briefcase size={18} />, id: 'projects' },
  { name: 'Blogs', icon: <FileText size={18} />, id: 'blogs' },
  { name: 'Contact', icon: <Mail size={18} />, id: 'contact' }
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [showTooltip, setShowTooltip] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const logoTextColor = useColorModeValue('gray.800', 'white');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const activeBg = useColorModeValue('orange.50', 'gray.700');
  const activeColor = useColorModeValue('orange.500', 'orange.300');

  // Handle scroll events for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Add shadow and change background opacity when scrolled
      if (scrollPosition > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const validSections = sections.filter(section => section !== null);
      
      for (let i = validSections.length - 1; i >= 0; i--) {
        const section = validSections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeToggle = () => {
    toggleColorMode();
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      onClose(); // Close mobile menu if open
    }
  };

  const NavLink = ({ item }) => (
    <Button
      px={4}
      py={2}
      rounded="md"
      variant="ghost"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      gap={2}
      width="full"
      color={activeSection === item.id ? activeColor : undefined}
      bg={activeSection === item.id ? activeBg : undefined}
      _hover={{
        bg: hoverBg,
      }}
      onClick={() => scrollToSection(item.id)}
      transition="all 0.2s"
    >
      {item.icon}
      {item.name}
    </Button>
  );

  return (
    <Box 
      bg={scrolled ? bg : 'transparent'} 
      backdropFilter={scrolled ? 'blur(10px)' : 'none'}
      boxShadow={scrolled ? 'sm' : 'none'}
      position="fixed" 
      w="100%" 
      top={0} 
      zIndex={1000}
      transition="all 0.3s ease"
      borderBottom={scrolled ? `1px solid ${borderColor}` : 'none'}
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            display="flex"
            alignItems="center"
          >
            <Button 
              variant="ghost" 
              fontSize="xl" 
              fontWeight="bold" 
              display="flex" 
              alignItems="center" 
              gap={2}
              color={logoTextColor}
              _hover={{ bg: 'transparent' }}
              onClick={() => scrollToSection('home')}
            >
              <Image src={logo} alt="Logo" boxSize="30px" />
              <Text>E.M</Text>
            </Button>
          </MotionBox>

          {/* Desktop Navigation */}
          <MotionBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HStack as="nav" spacing={1} display={{ base: 'none', md: 'flex' }}>
              {navItems.map((item) => (
                <NavLink key={item.id} item={item} />
              ))}
            </HStack>
          </MotionBox>

          {/* Theme Toggle Button */}
          <HStack spacing={3}>
            <Tooltip 
              label={colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'} 
              placement="bottom"
              isOpen={showTooltip}
              hasArrow
            >
              <IconButton
                icon={colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                onClick={handleThemeToggle}
                variant="ghost"
                aria-label="Toggle theme"
                size="md"
                color={useColorModeValue('gray.600', 'yellow.400')}
                _hover={{ bg: hoverBg }}
              />
            </Tooltip>

            {/* Mobile Menu Button */}
            <Box display={{ base: 'block', md: 'none' }}>
              <IconButton
                aria-label="Open Menu"
                icon={isOpen ? <X size={20} /> : <MenuIcon size={20} />}
                onClick={isOpen ? onClose : onOpen}
                variant="ghost"
                _hover={{ bg: hoverBg }}
              />
            </Box>
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
          <DrawerBody py={4}>
            <VStack spacing={2} align="stretch">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  leftIcon={item.icon}
                  justifyContent="flex-start"
                  variant="ghost"
                  isActive={activeSection === item.id}
                  _active={{
                    bg: activeBg,
                    color: activeColor
                  }}
                  onClick={() => scrollToSection(item.id)}
                  py={6}
                  borderRadius="md"
                >
                  {item.name}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
