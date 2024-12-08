"use client";
import { useCallback, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
// import { useGenerateGif } from "./useGenerateGif";

const baseURL = process.env.NEXT_PUBLIC_FFMPEG_URL;
const ffmpeg = new FFmpeg();

interface GenerateUIProps {
  video: File;
  videoRange: number[];
  handleGifChange: (url: string) => void;
}

const GenerateGif = ({
  video,
  videoRange,
  handleGifChange,
}: GenerateUIProps) => {
  const { toast } = useToast();
  // const { setIsGifGenerating, lsGifGenerating, setGifUrl } = useGenerateGif();
  const [lsGifGenerating, setIsGifGenerating] = useState(false);

  const generateGif = useCallback(async () => {
    setIsGifGenerating(true);
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
      handleGifChange(gifUrl);

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
      setIsGifGenerating(false);
    }
  }, [videoRange, video, handleGifChange, toast]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button
          onClick={generateGif}
          disabled={lsGifGenerating}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          {lsGifGenerating ? "Generating..." : "Generate GIF"}
        </Button>
      </div>
    </div>
  );
};

export default GenerateGif;
