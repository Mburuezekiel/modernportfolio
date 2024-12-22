import React, { useState, useEffect } from "react";
import { Badge, Tooltip, IconButton, Divider } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Github, Mail, Linkedin, Twitter, Code2, Rocket, Terminal, Coffee, Award, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define motion components
const MotionDiv = motion.div;
const MotionBox = ({ children, ...props }) => (
  <MotionDiv {...props}>
    {children}
  </MotionDiv>
);

// Replace image imports with placeholder images
const images = [
  "/api/placeholder/800/600",
  "/api/placeholder/800/600",
  "/api/placeholder/800/600",
  "/api/placeholder/800/600",
  "/api/placeholder/800/600",
  "/api/placeholder/800/600",
  "/api/placeholder/800/600"
];

const TechBadge = ({ text }) => (
  <Badge variant="default" className="bg-orange-100 text-orange-800 mr-2 mb-2">
    {text}
  </Badge>
);

const SocialButton = ({ icon: Icon, label, onClick }) => (
  <Tooltip content={label}>
    <IconButton
      aria-label={label}
      icon={<Icon className="w-5 h-5" />}
      onClick={onClick}
      variant="ghost"
      className="rounded-full hover:bg-orange-100 hover:text-orange-500 transition-all"
    />
  </Tooltip>
);

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
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
    <div className="container mx-auto max-w-7xl" id="home">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-20" />
      
      <div className="flex flex-col md:flex-row items-center justify-between py-20 md:py-28 space-y-8 md:space-y-0 md:space-x-10">
        <div className="flex-1 space-y-5 md:space-y-10">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Status Badge */}
            <Badge className="mb-4 bg-green-100 text-green-800">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2" />
              Available for projects
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                <span className="relative inline-block">
                  Ezekiel Mburu
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-orange-300 -z-10" />
                </span>
              </h1>

              <div className="flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-orange-500" />
                <span className="text-orange-500 text-lg">
                  Full Stack Developer
                </span>
              </div>
            </div>

            {/* Tech stack badges */}
            <div className="my-4">
              <TechBadge text="React" />
              <TechBadge text="Node.js" />
              <TechBadge text="TypeScript" />
              <TechBadge text="Next.js" />
            </div>

            <Card className="p-4 mb-6 bg-orange-50 border-none">
              <p className="text-gray-600 text-lg">
                <Rocket className="inline-block w-5 h-5 mr-2 text-orange-500" />
                Passionate about creating innovative web solutions and turning
                ideas into reality through clean, efficient code.
              </p>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">3+</p>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">50+</p>
                <p className="text-sm text-gray-600">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">99%</p>
                <p className="text-sm text-gray-600">Client Satisfaction</p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-2 mb-6">
              <SocialButton icon={Github} label="GitHub" onClick={() => window.open("https://github.com/Mburuezekiel", "_blank")} />
              <SocialButton icon={Linkedin} label="LinkedIn" onClick={() => window.open("#", "_blank")} />
              <SocialButton icon={Twitter} label="Twitter" onClick={() => window.open("#", "_blank")} />
              <SocialButton icon={Mail} label="Email" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} />
            </div>

            {/* Achievement badges */}
            <div className="flex space-x-4 mb-6">
              <Tooltip content="Top Rated Developer">
                <Award className="w-6 h-6 text-yellow-500" />
              </Tooltip>
              <Tooltip content="500+ Contributions">
                <Terminal className="w-6 h-6 text-purple-500" />
              </Tooltip>
              <Tooltip content="Tech Writer">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </Tooltip>
              <Tooltip content="Coffee Enthusiast">
                <Coffee className="w-6 h-6 text-brown-500" />
              </Tooltip>
            </div>
          </MotionBox>
        </div>

        <div className="flex-1 relative w-full">
          <div className="relative h-64 md:h-96 rounded-2xl shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <MotionDiv
                key={currentImageIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8 }}
                className="relative h-full"
              >
                <img
                  alt={"Hero Image"}
                  className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
                  src={images[currentImageIndex]}
                />
                {/* Image overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </MotionDiv>
            </AnimatePresence>

            {/* Enhanced dots animation */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              {images.map((_, index) => (
                <MotionDiv
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className="cursor-pointer mx-1"
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: currentImageIndex === index ? "#ff9900" : "#CBD5E0",
                  }}
                  whileHover={{ scale: 1.2 }}
                  animate={{
                    scale: currentImageIndex === index ? 1.3 : 1,
                    opacity: currentImageIndex === index ? 1 : 0.6,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                />
              ))}
            </div>

            {/* Enhanced navigation buttons */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-sm"
              onClick={() => scrollImages("left")}
            >
              &lt;
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-sm"
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
