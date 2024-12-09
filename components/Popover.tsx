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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setVideoState } from "@/app/slice/videoSlice";
import Image from "next/image";

const speedOptions = ["0.5x", "1x", "1.5x", "2x"];
const frameOptions = [
  { rate: 5, maxDuration: 60 },
  { rate: 10, maxDuration: 30 },
  { rate: 30, maxDuration: 10 },
];

export function PopOver() {
  const videoState = useSelector((state: RootState) => state?.video);
  const gifState = useSelector((state: RootState) => state?.gif);
  const speed = videoState.speed;
  const frameRate = videoState.frameRate;
  const gifUrl = gifState.gifUrl;
  const dispatch = useDispatch();

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
                onClick={() => dispatch(setVideoState({ speed: option }))}
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
                  onClick={() =>
                    dispatch(setVideoState({ frameRate: option?.rate }))
                  }
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <Gauge className="h-4 w-4" />
            <span className="sr-only">Preview Gif</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent side={"right"} className="w-[100%] mr-4">
          <div className="grid gap-2">
            <h3 className="font-medium text-sm">Preview Gif</h3>
            <Separator />
            <div>
              {gifUrl && (
                <>
                  <div>
                    <Image
                      src={gifUrl}
                      alt="GIF Preview"
                      className="max-w-xs rounded-lg shadow-md"
                      width={100}
                      height={100}
                    />
                    {/* Download Button */}
                  </div>
                  <Button asChild variant="secondary">
                    <a href={gifUrl} download="output.gif">
                      Download GIF
                    </a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
