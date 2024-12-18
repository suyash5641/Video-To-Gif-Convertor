"use client";
import { motion } from "framer-motion";
import { Upload, Wand2, CloudDownload } from "lucide-react";
import { StepCard } from "./Card";
import { fadeInUp, staggerChildren } from "@/lib/animation";

const steps = [
  {
    icon: Upload,
    title: "1. Select",
    description: "Upload a video from your device.",
  },
  {
    icon: Wand2,
    title: "2. Convert",
    description: "Trim your video to get desired GIF.",
  },
  {
    icon: CloudDownload,
    title: "3. Download",
    description: "Instantly download your new GIF.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
        >
          How to convert a video to a GIF online
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <StepCard {...step} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
