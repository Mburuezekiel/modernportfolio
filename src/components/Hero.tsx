import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github } from "lucide-react";

// Import images (you'll need to adjust the import paths)
import des from "../assets/webdes.jpeg";
import dev from "../assets/webdev.jpeg";
import brand from "../assets/branding.jpeg";
import log from "../assets/logo2.jpeg";
import back from "../assets/background.webp";
import code from "../assets/code.avif";
import off from "../assets/code off.avif";

const images = [log, des, dev, brand, back, code, off];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hiText, setHiText] = useState('');
  const [nameText, setNameText] = useState('');
  const [roleText, setRoleText] = useState('');
  const [innovateText, setInnovateText] = useState('');
  const [inspireText, setInspireText] = useState('');
  const [createText, setCreateText] = useState('');

  const hiFullText = "Hi, I am";
  const nameFullText = "Ezekiel Mburu";
  const roleFullText = "Full Stack Developer";
  const innovateFullText = "Innovate";
  const inspireFullText = "Inspire";
  const createFullText = "Create";

  useEffect(() => {
    let isMounted = true;

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    const typeText = (fullText, setTextState, duration = 100) => {
      return new Promise((resolve) => {
        for (let i = 0; i <= fullText.length; i++) {
          setTimeout(() => {
            if (isMounted) {
              setTextState(fullText.slice(0, i));
              if (i === fullText.length) resolve();
            }
          }, i * duration);
        }
      });
    };

    const clearAllTexts = () => {
      setHiText('');
      setNameText('');
      setRoleText('');
      setInnovateText('');
      setInspireText('');
      setCreateText('');
    };

    const animationLoop = async () => {
      while (isMounted) {
        clearAllTexts();
        await typeText(hiFullText, setHiText, 50);
        await new Promise(resolve => setTimeout(resolve, 500));
        await typeText(nameFullText, setNameText, 100);
        await new Promise(resolve => setTimeout(resolve, 500));
        await typeText(roleFullText, setRoleText, 50);
        await new Promise(resolve => setTimeout(resolve, 500));
        await typeText(innovateFullText, setInnovateText, 50);
        await new Promise(resolve => setTimeout(resolve, 500));
        await typeText(inspireFullText, setInspireText, 50);
        await new Promise(resolve => setTimeout(resolve, 500));
        await typeText(createFullText, setCreateText, 50);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    };

    animationLoop();

    return () => {
      isMounted = false;
      clearInterval(imageInterval);
    };
  }, []);

  const scrollImages = (direction) => {
    if (direction === "left") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home">
      <div className="flex flex-col md:flex-row items-center justify-between py-20 md:py-28 space-y-10 md:space-y-0 md:space-x-10">
        {/* Left Column - Text Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="leading-tight font-semibold text-3xl sm:text-4xl lg:text-6xl">
              <div className="relative inline-block">
                <span className="text-sm md:text-base text-gray-700">
                  {hiText}
                </span>
                
                <span className="relative ml-2">
                  <span className="text-xl sm:text-2xl lg:text-4xl">
                    {nameText}
                    {nameText === nameFullText && (
                      <span 
                        className="absolute bottom-1 left-0 w-full h-[30%] bg-orange-300 -z-10"
                      ></span>
                    )}
                  </span>
                </span>
              </div>
              <div className="h-4"></div>
              <div className="text-sm md:text-lg text-gray-600">
                <span className="inline-block mr-2">{ ● innovateText}</span>
                <span className="inline-block mr-2">{ ● inspireText}</span>
                <span className="inline-block">{ ● createText}</span>
              </div>
              <div className="mt-2 text-sm md:text-lg text-orange-500">
                {roleText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="inline-block w-[2px] h-5 bg-orange-500 ml-1"
                />
              </div>
            </div>

            <p className="text-gray-500 text-xl mt-4">
              Passionate about creating innovative web solutions and turning
              ideas into reality through clean, efficient code.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="rounded-full px-6 py-3 bg-orange-400 text-white hover:bg-orange-500 flex items-center justify-center space-x-2"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Mail size={20} />
                <span>Contact Me</span>
              </button>
              <button
                className="rounded-full px-6 py-3 bg-gray-700 text-white hover:bg-gray-800 flex items-center justify-center space-x-2"
                onClick={() => window.open("https://github.com/Mburuezekiel", "_blank")}
              >
                <Github size={20} />
                <span>View Github</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Image Carousel */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-full max-w-md h-[250px] md:h-[400px] rounded-2xl shadow-2xl overflow-hidden">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full"
            >
              <img
                alt="Hero Image"
                className="w-full h-full object-cover"
                src={images[currentImageIndex]}
              />
            </motion.div>

            {/* Dots animation */}
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((_, index) => (
                <motion.div
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`cursor-pointer w-3 h-3 rounded-full ${
                    currentImageIndex === index ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
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
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => scrollImages("left")}
            >
              &lt;
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => scrollImages("right")}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
