import React, { useState } from 'react';
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = '254714487081'; // WhatsApp number without the '+' sign
    const whatsappMessage = `
    Hello, my name is ${formData.name}. 
    My email is ${formData.email}. 
    Message: ${formData.message}`;
    
    // Open WhatsApp with prefilled message
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: 'Message sent to WhatsApp!',
      description: "You'll be redirected to WhatsApp shortly.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Box id="contact" bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
      <Container maxW="7xl">
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Box flex={1} mr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }}>
            <Heading
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
              fontWeight="bold"
              mb={5}
            >
              Get in{' '}
              <Text as={'span'} color={'brand.500'}>
                Touch
              </Text>
            </Heading>
            <Text fontSize={'xl'} mb={8} color={useColorModeValue('gray.600', 'gray.300')}>
              Have a project in mind? Let's work together to create something amazing.
            </Text>

            <VStack spacing={4} align="flex-start">
              <HStack spacing={4}>
                <IconButton
                  aria-label="email"
                  variant="ghost"
                  size="lg"
                  icon={<Mail size={24} />}
                  _hover={{
                    bg: 'brand.500',
                    color: 'white',
                  }}
                />
                <Text>mburuezekiel42@gmail.com</Text>
              </HStack>
              <HStack spacing={4}>
                <IconButton
                  aria-label="phone"
                  variant="ghost"
                  size="lg"
                  icon={<Phone size={24} />}
                  _hover={{
                    bg: 'brand.500',
                    color: 'white',
                  }}
                />
                <Text>+254 14 487 081</Text>
              </HStack>
              <HStack spacing={4}>
                <IconButton
                  aria-label="location"
                  variant="ghost"
                  size="lg"
                  icon={<MapPin size={24} />}
                  _hover={{
                    bg: 'brand.500',
                    color: 'white',
                  }}
                />
                <Text>Nairobi, Kenya</Text>
              </HStack>
            </VStack>
          </Box>

          <Box
            flex={1}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="lg"
            p={8}
            boxShadow={'xl'}
          >
            <VStack spacing={5} as="form" onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email"
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your Message"
                  rows={6}
                />
              </FormControl>

              <Button
                colorScheme="brand"
                bg="green"
                color="white"
                _hover={{
                  bg: 'brand.600',
                }}
                size="lg"
                w="full"
                type="submit"
              >
                <i className="bi bi-whatsapp " style={{ marginRight: '8px' }}></i>  Send Message
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
