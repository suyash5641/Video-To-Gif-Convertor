"use client";
import { useCallback, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ffmpeg = new FFmpeg();

interface GenerateUIProps {
  video: File;
  videoRange: number[];
}

const GenerateGif = ({ video, videoRange }: GenerateUIProps) => {
  const [gifUrl, setGifUrl] = useState<string | null>(null);

  const [loading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const generateGif = useCallback(async () => {
    setIsLoading(true);

    try {
      if (!ffmpeg.loaded) {
        await ffmpeg.load();
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
        "output.mp4",
      ]);

      // Generate the GIF for download
      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-ss",
        `${startTime}`,
        "-t",
        `${duration}`,
        "-vf",
        "fps=10,scale=320:-1:flags=lanczos",
        "output.gif",
      ]);

      const videoData = await ffmpeg.readFile("output.mp4");
      const gifData = await ffmpeg.readFile("output.gif");
      const videoBlob = new Blob([videoData], { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoUrl);
      const gifBlob = new Blob([gifData], { type: "image/gif" });
      const gifUrl = URL.createObjectURL(gifBlob);
      setGifUrl(gifUrl);

      toast({
        title: "GIF Generated",
        description: "Your GIF has been successfully created!",
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error generating GIF:", error);
      toast({
        title: "Error",
        description: "Failed to generate GIF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [video, videoRange, toast]);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button
          onClick={generateGif}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          {loading ? "Generating..." : "Generate GIF"}
        </Button>
      </div>

      {/* Modal */}
      {gifUrl && (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>GIF Preview</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              {/* Video Preview */}
              <video
                src={videoUrl}
                controls
                className="w-full max-w-md border rounded"
              />
              {/* Download Button */}
              <Button asChild variant="secondary">
                <a href={gifUrl} download="output.gif">
                  Download GIF
                </a>
              </Button>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closeModal}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default GenerateGif;
