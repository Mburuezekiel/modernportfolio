import React from 'react';
import ME from "../assets/my passport.jpg"; 
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
} from '@chakra-ui/react';
import { Code, Coffee, Globe } from 'lucide-react';
import { Mail, Github } from 'lucide-react'; // Make sure to import the Mail and Github icons

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ElementType;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack spacing={4} align={'center'} textAlign={'center'}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'brand.500'}
        mb={1}
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function About() {
  return (
    <Box id="about" bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 14 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            About{' '}
            <Text as={'span'} color={'brand.500'}>
              Me
            </Text>
            <hr />
          </Heading>
          <div className="about-image">
            <img src={ME} alt="Ezekiel Njuguna" />
          </div>
          <Text
            fontSize={'xl'}
            color={'gray.600'}
            maxW={'3xl'}
            textAlign={'center'}
          >
            I'm a passionate Full Stack Developer with expertise in building scalable web applications.
            With a strong foundation in both front-end and back-end development, I create elegant
            solutions that solve real-world problems.
          </Text>
          <Flex spacing={{ base: 4, sm: 6 }} justifyContent="center">
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"brand"}
              bg={"skyblue"}
              _hover={{ bg: "brand.600" }}
              leftIcon={<linked In size={20} />}
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              linked In
            </Button>
            <br/>
            <Button
              rounded={"full"}
              size={"lg"}
              bg={"gray.700"}
              fontWeight={"normal"}
              px={6}
              leftIcon={<Github size={20} />}
              onClick={() => window.open("https://github.com/Mburuezekiel", "_blank")}
            >
              View Github
              </Button>
          </Flex>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 10, md: 4, lg: 10 }}
            w={'full'}
          >
            <Feature
              icon={Code}
              title={'Full Stack Development'}
              text={'Experienced in both frontend and backend technologies, creating complete web solutions.'}
            />
            <Feature
              icon={Globe}
              title={'Web Applications'}
              text={'Building responsive and scalable web applications with modern technologies.'}
            />
            <Feature
              icon={Coffee}
              title={'Problem Solving'}
              text={'Passionate about solving complex problems with clean and efficient code.'}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
