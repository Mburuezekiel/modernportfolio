import React, { useState, useEffect } from "react";
import des from "../assets/webdes.jpeg";
import dev from "../assets/webdev.jpeg";
import brand from "../assets/branding.jpeg";
import log from "../assets/logo2.jpeg";
import back from "../assets/background.webp";
import code from "../assets/code.avif";
import off from "../assets/code off.avif";
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
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, ChevronLeft, ChevronRight, ExternalLink, Download } from "lucide-react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

const images = [log, des, dev, brand, back, code, off];
const titles = [
  "Brand Identity",
  "Web Design",
  "Web Development",
  "Digital Branding",
  "Responsive Layouts",
  "Clean Code",
  "Problem Solving"
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Pause autoplay when user interacts with controls
  const handleManualChange = (newIndex) => {
    setCurrentImageIndex(newIndex);
    setIsAutoPlaying(false);
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const scrollImages = (direction) => {
    if (direction === "left") {
      handleManualChange(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
    } else {
      handleManualChange(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
    }
  };

  // Responsive settings
  const isMobile = useBreakpointValue({ base: true, md: false });
  const textHighlightColor = useColorModeValue("orange.400", "orange.300");
  const buttonHoverBg = useColorModeValue("orange.500", "orange.400");
  const secondaryButtonBg = useColorModeValue("gray.700", "gray.600");

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.2
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.4
      }
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
        bgGradient={useColorModeValue(
          "linear(to-br, orange.50, white, white, orange.50)",
          "linear(to-br, orange.900, gray.900, gray.900, orange.900)"
        )}
        opacity="0.6"
        zIndex="0"
      />

      <Container maxW="7xl" position="relative" zIndex="1">
        <Stack
          align="center"
          spacing={{ base: 8, md: 12 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <VStack 
            flex={1} 
            spacing={{ base: 6, md: 8 }}
            align={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "left" }}
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
                    bg={textHighlightColor}
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
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="medium"
              color={textHighlightColor}
            >
              <Text mb={2} fontSize={{ base: "md", md: "lg" }} color="gray.500" fontWeight="medium">
                Innovate • Inspire • Create
              </Text>
              Full Stack Developer
            </MotionText>

            <MotionText
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              color={useColorModeValue("gray.600", "gray.300")}
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
                flexWrap={{ base: "wrap", sm: "nowrap" }}
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
                  onClick={() => window.open("/resume.pdf", "_blank")}
                >
                  Resume
                </Button>
              </HStack>
            </MotionBox>
          </VStack>

          <Flex 
            flex={1} 
            justify="center" 
            align="center" 
            position="relative" 
            w="full"
            h={{ base: "350px", md: "450px" }}
          >
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              position="relative"
              height="full"
              rounded="2xl"
              boxShadow="2xl"
              width="full"
              overflow="hidden"
              borderWidth="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <AnimatePresence mode="wait">
                <MotionBox
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  position="absolute"
                  width="full"
                  height="full"
                >
                  <Image
                    alt={titles[currentImageIndex]}
                    fit="cover"
                    align="center"
                    w="100%"
                    h="100%"
                    src={images[currentImageIndex]}
                  />
                  
                  {/* Image overlay with title */}
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    bg="blackAlpha.600"
                    color="white"
                    p={3}
                    textAlign="center"
                  >
                    <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                      {titles[currentImageIndex]}
                    </Text>
                  </Box>
                </MotionBox>
              </AnimatePresence>

              {/* Navigation arrows */}
              <IconButton
                aria-label="Previous image"
                icon={<ChevronLeft />}
                position="absolute"
                left="10px"
                top="50%"
                transform="translateY(-50%)"
                onClick={() => scrollImages("left")}
                rounded="full"
                colorScheme="orange"
                bg="blackAlpha.600"
                _hover={{ bg: "blackAlpha.800" }}
                size="md"
              />
              <IconButton
                aria-label="Next image"
                icon={<ChevronRight />}
                position="absolute"
                right="10px"
                top="50%"
                transform="translateY(-50%)"
                onClick={() => scrollImages("right")}
                rounded="full"
                colorScheme="orange"
                bg="blackAlpha.600"
                _hover={{ bg: "blackAlpha.800" }}
                size="md"
              />
            </MotionBox>

            {/* Dots indicator */}
            <HStack 
              position="absolute" 
              bottom="-30px" 
              justify="center" 
              width="full"
              spacing={2}
            >
              {images.map((_, index) => (
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
