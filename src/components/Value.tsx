import React from 'react';
import { Box, Container, Heading, Stack, Text, Icon, Divider } from '@chakra-ui/react';
import { CheckCircle, MessageSquare, Briefcase } from 'lucide-react';

const ValueBox = ({ icon, title, description }: { icon: React.ElementType; title: string; description: string }) => {
  return (
    <Box
      bg="#2c4f75"
      color="white"
      borderRadius="10px"
      p="20px"
      mb="30px"
      transition="transform 0.3s ease"
      _hover={{ transform: 'translateY(-20px)', boxShadow: '0 5px 10px orange' }}
      textAlign="center"
    >
      <Icon as={icon} fontSize="40px" color="#ffd700" mb="20px" />
      <Heading fontSize="xl" color="#ffd700" mb="2">
        {title}
      </Heading>
      <Divider borderColor="#ffd700" width="50px" margin="10px auto" />
      <Text color="white" fontSize="16px">
        {description}
      </Text>
    </Box>
  );
};

export default function Values() {
  return (
    <Box bg="#1b3b5f" color="white" py="50px" textAlign="center" borderTop="5px solid #ff9900">
      <Container maxW="7xl">
        <Heading color="#ffd700" mb="40px">
          My Professional Values
          <Text as={'span'} color={'brand.500'}>
                Values
              </Text>
        </Heading>
        
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 6, md: 4 }}
          justify="center"
          align="center"
        >
          <ValueBox
            icon={CheckCircle}
            title="Commitment to Clients"
            description="I am dedicated to ensuring client success, as I believe that their achievements directly reflect my own. This commitment is evident in my transparent communication, adherence to deadlines, and unwavering quality in development services."
          />
          <ValueBox
            icon={MessageSquare} // Updated to MessageSquare
            title="Transparent Processes"
            description="Honest communication is vital for fostering strong partnerships. I prioritize transparency, ensuring that all stakeholders are informed and aligned throughout the project's lifecycle, from progress updates to addressing challenges."
          />
          <ValueBox
            icon={Briefcase}
            title="Focus on Talent Retention"
            description="The success of my projects hinges on the talent I nurture. I am committed to providing comprehensive benefits, conducting regular performance reviews, and creating an environment where team members can thrive and share their insights."
          />
        </Stack>
      </Container>
    </Box>
  );
}
