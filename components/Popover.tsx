"use client";

import * as React from "react";
import { Upload, Gauge, Frame } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const speedOptions = ["0.5x", "1x", "1.5x", "2x"];
const frameOptions = [
  { rate: 5, maxDuration: 60 },
  { rate: 10, maxDuration: 30 },
  { rate: 30, maxDuration: 10 },
];

export function PopOver() {
  const [speed, setSpeed] = React.useState("1x");
  const [frameRate, setFrameRate] = React.useState<number | null>(null);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <Gauge className="h-4 w-4" />
            <span className="sr-only">Speed</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent side={"right"} className="w-[100%] mr-4">
          <div className="grid gap-2">
            <h3 className="font-medium text-sm">Speed</h3>
            <Separator />
            {speedOptions.map((option) => (
              <Button
                key={option}
                variant={speed === option ? "default" : "ghost"}
                onClick={() => setSpeed(option)}
                className={cn(
                  "transition-all",
                  speed === option &&
                    "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {option}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <Frame className="h-4 w-4" />
            <span className="sr-only">Frames</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent side={"right"} className="w-[100%] mr-4">
          <ScrollArea className="h-[180px]">
            <div className="grid gap-2">
              <h3 className="font-medium text-sm">Frame Rate</h3>
              <Separator />
              {frameOptions.map((option) => (
                <Button
                  key={option.rate}
                  variant={frameRate === option.rate ? "default" : "ghost"}
                  onClick={() => setFrameRate(option.rate)}
                  className={cn(
                    "justify-start transition-all",
                    frameRate === option.rate &&
                      "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  <span>{option.rate} fps</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    Max {option.maxDuration}s
                  </span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 rounded-full transition-all hover:bg-primary hover:text-primary-foreground"
      >
        <Upload className="h-4 w-4" />
        <span className="sr-only">Re-upload</span>
      </Button>
    </>
  );
}
