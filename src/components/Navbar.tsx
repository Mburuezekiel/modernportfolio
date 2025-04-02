import React, { useState, useEffect } from 'react';
import logo from '../assets/favicon.ico';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Container,
  useColorMode,
  Tooltip,
  Image,
  Text,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Drawer,
} from '@chakra-ui/react';
import { Menu as MenuIcon, Sun, Moon, Home, Info, Wrench, Briefcase, FileText, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const navItems = [
  { name: 'Home', icon: <Home size={18} />, id: 'home' },
  { name: 'About', icon: <Info size={18} />, id: 'about' },
  { name: 'Skills', icon: <Wrench size={18} />, id: 'skills' },
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
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const logoTextColor = useColorModeValue('gray.800', 'white');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const activeBg = useColorModeValue('orange.50', 'gray.700');
  const activeColor = useColorModeValue('orange.500', 'orange.300');
  const menuItemBg = useColorModeValue('white', 'gray.800');

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

  const NavLink = ({ item }) => {
    const isActive = activeSection === item.id;
    const isHovered = hoveredItem === item.id;
    
    return (
      <Box position="relative">
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
          color={isActive ? activeColor : undefined}
          bg="transparent"
          _hover={{ bg: 'transparent' }}
          onClick={() => scrollToSection(item.id)}
          transition="all 0.2s"
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          position="relative"
          zIndex={2}
        >
          {item.icon}
          {item.name}
        </Button>
        
        {/* Active/Hover indicator that slides */}
        <AnimatePresence>
          {(isActive || isHovered) && (
            <MotionBox
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              height="full"
              bg={isActive ? activeBg : hoverBg}
              borderRadius="md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              zIndex={1}
            />
          )}
        </AnimatePresence>
      </Box>
    );
  };

  const mobileVariants = {
    hidden: { opacity: 0, x: 300 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, x: 300, transition: { duration: 0.2 } }
  };

  // Staggered animation for mobile menu items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

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
      <Container maxW="container.xl" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo & Menu Container */}
          <Flex flex={1} alignItems="center">
            {/* Logo */}
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              display="flex"
              alignItems="center"
              mr={6}
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
                pl={0}
              >
                <Image src={logo} alt="Logo" boxSize="30px" />
                <Text>E.M</Text>
              </Button>
            </MotionBox>

            {/* Desktop Navigation - Now directly next to logo */}
            <MotionBox
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <HStack as="nav" spacing={1} display={{ base: 'none', md: 'flex' }} alignItems="center">
                {navItems.map((item) => (
                  <NavLink key={item.id} item={item} />
                ))}
              </HStack>
            </MotionBox>
          </Flex>

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

      {/* Mobile Navigation Drawer with Enhanced Animation */}
      <AnimatePresence>
        {isOpen && (
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size="xs"
          >
            <DrawerOverlay />
            <DrawerContent
              as={motion.div}
              variants={mobileVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              bg={bg}
            >
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                <MotionFlex
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  alignItems="center"
                  gap={2}
                >
                  <Image src={logo} alt="Logo" boxSize="25px" />
                  <Text>Navigation</Text>
                </MotionFlex>
              </DrawerHeader>
              <DrawerBody py={4}>
                <VStack
                  spacing={3}
                  align="stretch"
                  as={motion.div}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {navItems.map((item, index) => (
                    <MotionBox
                      key={item.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      overflow="hidden"
                      borderRadius="md"
                      position="relative"
                    >
                      <Button
                        leftIcon={item.icon}
                        justifyContent="flex-start"
                        variant="ghost"
                        width="full"
                        py={6}
                        borderRadius="md"
                        onClick={() => scrollToSection(item.id)}
                        position="relative"
                        zIndex={2}
                        bg="transparent"
                      >
                        {item.name}
                      </Button>
                      {activeSection === item.id && (
                        <MotionBox
                          position="absolute"
                          top={0}
                          left={0}
                          right={0}
                          bottom={0}
                          bg={activeBg}
                          borderRadius="md"
                          initial={{ x: "-100%" }}
                          animate={{ x: 0 }}
                          transition={{ type: "spring", stiffness: 100, damping: 20 }}
                          zIndex={1}
                        />
                      )}
                    </MotionBox>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Navbar;