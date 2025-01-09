import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { setVideoState, extractFrames, setLoading } from "./slice/videoSlice";
import { AppDispatch } from "./store";

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

    const result = await dispatch(
      extractFrames({
        file: file,
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

export const getVideoFrames = (
  videoUrl: string,
  frameCount: number,
  videoDuration: number,
  fileType: string
): string[] => {
  const frames: string[] = [];
  console.log(videoUrl, `.${fileType}`, "type", fileType);
  for (let i = 0; i < frameCount; i++) {
    const timeOffset = (videoDuration / frameCount) * i;
    const frameUrl = `${videoUrl
      .replace("/upload/", `/upload/so_${timeOffset},w_52,h_50/`)
      .replace(`.${fileType}`, "")}.jpg`;
    console.log(frameUrl, "test");
    frames.push(frameUrl);
  }
  return frames;
};
