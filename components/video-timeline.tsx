"use client";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface VideoTimelineProps {
  video: File;
  onTimeChange: (
    startTime: number,
    endTime: number,
    slider: "left" | "right"
  ) => void;
}

export function VideoTimeline({ video, onTimeChange }: VideoTimelineProps) {
  const [frames, setFrames] = useState<string[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameContainerRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState<number[]>([0, 0]);

  useEffect(() => {
    const videoElement = document.createElement("video");
    videoElement.src = URL.createObjectURL(video);
    console.log(videoElement);
    videoElement.onloadedmetadata = () => {
      setDuration(videoElement.duration);
      setEndTime(videoElement.duration);
      setRange([0, videoElement.duration]);
    };
    return () => URL.revokeObjectURL(videoElement.src);
  }, [video]);

  useEffect(() => {
    const extractFrames = async () => {
      const videoUrl = URL.createObjectURL(video);
      const videoElement = document.createElement("video");
      videoElement.src = videoUrl;

      await new Promise((resolve) => {
        videoElement.onloadedmetadata = resolve;
      });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const frameCount = 10;
      const frameUrls: string[] = [];

      canvas.width = 160;
      canvas.height = 90;

      for (let i = 0; i < frameCount; i++) {
        const time = (duration / frameCount) * i;
        videoElement.currentTime = time;

        await new Promise((resolve) => {
          videoElement.onseeked = resolve;
        });

        context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        frameUrls.push(canvas.toDataURL());
      }

      setFrames(frameUrls);
      URL.revokeObjectURL(videoUrl);
    };

    if (duration > 0) {
      extractFrames();
    }
  }, [video, duration]);

  // const handleStartTimeChange = (value: number[]) => {
  //   const newStartTime = Math.min(value[0], endTime - 0.1);
  //   setStartTime(newStartTime);
  //   onTimeChange(newStartTime, endTime);
  // };

  // const handleEndTimeChange = (value: number[]) => {
  //   const newEndTime = Math.max(value[0], startTime + 0.1);
  //   setEndTime(newEndTime);
  //   onTimeChange(startTime, newEndTime);
  // };

  const handleRangeChange = (value: number[]) => {
    const [newStartTime, newEndTime] = value;
    if (newStartTime !== range[0]) {
      setStartTime(newStartTime); // Update start time
      onTimeChange(newStartTime, endTime, "left");
    }

    // Check if the right slider was moved
    if (newEndTime !== range[1]) {
      setEndTime(newEndTime); // Update end time
      onTimeChange(startTime, newEndTime, "right");
    }
    // setStartTime(newStartTime);
    // setEndTime(newEndTime);
    setRange([newStartTime, newEndTime]);
    // onTimeChange(newStartTime, newEndTime);
  };

  const handleScroll = (direction: "left" | "right") => {
    if (frameContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      const newPosition = scrollPosition + scrollAmount;
      const maxScroll =
        frameContainerRef.current.scrollWidth -
        frameContainerRef.current.clientWidth;
      setScrollPosition(Math.max(0, Math.min(newPosition, maxScroll)));
    }
  };

  const getActiveFrameIndex = (time: number) => {
    return Math.floor((time / duration) * frames.length);
  };

  return (
    <div className="w-full space-y-4 bg-gray-900/95 rounded-lg p-4">
      <div className="relative" ref={containerRef}>
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-gray-800/90 text-white hover:bg-gray-700/90 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div
          ref={frameContainerRef}
          className="flex gap-1 overflow-hidden mx-6"
        >
          <div
            className="flex gap-1 transition-transform duration-200"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {frames.map((frame, index) => (
              <div
                key={index}
                className={`relative flex-none transition-opacity duration-200 ${
                  index >= getActiveFrameIndex(startTime) &&
                  index <= getActiveFrameIndex(endTime)
                    ? "opacity-100"
                    : "opacity-40"
                }`}
              >
                <img
                  src={frame}
                  alt={`Frame ${index + 1}`}
                  // className="w-40 h-[90px] rounded-sm object-cover"
                  className="w-[100px] h-[50px] rounded-sm object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-gray-800/90 text-white hover:bg-gray-700/90 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="relative px-2">
        {/* Time indicators */}
        {/* <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>{formatTime(startTime)}</span>
          <span>{formatTime(endTime)}</span>
        </div> */}

        {/* Track background */}
        <div className="absolute inset-x-2 top-1/2 h-1 -translate-y-1/2 bg-gray-700 rounded-full" />

        {/* Start time slider */}
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <Slider
            value={range}
            max={duration}
            step={0.01}
            minStepsBetweenThumbs={40}
            onValueChange={handleRangeChange}
            className="absolute left-2 right-2 top-0"
          />
        </div>
      </div>
    </div>
  );
}

// function formatTime(seconds: number): string {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = Math.floor(seconds % 60);
//   const milliseconds = Math.floor((seconds % 1) * 1000);
//   return `${minutes}:${remainingSeconds
//     .toString()
//     .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0").slice(0, 2)}`;
// }
