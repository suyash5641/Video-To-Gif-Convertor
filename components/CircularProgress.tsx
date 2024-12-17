import * as React from "react";
import { Progress } from "@/components/ui/progress";

interface CircularProgressProps {
  progress: number;
}

export function CircularProgress({ progress }: CircularProgressProps) {
  return (
    <div className="absolute  w-16 h-16">
      <Progress
        value={progress}
        className="w-16 h-16 animate-progress [&>div]:stroke-blue [&>div]:stroke-[0.5rem] [&>div]:fill-transparent"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
