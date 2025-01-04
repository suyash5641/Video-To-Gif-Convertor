"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const MainSection = () => {
  const handleNavigation = () => {
    window.open("/editer", "_blank");
  };

  return (
    <section className="container mx-auto px-4 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          Convert video to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            GIF for free
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Transform your videos into eye-catching GIFs with our powerful online
          converter
        </p>
        <Button
          size="lg"
          onClick={handleNavigation}
          className="cursor-pointer relative z-[15] bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Start Converting Now
        </Button>
      </motion.div>
    </section>
  );
};

export default MainSection;
