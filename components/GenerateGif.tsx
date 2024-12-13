"use client";
import { useCallback } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { setGifState } from "@/lib/slice/gifSlice";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

const baseURL = process.env.NEXT_PUBLIC_FFMPEG_URL;
const ffmpeg = new FFmpeg();

type ConversionParams = {
  speed?: number; // e.g., 0.5x, 1.5x, etc.
  frameRate?: number; // Target frame rate
  inputFile: string; // Input video file path
  outputFile: string; // Output GIF file path
  startTime?: number; // Start time for the GIF
  duration?: number; // Duration of the GIF
};

const constructFFmpegCommand = ({
  speed,
  frameRate,
  inputFile,
  outputFile,
  startTime,
  duration,
}: ConversionParams): string[] => {
  const argsMap: Record<string, string[]> = {
    input: ["-i", inputFile],
    startTime: startTime ? ["-ss", String(startTime)] : [],
    duration: duration ? ["-t", String(duration)] : [],
    videoFilter: ["-vf", "fps=10,scale=320:-1:flags=lanczos"],
    speed: speed ? ["-filter:v", `setpts=${1 / speed}*PTS`] : [],
    frameRate: frameRate ? ["-r", String(frameRate)] : [],
    preset: ["-preset", "ultrafast"],
    output: [outputFile],
  };

  return Object.values(argsMap).flat();
};

const GenerateGif = () => {
  const videoState = useSelector((state: RootState) => state.video);

  const gifState = useSelector((state: RootState) => state.gif);
  const dispatch = useDispatch();

  const videoRange = videoState?.range;
  const speed = videoState?.speed;
  const video = videoState?.file;
  const isGifGenerating = gifState?.isGifGenerating;
  const gifUrl = gifState?.gifUrl;

  const { toast } = useToast();

  const generateGif = useCallback(async () => {
    if (!video) return;
    dispatch(setGifState({ isGifGenerating: true }));
    try {
      if (!ffmpeg.loaded) {
        await ffmpeg.load({
          coreURL: `${baseURL}/ffmpeg-core.js`,
          wasmURL: `${baseURL}/ffmpeg-core.wasm`,
        });
      }

      const startTime = videoRange[0];
      const endTime = videoRange[1];
      const duration = endTime - startTime;

      await ffmpeg.writeFile("input.mp4", await fetchFile(video));

      const commandArgs = constructFFmpegCommand({
        speed: Number(speed.split("x")[0]),
        frameRate: 5,

        inputFile: "input.mp4",
        outputFile: "output.gif",
        startTime: startTime,
        duration: duration,
      });

      await ffmpeg.exec(commandArgs);
      // console.log(commandArgs);

      // await ffmpeg.exec([
      //   "-i",
      //   "input.mp4",
      //   "-ss",
      //   `${startTime}`,
      //   "-t",
      //   `${duration}`,
      //   "-vf",
      //   "fps=10,scale=320:-1:flags=lanczos",
      //   "-preset",
      //   "ultrafast",
      //   "output.gif",
      // ]);

      const gifData = await ffmpeg.readFile("output.gif");

      const gifBlob = new Blob([gifData], { type: "image/gif" });
      const gifUrl = URL.createObjectURL(gifBlob);
      const gifSizeInBytes = gifBlob.size;

      // Convert size to KB or MB for readability

      const gifSizeInMB = (gifSizeInBytes / (1024 * 1024)).toFixed(2); // MB
      console.log(gifSizeInMB, "size");
      dispatch(setGifState({ gifUrl }));

      toast({
        title: "GIF Generated",
        description: "Your GIF has been successfully created!",
      });
    } catch (error) {
      console.error("Error generating GIF:", error);
      toast({
        title: "Error",
        description: "Failed to generate GIF. Please try again.",
        variant: "destructive",
      });
    } finally {
      dispatch(setGifState({ isGifGenerating: false }));
    }
  }, [video, dispatch, videoRange, speed, toast]);

  const showGifPreview = () => {
    if (isGifGenerating) {
      return <Skeleton className="h-[125px] w-full rounded-xl" />;
    }
    if (gifUrl) {
      return (
        <div className="h-full w-full gap-2 rounded-xl flex flex-col items-center">
          <div>
            <Image
              src={gifUrl}
              alt="GIF Preview"
              className="max-w-xs rounded-lg shadow-md"
              width={200}
              height={100}
            />
            {/* Download Button */}
          </div>
          <Button asChild variant="secondary">
            <a href={gifUrl} download="output.gif">
              Download GIF
            </a>
          </Button>
        </div>
      );
    }

    return (
      <div className="h-[125px] border bg-card w-full rounded-xl flex flex-col items-center justify-center">
        <p className="text-sm">
          {!video ? "Upload video first" : "Generate Gif to preview"}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      {showGifPreview()}
      <Button
        onClick={generateGif}
        disabled={isGifGenerating || !video}
        className="hover:bg-blue-500/90 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
      >
        {isGifGenerating ? "Generating..." : "Generate GIF"}
      </Button>
    </div>
  );
};

export default GenerateGif;
