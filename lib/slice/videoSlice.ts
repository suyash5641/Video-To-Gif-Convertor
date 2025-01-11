import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getVideoFrames } from "../utils";
import { data } from "../navbardata";
import { CloudinarySignature } from "@/app/action";

interface FrameRateOption {
  rate: number;
  maxDuration: number;
}

interface VideoState {
  file: string | null;
  range: number[];
  duration: number;
  speed: string;
  frameRate: FrameRateOption | null;
  currentTime: number;
  frames: string[];
  progress: number;
  loading: boolean;
  videoUrl: string | null;
  fileType: string;
}

const initialState: VideoState = {
  file: null,
  range: [0, 0],
  duration: 0,
  speed: "1x",
  frameRate: { rate: 33, maxDuration: 10 },
  currentTime: 0,
  frames: [],
  progress: 0,
  loading: false,
  videoUrl: null,
  fileType: "",
};

interface ExtractFramesResponse {
  success: boolean;
  url?: string;
  error?: boolean;
  errorMessage?: string;
}

interface ExtractFramesErrorResponse {
  success: false;
  error: true;
  errorMessage: string;
}

export const uploadVideoToCloudinary = createAsyncThunk<
  {
    success: boolean;
    url?: string;
    message?: string;
    duration?: number;
    format?: string;
  },
  { formData: FormData | null; signal: AbortSignal },
  { rejectValue: { success: false; message: string } }
>(
  "video/uploadToCloudinary",
  async ({ formData, signal }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData,
          signal,
        }
      );

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          url: data.secure_url,
          duration: data?.duration,
          format: data?.format,
        };
      } else {
        const errorMessage = data.error?.message || "Failed to upload video";
        console.error("Upload Error:", errorMessage);
        return rejectWithValue({ success: false, message: errorMessage });
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return {
          success: false,
          message: "Upload aborted",
        };
      }
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return rejectWithValue({ success: false, message: errorMessage });
    }
  }
);

export const extractFrames = createAsyncThunk<
  ExtractFramesResponse,
  { signal: AbortSignal; file: File },
  { rejectValue: ExtractFramesErrorResponse }
>(
  "video/extractFrames",
  async ({ signal, file }, { dispatch, getState, rejectWithValue }) => {
    try {
      const { signature, timestamp } = await CloudinarySignature();
      if (!signature || !timestamp) throw new Error("Some Error Occured");
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "api_key",
        process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
      );
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      const interval = setInterval(() => {
        const state = getState() as RootState;
        const currentProgress = state.video.progress;
        const updatedProgress =
          currentProgress < 90 ? currentProgress + 5 : currentProgress;
        dispatch(setVideoState({ progress: updatedProgress }));

        if (updatedProgress >= 90) {
          clearInterval(interval);
        }
      }, 2000);

      const response = await dispatch(
        uploadVideoToCloudinary({ formData, signal })
      ).unwrap();

      if (
        response.success &&
        response?.url &&
        response?.duration &&
        response?.format
      ) {
        const frames = getVideoFrames(
          response?.url,
          18,
          response?.duration,
          response?.format
        );
        dispatch(
          setVideoState({
            frames,
            progress: 100,
            videoUrl: response?.url,
            fileType: response?.format,
            duration: response?.duration,
            file: response?.url,
            range: [
              0,
              Math.min(response?.duration, data?.frameOptions[8]?.maxDuration),
            ],
          })
        );
        return { success: true, url: response?.url };
      } else {
        clearInterval(interval);
        const errorMessage = response?.message || "Failed to upload video";
        throw new Error(errorMessage);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload video";
      return rejectWithValue({ error: true, errorMessage, success: false });
    } finally {
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoState(state, action: PayloadAction<Partial<VideoState>>) {
      return { ...state, ...action.payload };
    },
    resetProgress(state) {
      state.progress = 0;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(extractFrames.pending, (state) => {
      state.progress = 0;
    });
  },
});

export const { setVideoState, resetProgress, setLoading } = videoSlice.actions;

export default videoSlice.reducer;
