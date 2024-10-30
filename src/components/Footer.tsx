import React, { useState } from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  IconButton,
  useColorModeValue,
  Image,
  Tooltip,
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

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      py={10}
      px={6}
      borderTopWidth={1}
      borderTopColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container
        as={Stack}
        maxW="7xl"
        direction={{ base: 'column', md: 'row' }}
        spacing={6}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text fontSize="md" textAlign="center">
          © {new Date().getFullYear()} Ezekiel Njuguna Mburu.
          <br /> All rights reserved.
        </Text>

        <Stack direction="row" spacing={6} align="center">
          <Stack align="center" spacing={1}>
            <Tooltip label="GitHub" fontSize="md">
              <IconButton
                aria-label="GitHub"
                icon={<Github />}
                size="lg"
                color={useColorModeValue('gray.600', 'gray.300')}
                variant="ghost"
                _hover={{
                  bg: 'orange.500',
                  color: 'white',
                }}
                onClick={() => window.open('https://github.com/Mburuezekiel', '_blank')}
              />
            </Tooltip>
            <Text fontSize="sm">GitHub</Text>
          </Stack>

          <Stack align="center" spacing={1}>
            <Tooltip label="LinkedIn" fontSize="md">
              <IconButton
                aria-label="LinkedIn"
                icon={<Linkedin />}
                size="lg"
                color={useColorModeValue('gray.600', 'gray.300')}
                variant="ghost"
                _hover={{
                  bg: 'orange.500',
                  color: 'white',
                }}
                onClick={() => window.open('https://www.linkedin.com/in/ezekiel-mburu-5aaa00262', '_blank')}
              />
            </Tooltip>
            <Text fontSize="sm">LinkedIn</Text>
          </Stack>

          <Stack align="center" spacing={1}>
            <Tooltip label="Email" fontSize="md">
              <IconButton
                aria-label="Email"
                icon={<Mail />}
                size="lg"
                color={useColorModeValue('gray.600', 'gray.300')}
                variant="ghost"
                _hover={{
                  bg: 'orange.500',
                  color: 'white',
                }}
                onClick={() => (window.location.href = 'mailto:mburuezekiel42@gmail.com')}
              />
            </Tooltip>
            <Text fontSize="sm">Email</Text>
          </Stack>
        </Stack>
      </Container>

      <Container
        maxW="7xl"
        mt={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Box mt={6} onClick={handleCopyLink} cursor="pointer" textAlign="center">
          <Image
            src={qrCodeImage}
            alt="QR code for portfolio"
            boxSize="120px"
            borderRadius="md"
            _hover={{ transform: 'scale(1.05)' }}
            transition="0.3s ease-in-out"
          />
          <Text mt={3} fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            {copied ? 'Link Copied!' : 'Click QR Code to Copy Portfolio Link'}
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
