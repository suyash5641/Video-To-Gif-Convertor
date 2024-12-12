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

const GenerateGif = () => {
  const videoState = useSelector((state: RootState) => state.video);

  const gifState = useSelector((state: RootState) => state.gif);
  const dispatch = useDispatch();

  const videoRange = videoState?.range;
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

      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-ss",
        `${startTime}`,
        "-t",
        `${duration}`,
        "-vf",
        "fps=10,scale=320:-1:flags=lanczos",
        "-preset",
        "ultrafast",
        "output.gif",
      ]);

      const gifData = await ffmpeg.readFile("output.gif");

      const gifBlob = new Blob([gifData], { type: "image/gif" });
      const gifUrl = URL.createObjectURL(gifBlob);
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
  }, [video, dispatch, videoRange, toast]);

  const showGifPreview = () => {
    if (isGifGenerating) {
      return <Skeleton className="h-[125px] w-full rounded-xl" />;
    }
    if (gifUrl) {
      return (
        <div className="h-full w-full gap-2 rounded-xl flex flex-col">
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
      <div className="h-[125px] w-full rounded-xl flex flex-col items-center justify-center">
        <p>{!video ? "Upload video first" : "Generate Gif to preview"}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      {showGifPreview()}
      <Button
        onClick={generateGif}
        disabled={isGifGenerating || !video}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
      >
        {isGifGenerating ? "Generating..." : "Generate GIF"}
      </Button>
    </div>
  );
};

export default GenerateGif;
