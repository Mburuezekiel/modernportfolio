import React from 'react';
import CALC from '../assets/Calc.jpg';
import taskmate from '../assets/taskui.webp';
import paystack from '../assets/Paystack.png';
import crowdfunding from '../assets/crowdfunding.jpeg';
import pamoja from '../assets/Pamoja.png';
import Krystall from '../assets/Krystaltoys.png';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Stack,
  Badge,
  Link,
  Button,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Inua Fund – CrowdFunding Platform',
    description: 'Inua Fund is a community-driven crowd-funding platform that empowers individuals in need by connecting them with donors willing to support their causes. Whether it’s a small business startup, medical emergency, or education fees, Inua Fund provides a transparent and efficient way to raise funds.',
    image: crowdfunding,
    technologies: ['React', 'FastAPI', 'MongoDB', 'Node'],
    githubUrl: 'https://github.com/Mburuezekiel/Inua-Fund-.git',
    liveUrl: 'https://inua-fund.vercel.app/',
    isPrivate: true,
  },
   {
    title: 'Pamoja Electronics – E-commerce Platform',
    description: 'Pamoja Electronics is a cutting-edge e-commerce platform that specializes in electronics and gadgets. It offers a seamless shopping experience with a wide range of products, secure payment options, and fast delivery services.',
    image: pamoja,
    technologies: ['React', 'Express', 'MongoDB', 'Shadcn' ],
    githubUrl: 'https://github.com/Mburuezekiel/pamoja-e-commerce-hub.git',
    liveUrl: 'https://pamojaelectronics.vercel.app/',
    
  },
  {
    title: 'Krystal Toy Store – E-commerce Platform',
    description: '  Krystal Toy Store is a vibrant e-commerce platform dedicated to providing a wide range of toys and games for children of all ages. With a user-friendly interface, secure payment options, and fast shipping, it aims to create a delightful shopping experience for parents and kids alike.',
    image: Krystall,
    technologies: ['React', 'Express', 'MongoDB', 'Shadcn', 'Node.js' ],
    githubUrl: 'https://github.com/Mburuezekiel/Krystal-Toy-Store.git',
    liveUrl: 'https://krystaltoystore.vercel.app',
    
  },

  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    image: taskmate,
    technologies: ['React', 'Firebase', 'Material-UI', 'Redux'],
    githubUrl: 'https://github.com/yourusername/project2',
    liveUrl: 'https://trackmateapp.vercel.app/',
  },
  {
    title: 'Sum Array Calculator',
    description: 'A simple web application to calculate the sum of an array of numbers.',
    image: CALC,
    technologies: ['React', 'Chakra UI', 'JavaScript'],
    githubUrl: 'https://github.com/yourusername/project4',
    liveUrl: 'https://array-sum-calculator.vercel.app/',
  },
  {
    title: 'Paystack Payment Intergration',
    description: 'This project seamlessly integrates Paystacks payment gateway, providing a robust and secure solution for processing online transactions. Built with React for a dynamic user experience, and supported by MongoDB for data management, it offers a streamlined payment flow. Shadcn UI components ensure a modern and polished interface.',
    image: paystack,
    technologies: ['React',  'MongoDB', 'Shadcn'],
    githubUrl: 'https://github.com/Mburuezekiel/Paystack-Payment-Intergration.git',
  },
  
  
  {
    title: 'AI Content Generator',
    description: 'An AI-powered application that generates various types of content using machine learning.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/yourusername/project3',
    liveUrl: 'https://project3.com',
  },
  
];

const ProjectCard = ({ title, description, image, technologies, githubUrl, liveUrl, isPrivate }) => {
  return (
    <Box
      maxW={'445px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'md'}
      p={6}
      overflow={'hidden'}
    >
      <Link href={liveUrl} isExternal>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
          _hover={{
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <Image
            src={image}
            alt={title}
            objectFit="cover"
            w="full"
            h="full"
          />
        </Box>
      </Link>
      <Stack>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize={'2xl'}
          fontFamily={'body'}
        >
          {title}
        </Heading>
        <Text color={'gray.500'}>
          {description}
        </Text>
      </Stack>
      <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
        <Stack direction={'row'} spacing={2} flexWrap="wrap">
          {technologies.map((tech) => (
            <Badge
              key={tech}
              px={2}
              py={1}
              bg={useColorModeValue('brand.50', 'brand.900')}
              fontWeight={'400'}
            >
              {tech}
            </Badge>
          ))}
        </Stack>
      </Stack>
      <Stack mt={8} direction={'row'} spacing={4}>
        {isPrivate ? (
          <Tooltip label="Not an open source project" aria-label="Not open source tooltip">
            <Button
              flex={1}
              fontSize={'sm'}
              bg={'gray.600'}
              rounded={'full'}
              leftIcon={<Github size={20} />}
              cursor="not-allowed"
              isDisabled
            >
              Code
            </Button>
          </Tooltip>
        ) : (
          githubUrl && (
            <Button
              flex={1}
              fontSize={'sm'}
              bg={'gray.700'}
              rounded={'full'}
              leftIcon={<Github size={20} />}
              onClick={() => window.open(githubUrl, '_blank')}
            >
              Code
            </Button>
          )
        )}
        <Button
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          bg={'brand.500'}
          color={'white'}
          leftIcon={<ExternalLink size={20} />}
          _hover={{
            bg: 'brand.600',
          }}
          onClick={() => window.open(liveUrl, '_blank')}
        >
          Live Demo
        </Button>
      </Stack>
    </Box>
  );
};

export default function Projects() {
  return (
    <Box id="projects" py={20}>
      <Container maxW={'7xl'}>
        <Heading
          textAlign={'center'}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          fontWeight={600}
          mb={16}
        >
          Featured{' '}
          <Text as={'span'} color={'brand.500'}>
            Projects
          </Text>
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          px={{ base: 4, md: 16 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}