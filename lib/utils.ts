import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { convertFileToBase64 } from "./base64";
import { setLoading, setVideoState, extractFrames } from "./slice/videoSlice";
import { AppDispatch } from "./store";

interface VideoUploadOptions {
  file: File;
  dispatch: AppDispatch;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toast: any;
}

export interface UploadResponse {
  success: boolean;
  url?: string;
  message?: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function UploadVideoCloudinary(
  formData: FormData
): Promise<UploadResponse> {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    if (response.ok) {
      return { success: true, url: data.secure_url };
    } else {
      console.error("Upload Error:", data.error.message);
      throw new Error(data.error.message || "Failed to upload video");
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export const uploadVideo = async ({
  file,
  dispatch,
  toast,
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
          range: [0, videoElement.duration],
          file: base64,
        })
      );

      if (videoElement?.duration) {
        const result = await dispatch(
          extractFrames({
            duration: videoElement.duration,
            video: base64,
          })
        );
        if (extractFrames.rejected.match(result)) {
          toast({
            title: "Error",
            description: result?.payload?.errorMessage,
            variant: "destructive",
          });
        }
      }
    };

    dispatch(setLoading(false));
  }
};
