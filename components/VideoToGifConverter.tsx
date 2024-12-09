"use client";

import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { VideoTimeline } from "./VideoTimeline";
import UploadVideo from "./UploadVideo";
import GenerateGif from "./GenerateGif";

import { Navbar } from "./Navbar";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { setVideoState } from "@/app/slice/videoSlice";

export default function VideoToGifConverter() {
  // const [video, setVideo] = useState<File | null>(null);
  const videoState = useSelector((state: RootState) => state.video);
  const video = videoState?.file;
  const videoRef = useRef<HTMLVideoElement>(null);
  // const videoRange = videoState?.range;
  // const [videoRange, setVideoRange] = useState<number[]>([0, 0]);
  // const [gifUrl, setGifUrl] = useState<string | null>(null);
  const dispatch = useDispatch();

  // const handleGifChange = (url: string) => {
  //   setGifUrl(url);
  // };

  const handleVideoUpload = (file: File) => {
    if (file) {
      dispatch(setVideoState({ file: file }));
      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(file);
      }
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
    <div className="min-h-screen bg-lightbluecustom p-4 px-0 md:p-8 md:px-0 flex flex-col justify-center items-center gap-6">
      {/* <motion.div
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
      </motion.div> */}

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
              <GenerateGif />
            </div>
          )}
        </div>
      </Card>
      {video && <VideoTimeline />}

      <Navbar />
    </div>
  );
}
