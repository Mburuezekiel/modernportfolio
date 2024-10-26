import React from 'react';
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
} from '@chakra-ui/react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with payment integration, user authentication, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com/yourusername/project1',
    liveUrl: 'https://project1.com',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Firebase', 'Material-UI', 'Redux'],
    githubUrl: 'https://github.com/yourusername/project2',
    liveUrl: 'https://mytrackmate-app.vercel.app/',
  },
  {
    title: 'AI Content Generator',
    description: 'An AI-powered application that generates various types of content using machine learning.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/yourusername/project3',
    liveUrl: 'https://project3.com',
  },
  {
    title: 'Sum Array Calculator',
    description: 'A simple web application to calculate the sum of an array of numbers.',
    image: 'https://files.oaiusercontent.com/file-V9aXmswrGcmJyBdiprR8mIcQ?se=2024-10-26T00%3A34%3A26Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dfeb72398-69c6-40e8-be1d-8fbccf3e5a16.webp&sig=950oFU%2By7uTMQFm77TSto57IumY2k49OzzoCPSrkkrM%3D',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/yourusername/project3',
    liveUrl: '/src/projects/sumArrayCalculator.html', 
  },
];

const ProjectCard = ({ title, description, image, technologies, githubUrl, liveUrl }: ProjectProps) => {
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
      <Box
        h={'210px'}
        bg={'gray.100'}
        mt={-6}
        mx={-6}
        mb={6}
        pos={'relative'}
      >
        <Image
          src={image}
          alt={title}
          objectFit="cover"
          w="full"
          h="full"
        />
      </Box>
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
        <Button
          flex={1}
          fontSize={'sm'}
          bg={"gray.700"}
          rounded={'full'}
          leftIcon={<Github size={20} />}
          onClick={() => window.open(githubUrl, '_blank')}
        >
          Code
        </Button>
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
