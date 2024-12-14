"use client";

import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
// import { VideoTimeline } from "./VideoTimeline";
import UploadVideo from "./UploadVideo";
// import GenerateGif from "./GenerateGif";

// import { Navbar } from "./Navbar";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setVideoState } from "@/lib/slice/videoSlice";
import { convertFileToBase64 } from "@/lib/base64";

const VideoToGifConverter = () => {
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

  const handleVideoUpload = async (file: File) => {
    if (file) {
      const base64 = await convertFileToBase64(file);
      dispatch(setVideoState({ file: base64 }));
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
                className="w-full h-full object-contain"
                controls
              >
                <source src={video} />
              </video>
            ) : (
              <UploadVideo
                onVideoSelect={handleVideoUpload}
                buttonText="Upload Video"
              />
            )}
          </div>

          {/* {video && (
            <div className="flex flex-row justify-center gap-4">
              <GenerateGif />
            </div>
          )} */}
        </div>
      </Card>
      {/* {video && <VideoTimeline />} */}
    </div>
  );
};
export default VideoToGifConverter;
