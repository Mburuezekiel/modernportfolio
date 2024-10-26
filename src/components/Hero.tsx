import React, { useState, useEffect } from "react";
import des from "../assets/webdes.jpeg";
import dev from "../assets/webdev.jpeg";
import brand from "../assets/branding.jpeg";
import log from "../assets/logo2.jpeg";
import back from "../assets/background.webp";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";

const MotionBox = motion(Box);

const images = [
  log,
  des,
  dev,
  brand,
  back,
  // External images omitted for brevity
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollImages = (direction) => {
    setCurrentImageIndex((prevIndex) =>
      direction === "left" 
        ? (prevIndex === 0 ? images.length - 1 : prevIndex - 1) 
        : (prevIndex === images.length - 1 ? 0 : prevIndex + 1)
    );
  };

  return (
    <Container maxW={"7xl"} id="home">
      <Stack align={"center"} spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }} direction={{ base: "column", md: "row" }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}>
              <Text as={"span"} position={"relative"} _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "orange.300",
                  zIndex: -1,
                  animation: "typing 5.5s steps(30, end), blink-caret 0.75s step-end infinite",
              }}>
                Hi, I'm Ezekiel Mburu
              </Text>
              <br /><br />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">Innovate ● Inspire ● Create</Text>
              <Text as={"span"} color={"orange.500"} fontSize={{ base: "md", md: "lg" }}>Full Stack Developer</Text>
            </Heading>
            <Text color={"gray.500"} fontSize={"xl"}>
              Passionate about creating innovative web solutions and turning ideas into reality through clean, efficient code.
            </Text>
          </MotionBox>
        </Stack>

        <Flex flex={1} justify={"center"} align={"center"} position={"relative"} w={"full"}>
          <Box position={"relative"} height={{ base: "250px", md: "400px" }} rounded={"2xl"} boxShadow={"2xl"} width={"full"} overflow={"hidden"}>
            <motion.div key={currentImageIndex} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.8 }}>
              <Image alt={`Hero Image ${currentImageIndex}`} fit={"cover"} align={"center"} w={"100%"} h={"100%"} src={images[currentImageIndex]} />
            </motion.div>

            <Flex mt={4} justify="center">
              {images.map((_, index) => (
                <motion.div key={index} onClick={() => setCurrentImageIndex(index)} style={{
                  cursor: "pointer",
                  width: 12,
                  height: 12,
                  margin: "0 6px",
                  borderRadius: "50%",
                  backgroundColor: currentImageIndex === index ? "#ff9900" : "#CBD5E0",
                }} animate={{ scale: currentImageIndex === index ? 1.3 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} />
              ))}
            </Flex>

            <Button position="absolute" left="10px" top="50%" transform="translateY(-50%)" onClick={() => scrollImages("left")} variant="outline" colorScheme="orange" rounded="full" color={"orange.400"}>
              &lt;
            </Button>
            <Button position="absolute" right="10px" top="50%" transform="translateY(-50%)" onClick={() => scrollImages("right")} variant="outline" colorScheme="orange" rounded="full" color={"orange.400"}>
              &gt;
            </Button>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
