import React from 'react';
import { Box, Container, Heading, Stack, Text, Icon, Divider } from '@chakra-ui/react';
import { CheckCircle, MessageSquare, Briefcase } from 'lucide-react'; // Use MessageSquare instead of ChatLeftDots

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
          Our Values
        </Heading>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 6, md: 4 }}
          justify="center"
          align="center"
        >
          <ValueBox
            icon={CheckCircle}
            title="Client Commitment"
            description="Our relentless dedication to clients stems from our integral belief that when you succeed, we succeed. You will see our commitment in the transparency of our communications and processes, our dedication to meeting delivery timelines, the quality of our development services, and our efforts to fulfill your requests."
          />
          <ValueBox
            icon={MessageSquare} // Updated to MessageSquare
            title="Process Transparency"
            description="Honest communication is the foundation of our partnerships. Transparent communication ensures there are no surprises and that developers, clients, and stakeholders are on the same page. We openly discuss the project’s progress, blockers, changes in delivery dates or feature sets, and other important KPIs."
          />
          <ValueBox
            icon={Briefcase}
            title="Talent Retention"
            description="Our talent is key to the success of our organization and our clients’ projects. That’s why we not only offer our specialists basic benefits but also regularly conduct salary reviews, provide opportunities for specialists to achieve their goals, and encourage them to share feedback. When our people prosper, we prosper."
          />
        </Stack>
      </Container>
    </Box>
  );
}
