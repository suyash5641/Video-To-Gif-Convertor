"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setVideoState } from "@/lib/slice/videoSlice";
import { base64ToBlob, convertFileToBase64 } from "@/lib/base64";
import { CircularProgress } from "./CircularProgress";
import { UploadVideoCloudinary } from "@/app/action";
import UploadVideo from "./UploadVideo";
const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET ?? "";

const VideoToGifConverter = () => {
  const videoState = useSelector((state: RootState) => state.video);
  const video = videoState?.file;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  function getVideoFrames(
    videoUrl: string,
    frameCount: number,
    videoDuration: number
  ): string[] {
    const frames: string[] = [];
    for (let i = 0; i < frameCount; i++) {
      const timeOffset = (videoDuration / frameCount) * i;
      const frameUrl = `${videoUrl
        .replace("/upload/", `/upload/so_${timeOffset},w_52,h_50/`)
        .replace(".mp4", "")}.jpg`;

      frames.push(frameUrl);
    }
    return frames;
  }

  const extractFrames = useCallback(
    async (duration: number, video: string) => {
      setIsLoading(true);
      const blob = base64ToBlob(video, "video/mp4");
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", uploadPreset);
      formData.append("resource_type", "video");
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 5 : prev));
      }, 2000);
      const response = await UploadVideoCloudinary(formData);

      if (response) {
        const extractedFrames = await getVideoFrames(response, 18, duration);
        dispatch(setVideoState({ frames: extractedFrames }));
      }
      clearInterval(interval);
      setProgress(100);
      setIsLoading(false);
    },
    [dispatch]
  );

  const handleVideoUpload = async (file: File) => {
    if (file) {
      const base64 = await convertFileToBase64(file);
      dispatch(setVideoState({ file: base64 }));
      const videoElement = document.createElement("video");
      videoElement.src = base64;
      videoElement.onloadedmetadata = () => {
        dispatch(
          setVideoState({
            duration: videoElement.duration,
            range: [0, videoElement.duration],
          })
        );

        if (videoElement?.duration)
          extractFrames(videoElement?.duration, base64);
        if (videoRef.current) {
          videoRef.current.src = URL.createObjectURL(file);
        }
      };
    }
  };

  const currentTime = useSelector(
    (state: RootState) => state.video.currentTime
  );

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

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
