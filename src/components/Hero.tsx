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
import { Github, Mail, ChevronLeft, ChevronRight, Download } from "lucide-react";

const MotionBox = motion(Box);
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
    <Container maxW={"7xl"} id="home">
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <MotionBox
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "orange.300",
                  zIndex: -1,
                }}
              >
                Ezekiel Mburu
              </Text>
              <br /><br />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
                Innovate ● Inspire ● Create
              </Text>
              <Text as={"span"} color={"orange.500"} fontSize={{ base: "md", md: "lg" }}>
                Full Stack Developer
              </Text>
            </Heading>
            
            <MotionText
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              color={"gray.500"} 
              fontSize={"xl"}
              mt={4}
            >
              Passionate about creating innovative web solutions and turning
              ideas into reality through clean, efficient code.
            </MotionText>

            <MotionBox
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              mt={6}
            >
              <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: "column", sm: "row" }}>
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                  colorScheme={"orange"}
                  bg={"orange.400"}
                  _hover={{ bg: "orange.500" }}
                  leftIcon={<Mail size={20} />}
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Contact Me
                </Button>
                <Button
                  rounded={"full"}
                  size={"lg"}
                  bg={"gray.700"}
                  color={"white"}
                  fontWeight={"normal"}
                  px={6}
                  leftIcon={<Github size={20} />}
                  onClick={() => window.open("https://github.com/Mburuezekiel", "_blank")}
                >
                  View Github
                </Button>
                <Button
                  rounded={"full"}
                  size={"lg"}
                  colorScheme={"orange"}
                  variant="outline"
                  fontWeight={"normal"}
                  px={6}
                  leftIcon={<Download size={20} />}
                  onClick={() => window.open("/resume.pdf", "_blank")}
                >
                  Resume
                </Button>
              </Stack>
            </MotionBox>
          </MotionBox>
        </Stack>

        <Flex flex={1} justify={"center"} align={"center"} position={"relative"} w={"full"}>
          <Box 
            position={"relative"} 
            height={{ base: "250px", md: "400px" }} 
            rounded={"2xl"} 
            boxShadow={"2xl"} 
            width={"full"} 
            overflow={"hidden"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8 }}
                style={{ position: "absolute", width: "100%", height: "100%" }}
              >
                <Image
                  alt={"Hero Image"}
                  fit={"cover"}
                  align={"center"}
                  w={"100%"}
                  h={"100%"}
                  src={images[currentImageIndex]}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows with better visibility */}
            <IconButton
              aria-label="Previous image"
              icon={<ChevronLeft size={20} />}
              position="absolute"
              left="10px"
              top="50%"
              transform="translateY(-50%)"
              onClick={() => scrollImages("left")}
              rounded="full"
              bg="blackAlpha.600"
              color="white"
              _hover={{ bg: "blackAlpha.800" }}
              size="md"
            />
            <IconButton
              aria-label="Next image"
              icon={<ChevronRight size={20} />}
              position="absolute"
              right="10px"
              top="50%"
              transform="translateY(-50%)"
              onClick={() => scrollImages("right")}
              rounded="full"
              bg="blackAlpha.600"
              color="white"
              _hover={{ bg: "blackAlpha.800" }}
              size="md"
            />

            {/* Dots indicator */}
            <Flex mt={4} justify="center" position="absolute" bottom="10px" width="100%">
              {images.map((_, index) => (
                <motion.div
                  key={index}
                  onClick={() => handleManualChange(index)}
                  style={{
                    cursor: "pointer",
                    width: 12,
                    height: 12,
                    margin: "0 6px",
                    borderRadius: "50%",
                    backgroundColor: currentImageIndex === index ? "#ff9900" : "#CBD5E0",
                  }}
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
            </Flex>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
