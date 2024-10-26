import React, { useState } from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  IconButton,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { Github, Linkedin, Mail } from 'lucide-react';
import qrCodeImage from '../assets/portfolio_qr_code.png'; // Adjust path as necessary

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://ezekielmburuportfolio.vercel.app/'); // Update with your actual link
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset message after 2 seconds
  };
<hr/>
  return (
    
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      py={8}
    >
      <Container
        as={Stack}
        maxW={'7xl'}
        direction={{ base: 'column', md: 'row' }}
        spacing={6}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© {new Date().getFullYear()} Ezekiel Njuguna Mburu.<br></br> All rights reserved.</Text>
        
        <Stack direction={'row'} spacing={6}>
          <IconButton
            aria-label="GitHub"
            icon={<Github />}
            size="lg"
            color={'gray.600'}
            variant="ghost"
            _hover={{
              bg: 'brand.500',
              color: 'white',
            }}
            onClick={() => window.open('https://github.com/Mburuezekiel', '_blank')}
          />
          <IconButton
            aria-label="LinkedIn"
            icon={<Linkedin />}
            size="lg"
            color={'gray.600'}
            variant="ghost"
            _hover={{
              bg: 'brand.500',
              color: 'white',
            }}
            onClick={() => window.open('https://www.linkedin.com/in/ezekiel-mburu-5aaa00262', '_blank')}
          />
          <IconButton
            aria-label="Email"
            icon={<Mail />}
            size="lg"
            color={'gray.600'}
            variant="ghost"
            _hover={{
              bg: 'brand.500',
              color: 'white',
            }}
            onClick={() => (window.location.href = 'mailto:mburuezekiel42@gmail.com')}
          />
        </Stack>
      </Container>

      <Container
        maxW={'7xl'}
        mt={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Box className="qr-section" mt={6}>
          <Image
            src={qrCodeImage}
            alt="QR code for portfolio"
            boxSize="100px"
            onClick={handleCopyLink}
            cursor="pointer"
          />
          <Text mt={2} fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            {copied ? 'Link Copied!' : 'Click QR Code to Copy Portfolio Link'}
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
