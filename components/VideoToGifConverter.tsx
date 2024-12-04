"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { VideoTimeline } from "./VideoTimeline";
import UploadVideo from "./UploadVideo";
import GenerateGif from "./GenerateGif";
import { fadeInUp } from "@/app/utils/animation";
import { motion } from "framer-motion";
// import { DummyTimeline } from "./DummyTimeline";

export default function VideoToGifConverter() {
  const [video, setVideo] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoRange, setVideoRange] = useState<number[]>([0, 0]);

  const handleChangeVideoRange = (startRange: number, endRange: number) => {
    setVideoRange([startRange, endRange]);
  };

  const handleVideoUpload = (file: File) => {
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
        videoRef.current.currentTime = start;
      } else if (slider === "right") {
        videoRef.current.currentTime = end;
      }
    }
  };

  return (
    <div className="min-h-screen bg-lightbluecustom p-4 md:p-8 flex flex-col justify-center items-center gap-6">
      <motion.div
        className="max-w-3xl mx-auto text-center space-y-8"
        variants={fadeInUp}
      >
        <motion.p
          className="text-2xl md:text-4xl font-extrabold text-gray-800 tracking-tight leading-tight"
          variants={fadeInUp}
        >
          Transform Your Videos into{" "}
          <span className="text-violet-600">Stunning GIFs</span>
        </motion.p>
      </motion.div>
      {/* <motion.p
        // className="text-xl md:text-2xl text-gray-600 font-light"
        className="text-center text-sm sm:text-base md:text-2xl text-gray-600 font-light"
        variants={fadeInUp}
      >
        Video to GIF Converter
      </motion.p> */}
      <Card className="max-w-4xl mx-auto p-2 sm:p-4 w-full xs:w-[100%] sm:w-[80%] md:w-[50%]">
        <div className="grid gap-8">
          <div
            className={
              video
                ? "aspect-video bg-black/5 rounded-lg overflow-hidden relative flex flex-col justify-center items-center"
                : "aspect-video bg-black/5 rounded-lg overflow-hidden relative flex flex-col justify-center items-center border-4 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
            }
          >
            {video ? (
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                controls
              >
                <source src={URL.createObjectURL(video)} type={video.type} />
              </video>
            ) : (
              <UploadVideo
                onVideoSelect={handleVideoUpload}
                buttonText="Upload Video"
              />
            )}
          </div>

          {video && (
            <div className="flex flex-row justify-center gap-4">
              <UploadVideo onVideoSelect={handleVideoUpload} buttonText="" />
              <GenerateGif video={video} videoRange={videoRange} />
            </div>
          )}

          {/* {video && (
            <VideoTimeline
              video={video}
              onTimeChange={handleTimeChange}
              handleChangeVideoRange={handleChangeVideoRange}
              videoRange={videoRange}
            />
          )}
          {video && <GenerateGif video={video} videoRange={videoRange} />} */}
        </div>
      </Card>
      {video && (
        <VideoTimeline
          video={video}
          onTimeChange={handleTimeChange}
          handleChangeVideoRange={handleChangeVideoRange}
          videoRange={videoRange}
        />
      )}
      {/* {video && <GenerateGif video={video} videoRange={videoRange} />} */}
    </div>
  );
}
