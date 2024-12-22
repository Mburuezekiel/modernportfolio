import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, 
  Github, 
  Mail, 
  Linkedin, 
  Twitter, 
  Download,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Star
} from "lucide-react";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollImages = (direction) => {
    setCurrentImageIndex((prev) => {
      if (direction === "left") {
        return prev === 0 ? images.length - 1 : prev - 1;
      }
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  const badges = [
    { icon: <Code size={14} />, text: "Full Stack" },
    { icon: <Coffee size={14} />, text: "Problem Solver" },
    { icon: <Star size={14} />, text: "5+ Years" }
  ];

  const skills = ["React", "Node.js", "TypeScript", "Python", "AWS"];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Name and Title */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                  Ezekiel Mburu
                </h1>
              </motion.div>
              
              {/* Animated Tag Line */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600"
              >
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Innovate ● Inspire ● Create
                </span>
              </motion.div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                {badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 * index }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
                  >
                    <span className="mr-1.5">{badge.icon}</span>
                    {badge.text}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-600"
            >
              Passionate about creating innovative web solutions and turning
              ideas into reality through clean, efficient code.
            </motion.p>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium bg-white border border-gray-200 rounded-md shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <button className="inline-flex items-center px-6 py-3 rounded-full text-white bg-orange-500 hover:bg-orange-600 transition-colors">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </button>
              <button className="inline-flex items-center px-6 py-3 rounded-full text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                <Github className="mr-2 h-5 w-5" />
                View Github
              </button>
              <button className="inline-flex items-center px-6 py-3 rounded-full text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                <Download className="mr-2 h-5 w-5" />
                Resume
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-4"
            >
              {[Linkedin, Twitter, Github, Mail].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={`/api/placeholder/800/500`}
                  alt="Hero Image"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              {/* Navigation Buttons */}
              <button
                onClick={() => scrollImages("left")}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => scrollImages("right")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {Array.from({ length: 7 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentImageIndex === index
                        ? "bg-orange-500 w-4"
                        : "bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg"
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">50+</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">5+</div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">100%</div>
                  <div className="text-sm text-gray-600">Success</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
