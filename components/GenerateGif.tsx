"use client";
import { useCallback } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { setGifState } from "@/app/slice/gifSlice";

const baseURL = process.env.NEXT_PUBLIC_FFMPEG_URL;
const ffmpeg = new FFmpeg();

const GenerateGif = () => {
  const videoState = useSelector((state: RootState) => state.video);

  const gifState = useSelector((state: RootState) => state.gif);
  const dispatch = useDispatch();

  const videoRange = videoState?.range;
  const video = videoState?.file;
  const isGifGenerating = gifState?.isGifGenerating;
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
      console.log(gifUrl);

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

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button
          onClick={generateGif}
          disabled={isGifGenerating}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          {isGifGenerating ? "Generating..." : "Generate GIF"}
        </Button>
      </div>
    </div>
  );
};

export default GenerateGif;
