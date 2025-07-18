import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'; // Adjust path as necessary
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Stack,
  Badge,
  Link, // Using Chakra UI's Link for navigation on the same page
  VStack,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import image1 from '../assets/code.avif'; // Ensure this path is correct

// Define motion Box for animating Chakra components
const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);
const MotionContainer = motion(Container);

// Blog post type definition
interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  slug: string;
  content: string; // Add the content field for the full article
}

// Sample blog data (replace with actual data from a CMS or API)
const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Responsive Web Applications with React',
    description: 'Learn how to create responsive and accessible web applications using React and modern CSS techniques.',
    date: 'April 2, 2025',
    readTime: '5 min read',
    tags: ['React', 'Web Development', 'CSS'],
    image: image1,
    slug: 'building-responsive-web-applications-with-react',
    content: `
      <p>Building responsive web applications is crucial in today's multi-device world. Users access your sites from desktops, tablets, and mobile phones, and your application needs to adapt seamlessly to all screen sizes.</p>

      <h2>The Importance of Responsiveness</h2>
      <p>A responsive design ensures a consistent user experience across various devices. Without it, users on smaller screens might struggle with cramped layouts, unreadable text, and difficult navigation, leading to frustration and abandonment.</p>

      <h2>Key Principles of Responsive Design with React</h2>
      <h3>1. Mobile-First Approach</h3>
      <p>Start designing and developing for the smallest screen first. This forces you to prioritize content and functionality, making it easier to scale up for larger screens later. In React, this means thinking about component layouts that work well on mobile, then adding media queries for larger breakpoints.</p>

      <h3>2. Flexible Grids and Images</h3>
      <p>Avoid fixed-width layouts. Use percentage-based widths or CSS Grid/Flexbox for your layouts. For images, set their maximum width to 100% to ensure they scale down within their containers.</p>
      <pre><code>img {
  max-width: 100%;
  height: auto;
}</code></pre>

      <h3>3. Media Queries</h3>
      <p>Media queries are your primary tool for applying different styles based on screen characteristics (like width). In a React component, you might define these in a CSS-in-JS solution or a separate CSS file.</p>
      <pre><code>@media (min-width: 768px) {
  .my-component {
    flex-direction: row;
  }
}</code></pre>

      <h3>4. UI Libraries and Frameworks</h3>
      <p>Libraries like Chakra UI (which you're already using!), Material-UI, or Ant Design provide responsive components out-of-the-box, significantly speeding up development time. They handle many of the responsive considerations for you.</p>

      <h2>Accessibility Considerations</h2>
      <p>Responsiveness goes hand-in-hand with accessibility. Ensure your responsive design doesn't compromise keyboard navigation, screen reader compatibility, or color contrast. Use semantic HTML elements and ARIA attributes where appropriate.</p>

      <p>By following these principles, you can build React applications that look great and function flawlessly on any device, providing an excellent experience for all your users.</p>
    `,
  },
  {
    id: '2',
    title: 'Optimizing Website Performance: Best Practices',
    description: 'Explore techniques to improve website loading speed and overall performance for better user experience.',
    date: 'March 15, 2025',
    readTime: '8 min read',
    tags: ['Performance', 'Web Development', 'Optimization'],
    image: '/images/blog/performance.jpg',
    slug: 'optimizing-website-performance-best-practices',
    content: `
      <p>Website performance is a critical factor for user experience, SEO, and conversion rates. A fast-loading website keeps users engaged, while a slow one can drive them away.</p>

      <h2>Why Performance Matters</h2>
      <p>Studies show that even a one-second delay in page load time can lead to a significant drop in conversions and page views. Google also uses page speed as a ranking factor for search results.</p>

      <h2>Key Optimization Techniques</h2>
      <h3>1. Image Optimization</h3>
      <ul>
        <li><strong>Compress Images:</strong> Use tools like TinyPNG or online compressors to reduce file size without losing much quality.</li>
        <li><strong>Use Modern Formats:</strong> WebP offers better compression than JPEG or PNG.</li>
        <li><strong>Lazy Loading:</strong> Load images only when they are about to enter the viewport.</li>
      </ul>

      <h3>2. Minimize CSS and JavaScript</h3>
      <p>Minification removes unnecessary characters (whitespace, comments) from your code, reducing file sizes. Bundling multiple CSS/JS files into one can also reduce the number of HTTP requests.</p>

      <h3>3. Leverage Browser Caching</h3>
      <p>Configure your server to cache static assets (images, CSS, JS) in the user's browser. This means returning visitors don't have to re-download these files, leading to faster subsequent loads.</p>

      <h3>4. Reduce Server Response Time</h3>
      <p>Optimize your backend code, database queries, and server configuration. Using a Content Delivery Network (CDN) can also significantly reduce latency by serving content from a server closer to the user.</p>

      <h3>5. Enable GZIP Compression</h3>
      <p>GZIP compression can drastically reduce the size of your HTML, CSS, and JavaScript files before they are sent from the server to the browser.</p>

      <h2>Tools for Performance Analysis</h2>
      <p>Use tools like Google Lighthouse, PageSpeed Insights, GTmetrix, and WebPageTest to analyze your site's performance and get actionable recommendations.</p>

      <p>Implementing these best practices will lead to a snappier, more enjoyable experience for your users and better rankings in search engines.</p>
    `,
  },
  {
    id: '3',
    title: 'Introduction to Next.js: Why Its Great for Developers',
    description: 'Discover the benefits of using Next.js for your web projects and how it simplifies development.',
    date: 'February 28, 2025',
    readTime: '6 min read',
    tags: ['Next.js', 'React', 'Web Development'],
    image: '/images/blog/nextjs-intro.jpg',
    slug: 'introduction-to-nextjs-why-its-great-for-developers',
    content: `
      <p>Next.js is a popular React framework that enables powerful features like server-side rendering (SSR) and static site generation (SSG), making it a go-to choice for modern web development.</p>

      <h2>What is Next.js?</h2>
      <p>At its core, Next.js is a React framework for building full-stack web applications. It extends React's capabilities by providing a structured way to build web pages, manage data, and optimize performance.</p>

      <h2>Key Features and Benefits</h2>
      <h3>1. Server-Side Rendering (SSR) and Static Site Generation (SSG)</h3>
      <p>Next.js offers different rendering strategies. SSR renders pages on the server for each request, improving SEO and initial page load. SSG generates HTML at build time, ideal for static content and providing excellent performance.</p>

      <h3>2. File-System Based Routing</h3>
      <p>Routing in Next.js is intuitive. You create pages by simply adding files to the <code>pages</code> directory. For example, <code>pages/about.js</code> automatically becomes the <code>/about</code> route.</p>

      <h3>3. API Routes</h3>
      <p>You can build your backend API directly within your Next.js project using API Routes. This is great for creating serverless functions or handling data submission.</p>

      <h3>4. Image Optimization</h3>
      <p>The built-in <code>next/image</code> component automatically optimizes images, serving them in modern formats and at appropriate sizes, which significantly boosts performance.</p>

      <h3>5. Fast Refresh</h3>
      <p>During development, Fast Refresh provides instant feedback on code changes, maintaining component state. This drastically improves the developer experience.</p>

      <h3>6. Built-in CSS Support</h3>
      <p>Next.js supports CSS Modules, Sass, and various CSS-in-JS libraries out-of-the-box, giving you flexibility in how you style your application.</p>

      <h2>When to Use Next.js</h2>
      <ul>
        <li>For SEO-critical applications (e.g., e-commerce, news sites)</li>
        <li>When you need a fast initial page load</li>
        <li>For full-stack applications with an integrated API</li>
        <li>For marketing sites or blogs where static generation is beneficial</li>
      </ul>

      <p>Next.js simplifies many complexities of React development and provides powerful features that lead to better performing and more maintainable applications.</p>
    `,
  },
  {
    id: '4',
    title: 'Creating Accessible Web Experiences',
    description: 'Learn essential techniques for making your websites accessible to all users regardless of abilities.',
    date: 'February 10, 2025',
    readTime: '7 min read',
    tags: ['Accessibility', 'Web Development', 'UX'],
    image: '/images/blog/accessibility.jpg',
    slug: 'creating-accessible-web-experiences',
    content: `
      <p>Web accessibility means designing and developing websites so that people with disabilities can use them. This includes individuals with visual, auditory, motor, cognitive, and neurological impairments.</p>

      <h2>Why Accessibility Matters</h2>
      <p>Beyond legal compliance, an accessible website benefits everyone. It improves SEO, usability for all users (e.g., those with temporary disabilities or slow internet connections), and reflects an inclusive approach.</p>

      <h2>Core Principles of Web Accessibility (WCAG)</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) are the international standard for web accessibility. They are based on four main principles:</p>
      <h3>1. Perceivable</h3>
      <p>Information and user interface components must be presentable to users in ways they can perceive. This means providing text alternatives for non-text content (e.g., alt text for images), captions for audio/video, and sufficient color contrast.</p>

      <h3>2. Operable</h3>
      <p>User interface components and navigation must be operable. Ensure all functionality is available via keyboard, provide enough time for users to interact, and avoid content that could cause seizures.</p>

      <h3>3. Understandable</h3>
      <p>Information and the operation of user interface must be understandable. Make text readable and understandable, ensure consistency in navigation, and provide clear instructions for forms.</p>

      <h3>4. Robust</h3>
      <p>Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies. Use semantic HTML correctly and ensure compatibility with current and future user agents.</p>

      <h2>Practical Tips for Implementation</h2>
      <ul>
        <li><strong>Semantic HTML:</strong> Use HTML elements for their intended purpose (e.g., <code>&lt;button&gt;</code> for buttons, <code>&lt;h1&gt;</code> for main headings).</li>
        <li><strong>Alt Text for Images:</strong> Always provide descriptive <code>alt</code> attributes for images.</li>
        <li><strong>Keyboard Navigation:</strong> Ensure all interactive elements can be accessed and operated using only the keyboard (use <code>tabindex</code> carefully).</li>
        <li><strong>ARIA Attributes:</strong> Use Accessible Rich Internet Applications (ARIA) attributes for dynamic content or custom controls that aren't inherently accessible.</li>
        <li><strong>Color Contrast:</strong> Use tools to check for sufficient color contrast between text and background.</li>
        <li><strong>Form Labels:</strong> Associate labels explicitly with their form fields.</li>
      </ul>

      <p>Making your website accessible is an ongoing process, but by integrating these practices from the start, you can create a truly inclusive web for everyone.</p>
    `,
  },
];

// Get all unique tags from blog posts
function getAllTags(posts: BlogPost[]): string[] {
  const tagsSet = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(sampleBlogPosts);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null); // State for the currently viewed post
  const allTags = getAllTags(sampleBlogPosts);

  // Animation variants for Framer Motion
  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const postVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    // Filter posts based on search term and active tag when not viewing a single post
    if (!selectedPost) {
      let results = sampleBlogPosts;

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        results = results.filter(post =>
          post.title.toLowerCase().includes(term) ||
          post.description.toLowerCase().includes(term) ||
          post.tags.some(tag => tag.toLowerCase().includes(term))
        );
      }

      if (activeTag) {
        results = results.filter(post => post.tags.includes(activeTag));
      }

      setFilteredPosts(results);
    }
    // No window.scrollTo here, Framer Motion will handle visual transitions
  }, [searchTerm, activeTag, selectedPost]);

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    // Removed window.scrollTo here to allow Framer Motion to manage the transition smoothly
  };

  const handleBackToPosts = () => {
    setSelectedPost(null);
    // Removed window.scrollTo here
  };

  const blogContentBg = useColorModeValue('white', 'gray.900');

  return (
    <>
      <div>
        <title>{selectedPost ? `${selectedPost.title} | Blog | Ezekiel Mburu` : 'Blog | Ezekiel Mburu'}</title>
        <meta name="description" content={selectedPost ? selectedPost.description : "Read my latest thoughts and tutorials on web development, design, and technology."} />
      </div>

      <Layout> {/* Wrap everything in Layout */}
        <main id="blogs" className="container mx-auto px-4 py-12 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait"> {/* Use AnimatePresence for exit animations */}
              {!selectedPost ? ( // Conditional rendering for blog list vs. single post
                <MotionBox
                  key="blogList" // Unique key for AnimatePresence
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={listVariants}
                >
                  <h1 className="text-4xl font-bold mb-8 text-center">Blogs</h1>

                  {/* Search and filter section */}
                  <Box mb={10}>
                    {/* <Box position="relative" mb={6}>
                      <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <svg
                        className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </Box> */}

                    <Flex flexWrap="wrap" gap={2}>
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            activeTag === tag
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                      {activeTag && (
                        <button
                          onClick={() => setActiveTag(null)}
                          className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                        >
                          Clear filters
                        </button>
                      )}
                    </Flex>
                  </Box>

                  {/* Blog posts Grid */}
                  {filteredPosts.length > 0 ? (
                    <MotionSimpleGrid
                      columns={{ base: 1, md: 2 }}
                      spacing={8}
                      variants={listVariants} // Apply list variants to the grid
                    >
                      {filteredPosts.map(post => (
                        <MotionBox // Animate each individual card
                          key={post.id}
                          onClick={() => handlePostClick(post)}
                          className="group"
                          borderWidth="1px"
                          borderRadius="xl"
                          overflow="hidden"
                          boxShadow="sm"
                          _hover={{
                            boxShadow: 'md',
                            cursor: 'pointer',
                          }}
                          transition="all 0.2s ease-in-out"
                          bg={useColorModeValue('white', 'gray.800')}
                          variants={itemVariants} // Apply item variants
                        >
                          {post.image && (
                            <Box h="48" overflow="hidden">
                              <Image
                                src={post.image.startsWith('/') ? post.image : `/images/blog/${post.image.split('/').pop()}`}
                                alt={post.title}
                                objectFit="cover"
                                w="full"
                                h="full"
                                transition="transform 0.3s ease-in-out"
                                _groupHover={{ transform: 'scale(1.05)' }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = `https://placehold.co/400x200/cccccc/333333?text=Image+Missing`; // Fallback placeholder image
                                }}
                              />
                            </Box>
                          )}
                          <Box p={6}>
                            <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
                              {post.tags.slice(0, 2).map(tag => (
                                <Badge
                                  key={tag}
                                  px={2}
                                  py={1}
                                  borderRadius="full"
                                  colorScheme="blue"
                                  fontSize="xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 2 && (
                                <Badge
                                  px={2}
                                  py={1}
                                  borderRadius="full"
                                  colorScheme="gray"
                                  fontSize="xs"
                                >
                                  +{post.tags.length - 2}
                                </Badge>
                              )}
                            </Stack>
                            <Heading
                              as="h2"
                              size="md"
                              mb={2}
                              color={useColorModeValue('gray.700', 'white')}
                              _groupHover={{ color: 'blue.500' }}
                            >
                              {post.title}
                            </Heading>
                            <Text color={useColorModeValue('gray.600', 'gray.400')} mb={4} noOfLines={2}>
                              {post.description}
                            </Text>
                            <Stack direction="row" justify="space-between" align="center" fontSize="sm" color="gray.500">
                              <Text>{post.date}</Text>
                              <Text>{post.readTime}</Text>
                            </Stack>
                          </Box>
                        </MotionBox>
                      ))}
                    </MotionSimpleGrid>
                  ) : (
                    <Box textAlign="center" py={10}>
                      <Heading as="h3" size="md" mb={2}>No articles found</Heading>
                      <Text color={useColorModeValue('gray.600', 'gray.400')}>Try adjusting your search or filter to find what you're looking for.</Text>
                    </Box>
                  )}
                </MotionBox>
              ) : (
                // Single Blog Post View
                <MotionContainer
                  key="singlePost" // Unique key for AnimatePresence
                  maxW="container.lg"
                  py={12}
                  bg={blogContentBg}
                  borderRadius="xl"
                  boxShadow="lg"
                  p={{ base: 4, md: 8 }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={postVariants}
                >
                  <VStack spacing={8} align="stretch">
                    {selectedPost.image && (
                      <Box h={{ base: '200px', md: '400px' }} overflow="hidden" borderRadius="lg">
                        <Image
                          src={selectedPost.image.startsWith('/') ? selectedPost.image : `/images/blog/${selectedPost.image.split('/').pop()}`}
                          alt={selectedPost.title}
                          objectFit="cover"
                          w="full"
                          h="full"
                        />
                      </Box>
                    )}

                    <Box textAlign="center">
                      <Heading as="h1" size="xl" mb={4} color={useColorModeValue('gray.800', 'white')}>
                        {selectedPost.title}
                      </Heading>
                      <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')} mb={4}>
                        {selectedPost.description}
                      </Text>
                      <Box display="flex" justifyContent="center" gap={2} mb={4} flexWrap="wrap">
                        {selectedPost.tags.map((tag) => (
                          <Badge key={tag} px={2} py={1} borderRadius="full" colorScheme="blue">
                            {tag}
                          </Badge>
                        ))}
                      </Box>
                      <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                        {selectedPost.date} &bull; {selectedPost.readTime}
                      </Text>
                    </Box>

                    {/* Render the full blog content */}
                    <Box
                      className="blog-content"
                      dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                      fontSize="lg"
                      lineHeight="tall"
                      color={useColorModeValue('gray.700', 'gray.200')}
                      sx={{
                        '& h1': { fontSize: '3xl', fontWeight: 'bold', mt: 10, mb: 4 },
                        '& h2': { fontSize: '2xl', fontWeight: 'bold', mt: 8, mb: 4 },
                        '& h3': { fontSize: 'xl', fontWeight: 'semibold', mt: 6, mb: 3 },
                        '& p': { mb: 4 },
                        '& ul': { ml: 6, mb: 4, listStyleType: 'disc' },
                        '& ol': { ml: 6, mb: 4, listStyleType: 'decimal' },
                        '& li': { mb: 2 },
                        '& strong': { fontWeight: 'bold' },
                        '& em': { fontStyle: 'italic' },
                        '& a': { color: 'blue.500', _hover: { textDecoration: 'underline' } },
                        '& pre': {
                          bg: 'gray.800',
                          color: 'white',
                          p: 4,
                          borderRadius: 'md',
                          overflowX: 'auto',
                          mb: 4,
                        },
                        '& code': {
                          fontFamily: 'mono',
                          fontSize: 'md',
                          bg: 'gray.700',
                          px: '0.3em',
                          py: '0.1em',
                          borderRadius: 'sm',
                        },
                      }}
                    />

                    <Box textAlign="center" mt={12}>
                      <Link onClick={handleBackToPosts} color="blue.500" _hover={{ textDecoration: 'underline' }}>
                        &larr; Back to all posts
                      </Link>
                    </Box>
                  </VStack>
                </MotionContainer>
              )}
            </AnimatePresence>
          </div>
        </main>
      </Layout>
    </>
  );
}
