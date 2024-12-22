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
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [showTooltip, setShowTooltip] = useState(false);
  const bg = useColorModeValue('white', 'gray.800');

  const handleThemeToggle = () => {
    toggleColorMode();
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };

  const handleMenuItemClick = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClose(); // Close menu after item is clicked
  };

  const NavLink = ({ children, icon }) => (
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
        handleMenuItemClick(targetId);
      }}
    >
      <i className={bi ${icon}} style={{ marginRight: '8px' }}></i>
      {children}
    </Button>
  );

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
                <NavLink icon="bi-house">Home</NavLink>
                <NavLink icon="bi-info-circle">About</NavLink>
                <NavLink icon="bi-tools">Skills</NavLink>
                <NavLink icon="bi-briefcase">Projects</NavLink>
                <NavLink icon="bi-envelope">Contact</NavLink>
              </HStack>
            </HStack>
            <Box display={{ base: 'block', md: 'none' }}>
              <Menu isOpen={isOpen}>
                <MenuButton as={IconButton} aria-label="Options" icon={<MenuIcon />} variant="ghost" onClick={onToggle} />
                <MenuList>
                  <MenuItem onClick={() => handleMenuItemClick('home')}>
                    <i className="bi bi-house" style={{ marginRight: '8px' }}></i> Home
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('about')}>
                    <i className="bi bi-info-circle" style={{ marginRight: '8px' }}></i> About
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('skills')}>
                    <i className="bi bi-tools" style={{ marginRight: '8px' }}></i> Skills
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('projects')}>
                    <i className="bi bi-briefcase" style={{ marginRight: '8px' }}></i> Projects
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('contact')}>
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
          bg="rgba(0, 0, 0, 0.5)" // Adjust the opacity here
          zIndex={900} // Ensure it is below the Navbar
          onClick={onClose} // Close menu when clicking outside
        />
      )}
    </>
  );
};

export default Navbar;
