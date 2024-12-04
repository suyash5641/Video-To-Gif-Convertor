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
    <Card className="border-2 border-violet-100 hover:border-violet-300 transition-all duration-300 hover:shadow-lg bg-white/80 h-full flex flex-col">
      <CardContent className="pt-6 flex flex-col h-full">
        <div className="rounded-full bg-violet-50 w-16 h-16 flex items-center justify-center mb-6 mx-auto">
          <Icon className="w-8 h-8 text-violet-600" />
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          {title}
        </h3>
        <p className="text-gray-600 text-center flex-grow overflow-y-auto">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
