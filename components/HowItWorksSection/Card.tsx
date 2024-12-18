"use client";

import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface StepCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function StepCard({ title, description, icon: Icon }: StepCardProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group">
      <CardContent className="pt-6 text-center relative z-10">
        <div className="rounded-full bg-purple-500/10 p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:bg-purple-500/20 transition-all duration-300">
          <Icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-all duration-300" />
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-purple-300 transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-300 group-hover:text-gray-200 transition-all duration-300">
          {description}
        </p>
      </CardContent>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 transition-all duration-300 z-0"></div>
    </Card>
  );
}
