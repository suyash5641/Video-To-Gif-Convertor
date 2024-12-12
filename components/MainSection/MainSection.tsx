"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { fadeInUp } from "@/lib/animation";

const MainSection = () => {
  const handleNavigation = () => {
    window.open("/editer", "_blank");
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-16 md:py-32"
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div
        className="max-w-3xl mx-auto text-center space-y-8"
        variants={fadeInUp}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-gray-800 tracking-tight leading-tight"
          variants={fadeInUp}
        >
          Convert video to GIF <span className="text-violet-600">for free</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-600 font-light"
          variants={fadeInUp}
        >
          Transform your videos into eye-catching GIFs with our powerful online
          converter
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Button
            className="shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleNavigation}
          >
            Start Converting Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MainSection;
