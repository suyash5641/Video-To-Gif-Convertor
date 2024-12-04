"use client";
import { motion } from "framer-motion";
import { Zap, Crown, Smile, Shield } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { fadeInUp, staggerChildren } from "@/app/utils/animation";

const features = [
  {
    title: "Fast & Free",
    description:
      "Convert your videos to GIFs in seconds, completely free of charge.",
    icon: Zap,
    color: "bg-yellow-400",
  },
  {
    title: "High Quality",
    description: "Maintain the quality of your videos ",
    icon: Crown,
    color: "bg-emerald-400",
  },
  {
    title: "Easy to Use",
    description: "Simple interface designed for users of all skill levels.",
    icon: Smile,
    color: "bg-blue-400",
  },
  {
    title: "Secure",
    description:
      "Your files are processed securely and never stored on our servers.",
    icon: Shield,
    color: "bg-red-400",
  },
];

export function FeatureSection() {
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        className="max-w-4xl mx-auto bg-white/60 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-violet-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
          variants={fadeInUp}
        >
          Why Choose Our Converter?
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
