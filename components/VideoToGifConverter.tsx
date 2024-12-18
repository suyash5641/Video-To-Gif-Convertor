"use client";
import { Card } from "@/components/ui/card";
import { CircularProgress } from "./CircularProgress";
import UploadVideo from "./UploadVideo";
import { RootState } from "@/lib/store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "@/lib/utils";

const VideoToGifConverter = () => {
  const dispatch = useDispatch();
  const videoState = useSelector((state: RootState) => state.video);
  const video = videoState?.file;
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = videoState?.progress;
  const loading = videoState?.loading;

  const currentTime = useSelector(
    (state: RootState) => state.video.currentTime
  );

  const handleVideoUpload = async (file: File) => {
    await uploadVideo({ file, dispatch });
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    if (videoRef.current && video) {
      videoRef.current.src = video;
    }
  }, [video]);

  return (
    <div className="min-h-[calc(100vh_-_150px)] bg-lightbluecustom p-4 px-0 md:p-8 md:px-0 flex flex-col justify-center items-center gap-6 ">
      <Card
        className={
          video
            ? "max-w-4xl mx-auto p-2 sm:p-4 w-[82%] xs:w-[75%] sm:w-[60%] md:w-[50%] border-0"
            : "max-w-4xl mx-auto p-2 sm:p-4 w-[82%] xs:w-[75%] sm:w-[45%] md:w-[40%]"
        }
      >
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
                playsInline
                className="w-full h-full object-contain"
                controls={!loading}
              >
                <source src={video} />
              </video>
            ) : (
              <UploadVideo
                onVideoSelect={handleVideoUpload}
                buttonText="Upload Video"
              />
            )}
            {loading && <CircularProgress progress={progress} />}
          </div>
        </div>
      </Card>
    </div>
  );
};
export default VideoToGifConverter;
