import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Progress,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  useDisclosure,
} from '@chakra-ui/react';

// Import certificate images
import JavaScriptCertificate from '../assets/Html.jpeg';
import HTML from '../assets/Html.jpeg';
import Operating   from '../assets/os.jpeg';
import UI from '../assets/Ui ux.jpeg';
import NetworkingCertificate from '../assets/Networking Basics Cert .jpeg'
import GitCertificate from '../assets/Html.jpeg';
import AWSCertificate from '../assets/Html.jpeg';

// Define the properties for each skill
interface SkillProps {
  name: string; // Skill name
  level: number; // Proficiency level in percentage
  color: string; // Chakra UI color scheme
  certificate: string; // Imported certificate image
}

// Array of skills with their details
const skills: SkillProps[] = [
  { name: 'JavaScript/TypeScript', level: 100, color: 'yellow.400', certificate: JavaScriptCertificate },
  { name: 'HTML', level: 100, color: 'cyan.400', certificate: HTML },
  { name: 'Operating System', level: 100, color: 'green.400', certificate: Operating},
   { name: 'Networking Basics', level: 100, color: 'purple.400', certificate: NetworkingCertificate },
  { name: 'UI & UX ', level: 100, color: 'blue.400', certificate: UI },
  { name: 'CSS', level: 100, color: 'orange.400', certificate: HTML },
  
  { name: 'Git/Version Control', level: 85, color: 'red.400', certificate: GitCertificate },
  { name: 'AWS/Cloud Services', level: 70, color: 'teal.400', certificate: AWSCertificate },
];

// SkillBar component to display individual skill
const SkillBar = ({ name, level, color, certificate, onShowCertificate }: SkillProps & { onShowCertificate: () => void }) => {
  return (
    <Box mb={6}>
      <Flex justify="space-between" mb={2}>
        <Text fontWeight="medium">{name}</Text>
        <Text fontWeight="medium" color={color}>
          {level}%
        </Text>
      </Flex>
      <Progress
        value={level}
        colorScheme={color.split('.')[0]} // Set color scheme based on the skill's color
        height="4px"
        borderRadius="full"
        mb={3}
      />
      <Button colorScheme="blue" size="sm" onClick={onShowCertificate}>
        View Certificate
      </Button>
    </Box>
  );
};

// Main Skills component
export default function Skills() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal control hooks
  const [selectedSkill, setSelectedSkill] = useState<SkillProps | null>(null); // State to store selected skill

  // Function to handle certificate display
  const handleShowCertificate = (skill: SkillProps) => {
    setSelectedSkill(skill); // Set the selected skill
    onOpen(); // Open the modal
  };

  return (
    <Box id="skills" bg={useColorModeValue('white', 'gray.800')} py={20}>
      <Container maxW={'7xl'}>
        <Heading
          textAlign={'center'}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          fontWeight={600}
          mb={16}
        >
          Technical <Text as={'span'} color={'brand.500'}>Skills</Text>
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 16 }} px={{ base: 4, md: 16 }}>
          {skills.map((skill, index) => (
            <SkillBar
              key={index}
              {...skill}
              onShowCertificate={() => handleShowCertificate(skill)} // Pass the entire skill object
            />
          ))}
        </SimpleGrid>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Certificate for {selectedSkill?.name}</ModalHeader> {/* Show skill name */}
          <ModalCloseButton />
          <ModalBody>
            {selectedSkill && <Image src={selectedSkill.certificate} alt="Certificate" />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
