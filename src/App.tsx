import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { theme } from './theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Value from './components/Value';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Value />
        <Contact />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
