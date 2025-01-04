import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { convertFileToBase64 } from "./base64";
import { setVideoState, extractFrames, setLoading } from "./slice/videoSlice";
import { AppDispatch } from "./store";
import { data } from "./navbardata";
// import { data } from "./navbardata";

interface VideoUploadOptions {
  file: File;
  dispatch: AppDispatch;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toast: any;
  signal: AbortSignal;
}

export interface UploadResponse {
  success: boolean;
  url?: string;
  message?: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadVideo = async ({
  file,
  dispatch,
  toast,
  signal,
}: VideoUploadOptions) => {
  if (file) {
    dispatch(setLoading(true));

    const base64 = await convertFileToBase64(file);

    const videoElement = document.createElement("video");
    videoElement.src = base64;

    videoElement.onloadedmetadata = async () => {
      dispatch(
        setVideoState({
          duration: videoElement.duration,
          range: [
            0,
            Math.min(videoElement.duration, data?.frameOptions[8]?.maxDuration),
          ],
          file: base64,
        })
      );

      if (videoElement?.duration) {
        const result = await dispatch(
          extractFrames({
            duration: videoElement.duration,
            video: base64,
            signal,
          })
        );
        if (extractFrames.rejected.match(result)) {
          if (result?.payload?.errorMessage === "Upload aborted")
            dispatch(
              setVideoState({
                file: null,
                range: [0, 0],
                duration: 0,
                progress: 0,
              })
            );
          if (result?.payload?.errorMessage != "Upload aborted")
            toast({
              title: "Error",
              description: result?.payload?.errorMessage,
              variant: "destructive",
            });
        }
        dispatch(setLoading(false));
      }
    };
  }
};

export const getVideoFrames = (
  videoUrl: string,
  frameCount: number,
  videoDuration: number
): string[] => {
  const frames: string[] = [];
  for (let i = 0; i < frameCount; i++) {
    const timeOffset = (videoDuration / frameCount) * i;
    const frameUrl = `${videoUrl
      .replace("/upload/", `/upload/so_${timeOffset},w_52,h_50/`)
      .replace(".mp4", "")}.jpg`;

    frames.push(frameUrl);
  }
  return frames;
};
