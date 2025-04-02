import React from 'react';
import ME from "../assets/OfficialPic.jpeg"; 
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Icon,
  useColorModeValue,
  Image,
  SimpleGrid,
  VStack,
  HStack,
  Divider
} from '@chakra-ui/react';
import { Code, Coffee, Globe, Mail, Github, Linkedin, Download } from 'lucide-react';

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ElementType;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <VStack
      p={5}
      borderRadius="lg"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="md"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'lg'
      }}
      spacing={4}
      align={'center'}
      textAlign={'center'}
      height="100%"
    >
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'brand.500'}
        mb={2}
      >
        <Icon as={icon} w={6} h={6} />
      </Flex>
      <Text fontWeight={700} fontSize="lg">{title}</Text>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>{text}</Text>
    </VStack>
  );
};

export default function About() {
  return (
    <Box 
      id="about" 
      bg={useColorModeValue('gray.50', 'gray.900')} 
      py={{ base: 12, md: 20 }}
    >
      <Container maxW={'7xl'}>
        <VStack spacing={{ base: 10, md: 14 }}>
          <Heading
            fontWeight={700}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
            textAlign="center"
          >
            About{' '}
            <Text as={'span'} color={'brand.500'}>
              Me
            </Text>
          </Heading>
          <Divider maxW="200px" borderColor="brand.500" borderWidth={2} />
          
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            align="center" 
            justify="center"
            gap={{ base: 8, md: 12 }}
            w="full"
          >
            {/* Perfect circle image container */}
            <Box 
              width={{ base: "250px", md: "280px" }}
              height={{ base: "250px", md: "280px" }}
              position="relative"
              borderRadius="70%"
              overflow="hidden"
              boxShadow="xl"
              border="4px solid"
              borderColor="brand.500"
            >
              <Image 
                src={ME} 
                alt="Ezekiel Njuguna" 
                objectFit="cover"
                width="100%"
                height="100%"
                transition="transform 0.3s ease"
                _hover={{ transform: 'scale(1.05)' }}
              />
            </Box>

            <VStack spacing={6} align={{ base: 'center', md: 'flex-start' }} maxW={{ base: '100%', md: '60%' }}>
              <Text
                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                color={useColorModeValue('gray.700', 'gray.300')}
                lineHeight="tall"
              >
                I'm a passionate <strong>Full Stack Developer</strong> with expertise in building scalable web applications.
                With a strong foundation in both front-end and back-end development, I create elegant
                solutions that solve real-world problems.
              </Text>
              
              <HStack spacing={{ base: 3, md: 4 }} pt={4} flexWrap={{ base: 'wrap', md: 'nowrap' }} justify={{ base: 'center', md: 'flex-start' }}>
                <Button
                  rounded={"full"}
                  size={{ base: "md", md: "lg" }}
                  fontWeight={"semibold"}
                  px={6}
                  colorScheme={"brand"}
                  bg={"brand.500"}
                  _hover={{ bg: "brand.600" }}
                  leftIcon={<Icon as={Linkedin} />}
                  onClick={() => window.open("https://www.linkedin.com/in/ezekiel-mburu-5aaa00262", "_blank")}
                >
                  LinkedIn
                </Button>
                <Button
                  rounded={"full"}
                  size={{ base: "md", md: "lg" }}
                  bg={"gray.700"}
                  fontWeight={"semibold"}
                  px={6}
                  color="white"
                  _hover={{ bg: "gray.800" }}
                  leftIcon={<Icon as={Github} />}
                  onClick={() => window.open("https://github.com/Mburuezekiel", "_blank")}
                >
                  GitHub
                </Button>
                <Button
                  rounded={"full"}
                  size={{ base: "md", md: "lg" }}
                  bg={"brand.500"}
                  fontWeight={"semibold"}
                  px={6}
                  color="white"
                  _hover={{ bg: "brand.600" }}
                  leftIcon={<Icon as={Download} />}
                  onClick={() => window.open("/resume.pdf", "_blank")}
                >
                  Resume
                </Button>
              </HStack>
            </VStack>
          </Flex>
          
          <Heading fontSize={{ base: '2xl', md: '3xl' }} mt={8}>My Expertise</Heading>
          <Divider maxW="150px" borderColor="brand.500" borderWidth={2} mb={6} />
          
          <SimpleGrid 
            columns={{ base: 1, md: 3 }} 
            spacing={10} 
            w={'full'}
            px={{ base: 4, md: 0 }}
          >
            <Feature
              icon={Code}
              title={'Full Stack Development'}
              text={'Experienced in both frontend and backend technologies, creating complete web solutions with React, Node.js, and more.'}
            />
            <Feature
              icon={Globe}
              title={'Web Applications'}
              text={'Building responsive and scalable web applications with modern technologies for optimal user experience across all devices.'}
            />
            <Feature
              icon={Coffee}
              title={'Problem Solving'}
              text={'Passionate about solving complex problems with clean, efficient code and creative thinking to deliver elegant solutions.'}
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
