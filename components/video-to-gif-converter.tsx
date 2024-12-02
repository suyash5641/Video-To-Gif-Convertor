"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { VideoTimeline } from "./video-timeline";

export default function VideoToGifConverter() {
  const [video, setVideo] = useState<File | null>(null);
  // const [startTime, setStartTime] = useState(0);
  // const [endTime, setEndTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(file);
      }
    }
  };

  const handleTimeChange = (
    start: number,
    end: number,
    slider: "left" | "right"
  ) => {
    if (videoRef.current) {
      if (slider === "left") {
        // Play video from start to end
        videoRef.current.currentTime = start;
        // videoRef.current.play();
      } else if (slider === "right") {
        // Play video from end to start
        videoRef.current.currentTime = end;
        // videoRef.current.play();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="grid gap-8">
          <div className="text-center">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
              id="video-upload"
            />
            <label htmlFor="video-upload">
              <Button variant="outline" className="w-full max-w-sm" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Video
                </span>
              </Button>
            </label>
          </div>

          <div className="aspect-video bg-black/5 rounded-lg overflow-hidden relative">
            {video ? (
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                controls
              >
                <source src={URL.createObjectURL(video)} type={video.type} />
              </video>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Upload a video to preview
              </div>
            )}
          </div>

          {video && (
            <VideoTimeline video={video} onTimeChange={handleTimeChange} />
          )}
        </div>
      </Card>
    </div>
  );
}
