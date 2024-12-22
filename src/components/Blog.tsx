import React from 'react';
import { Box, Container, Heading, Text, Button, VStack, Grid, GridItem } from '@chakra-ui/react';

const blogs = [
  {
    id: 1,
    title: 'Understanding React.js: A Beginner’s Guide',
    excerpt: 'React.js is a popular JavaScript library for building user interfaces. Learn the basics to get started!',
    link: '/blogs/react-guide',
  },
  {
    id: 2,
    title: '10 Tips for Improving Your Web Development Skills',
    excerpt: 'Level up your web development skills with these essential tips and tricks.',
    link: '/blogs/web-dev-tips',
  },
  {
    id: 3,
    title: 'The Future of JavaScript in 2024',
    excerpt: 'Explore the upcoming trends and features in the JavaScript ecosystem.',
    link: '/blogs/javascript-future',
  },
];

const BlogPage = () => {
  return (
    <Box id="BlogPage" py={10} bg="gray.50">
      <Container maxW="container.xl">
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          Blog Posts
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center" mb={10}>
          Explore insights, tutorials, and updates about web development and technology.
        </Text>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
          {blogs.map((blog) => (
            <GridItem key={blog.id} bg="white" borderRadius="lg" boxShadow="md" p={6}>
              <VStack spacing={4} align="flex-start">
                <Heading as="h3" size="md">
                  {blog.title}
                </Heading>
                <Text color="gray.600">{blog.excerpt}</Text>
                <Button
                  as="a"
                  href={blog.link}
                  colorScheme="orange"
                  variant="solid"
                  size="sm"
                >
                  Read More
                </Button>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogPage;
