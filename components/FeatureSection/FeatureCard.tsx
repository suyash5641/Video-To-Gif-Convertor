"use client";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  color,
}: FeatureCardProps) {
  return (
    <motion.div
      className={`p-6 rounded-xl transition-all duration-300 border border-gray-700 shadow-md ${color} bg-opacity-50 hover:bg-opacity-60 overflow-hidden h-full flex flex-col`}
      // whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-center mb-4">
        <Icon className={`w-10 h-10 ${color.replace("bg-", "text-")}`} />
      </div>
      <h3 className="text-2xl font-semibold text-white-800 mb-3">{title}</h3>
      <p className="text-white-700 break-words overflow-y-auto flex-grow">
        {description}
      </p>
    </motion.div>
  );
}
