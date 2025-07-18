import React, { useState, useEffect, useCallback } from "react";
// Import images
import des from "../assets/webdes.jpeg";
import dev from "../assets/webdev.jpeg";
import brand from "../assets/branding.jpeg";
import log from "../assets/logo2.jpeg";
import back from "../assets/background.webp";
import code from "../assets/code.avif";
import off from "../assets/code off.avif";
import resume from "../assets/resume.pdf";

// Import Chakra UI components
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  useColorModeValue,
  IconButton,
  HStack,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

// Import animation libraries and icons
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, ChevronLeft, ChevronRight, Download } from "lucide-react";

// Motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

// Content data
const carouselContent = [
  { image: log, title: "Brand Identity", desc: "Crafting unique visual identities that represent your brand values" },
  { image: des, title: "Web Design", desc: "Creating beautiful, intuitive user interfaces" },
  { image: dev, title: "Web Development", desc: "Building robust, scalable web applications" },
  { image: brand, title: "Digital Branding", desc: "Establishing your online presence and digital identity" },
  { image: back, title: "Responsive Layouts", desc: "Ensuring perfect display across all device sizes" },
  { image: code, title: "Clean Code", desc: "Writing maintainable, efficient code following best practices" },
  { image: off, title: "Problem Solving", desc: "Finding elegant solutions to complex challenges" }
];

export default function Hero() {
  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality with useCallback optimization
  const nextSlide = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carouselContent.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  useEffect(() => {
    let interval;
    
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Handler for manual navigation
  const handleManualChange = useCallback((newIndex) => {
    setCurrentImageIndex(newIndex);
    setIsAutoPlaying(false);
    
    // Resume autoplay after inactivity (e.g., 10 seconds after a manual click)
    const timeout = setTimeout(() => setIsAutoPlaying(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  const scrollImages = useCallback((direction) => {
    if (direction === "left") {
      handleManualChange(currentImageIndex === 0 ? carouselContent.length - 1 : currentImageIndex - 1);
    } else {
      handleManualChange(currentImageIndex === carouselContent.length - 1 ? 0 : currentImageIndex + 1);
    }
  }, [currentImageIndex, handleManualChange, carouselContent.length]);

  // Responsive settings
  const isMobile = useBreakpointValue({ base: true, md: false }); // Already present, good for conditional rendering if needed
  
  // Color mode values
  const bgGradient = useColorModeValue(
    "linear(to-br, orange.50, white, white, orange.50)",
    "linear(to-br, orange.900, gray.900, gray.900, orange.900)"
  );
  const textHighlightColor = useColorModeValue("orange.400", "orange.300");
  const buttonHoverBg = useColorModeValue("orange.500", "orange.400");
  const secondaryButtonBg = useColorModeValue("gray.700", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const subtitleColor = useColorModeValue("gray.500", "gray.400");
  const highlightUnderlineColor = useColorModeValue("orange.300", "orange.400");
  const carouselOverlayBg = "blackAlpha.700";

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.4 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const imageVariants = {
    // These use 'x' for horizontal sliding
    enter: (direction) => ({ // direction passed from AnimatePresence custom prop
      opacity: 0,
      x: direction > 0 ? 200 : -200, // Enter from right if next, left if prev
    }),
    center: { opacity: 1, x: 0 },
    exit: (direction) => ({ // direction passed from AnimatePresence custom prop
      opacity: 0,
      x: direction < 0 ? 200 : -200, // Exit to right if prev, left if next
    }),
  };

  return (
    <Box 
      w="full" 
      position="relative"
      bg={useColorModeValue("gray.50", "gray.900")}
      overflow="hidden"
      id="home"
    >
      {/* Background gradient */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="100%"
        bgGradient={bgGradient}
        opacity="0.6"
        zIndex="0"
      />

      <Container maxW="7xl" position="relative" zIndex="1" px={{ base: 4, sm: 6, md: 8 }}> {/* Adjusted px */}
        <Stack
          align="center"
          spacing={{ base: 10, md: 16 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          {/* Left side content (Text and Buttons) */}
          <VStack 
            flex={1} 
            spacing={{ base: 6, md: 8 }}
            align={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "left" }}
            maxW={{ base: "full", md: "50%" }} // Limit width on larger screens for better text flow
          >
            <MotionBox
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              width="full"
            >
              <Heading
                lineHeight={1.1}
                fontWeight={700}
                fontSize={{ base: "4xl", sm: "5xl", lg: "6xl" }}
              >
                <Text as="span" position="relative" display="inline-block">
                  Ezekiel Mburu
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    height="30%"
                    width="full"
                    bg={highlightUnderlineColor}
                    opacity="0.3"
                    zIndex="-1"
                    rounded="md"
                  />
                </Text>
              </Heading>
            </MotionBox>

            <MotionText
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              <Text mb={2} fontSize={{ base: "md", md: "lg" }} color={subtitleColor} fontWeight="medium">
                Innovate • Inspire • Create
              </Text>
              <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color={textHighlightColor}>
                Full Stack Developer
              </Text>
            </MotionText>

            <MotionText
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              color={textColor}
              fontSize={{ base: "lg", md: "xl" }}
              maxW="600px"
            >
              Passionate about creating innovative web solutions and turning
              ideas into reality through clean, efficient code that delivers exceptional user experiences.
            </MotionText>

            <MotionBox
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              width="full"
            >
              <HStack 
                spacing={{ base: 3, sm: 5 }} 
                mt={4}
                width="full"
                flexWrap={{ base: "wrap", sm: "nowrap" }} // Allow wrapping on very small screens
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                <Button
                  rounded="full"
                  size="lg"
                  fontWeight="semibold"
                  px={6}
                  py={6}
                  colorScheme="orange" 
                  bg="orange.400"
                  _hover={{ bg: buttonHoverBg }}
                  leftIcon={<Mail size={20} />}
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Contact Me
                </Button>
                <Button
                  rounded="full"
                  size="lg"
                  py={6}
                  bg={secondaryButtonBg}
                  color="white"
                  fontWeight="semibold"
                  px={6}
                  _hover={{ bg: "gray.800" }}
                  leftIcon={<Github size={20} />}
                  onClick={() => window.open("https://github.com/Mburuezekiel", "_blank")}
                >
                  View Github
                </Button>
                <Button
                  rounded="full"
                  size="lg"
                  py={6}
                  colorScheme="orange"
                  variant="outline"
                  fontWeight="semibold"
                  px={6}
                  leftIcon={<Download size={20} />}
                  onClick={() => window.open(resume, "_blank")}
                >
                  Resume
                </Button>
              </HStack>
            </MotionBox>
          </VStack>

          {/* Right side carousel */}
          <Flex 
            flex={1} 
            justify="center" 
            align="center" 
            position="relative" 
            w="full"
            minH={{ base: "300px", md: "450px" }} // minH for better control
            maxW={{ base: "full", md: "50%" }} // Match left column's maxW
            mt={{ base: 10, md: 0 }} // Add top margin on mobile, none on desktop
          >
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              position="relative"
              height="full" // Take full height of parent Flex
              width="full"  // Take full width of parent Flex
              maxW="500px" // Max width for the carousel itself to prevent it from getting too large
              aspectRatio={16/9} // Maintain aspect ratio for the carousel image container
              rounded="2xl"
              boxShadow="2xl"
              overflow="hidden"
              borderWidth="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <AnimatePresence mode="wait" custom={1}> {/* custom prop for directional animation */}
                <MotionBox
                  key={currentImageIndex}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={1} // Pass direction for 'enter' and 'exit' variants
                  transition={{ duration: 0.5 }}
                  position="absolute"
                  width="full"
                  height="full"
                >
                  <Image
                    alt={carouselContent[currentImageIndex].title}
                    fit="cover"
                    align="center"
                    w="100%"
                    h="100%"
                    src={carouselContent[currentImageIndex].image}
                  />
                  
                  {/* Image overlay with title and description */}
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    bg={carouselOverlayBg}
                    color="white"
                    p={{ base: 3, md: 4 }}
                    textAlign="center"
                  >
                    <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                      {carouselContent[currentImageIndex].title}
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} mt={1} opacity={0.8}>
                      {carouselContent[currentImageIndex].desc}
                    </Text>
                  </Box>
                </MotionBox>
              </AnimatePresence>

              {/* Navigation arrows */}
              <IconButton
                aria-label="Previous image"
                icon={<ChevronLeft />}
                position="absolute"
                left={{ base: "5px", md: "10px" }} // Adjusted for smaller screens
                top="50%"
                transform="translateY(-50%)"
                onClick={() => scrollImages("left")}
                rounded="full"
                colorScheme="orange"
                bg="blackAlpha.600"
                _hover={{ bg: "blackAlpha.800" }}
                size={{ base: "sm", md: "md" }} // Adjusted for smaller screens
                zIndex={2} // Ensure arrows are above image
              />
              <IconButton
                aria-label="Next image"
                icon={<ChevronRight />}
                position="absolute"
                right={{ base: "5px", md: "10px" }} // Adjusted for smaller screens
                top="50%"
                transform="translateY(-50%)"
                onClick={() => scrollImages("right")}
                rounded="full"
                colorScheme="orange"
                bg="blackAlpha.600"
                _hover={{ bg: "blackAlpha.800" }}
                size={{ base: "sm", md: "md" }} // Adjusted for smaller screens
                zIndex={2} // Ensure arrows are above image
              />
            </MotionBox>

            {/* Dots indicator */}
            <HStack 
              position="absolute" 
              bottom={{ base: "-40px", md: "-30px" }} // Adjust position to prevent overlap/ensure visibility
              justify="center" 
              width="full"
              spacing={2}
            >
              {carouselContent.map((_, index) => (
                <Box
                  key={index}
                  as={motion.div}
                  cursor="pointer"
                  onClick={() => handleManualChange(index)}
                  w={{ base: 2, md: 3 }}
                  h={{ base: 2, md: 3 }}
                  rounded="full"
                  bg={currentImageIndex === index ? "orange.400" : "gray.300"}
                  animate={{
                    scale: currentImageIndex === index ? 1.3 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                />
              ))}
            </HStack>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}