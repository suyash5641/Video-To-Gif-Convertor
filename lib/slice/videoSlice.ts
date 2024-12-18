import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UploadVideoCloudinary } from "../utils";
import { base64ToBlob } from "../base64";
import { RootState } from "../store";

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
};

interface ExtractFramesResponse {
  success: boolean;
  url?: string;
  error?: boolean;
  errorMessage?: string;
}

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

export const extractFrames = createAsyncThunk<
  ExtractFramesResponse,
  { duration: number; video: string },
  { rejectValue: ExtractFramesErrorResponse }
>(
  "video/extractFrames",
  async (
    { duration, video }: { duration: number; video: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const blob = base64ToBlob(video, "video/mp4");
      const formData = new FormData();
      formData.append("file", blob);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? ""
      );
      formData.append("resource_type", "video");

      const response = await UploadVideoCloudinary(formData);

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

      if (response.success && response?.url) {
        const frames = getVideoFrames(response?.url, 18, duration);
        dispatch(setVideoState({ frames, progress: 100 }));
        return { success: true, url: response?.url };
      } else {
        const errorMessage = response?.message || "Failed to upload video";
        throw new Error(errorMessage);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload video";
      return rejectWithValue({ error: true, errorMessage, success: false });
    }
  }
);

function getVideoFrames(
  videoUrl: string,
  frameCount: number,
  videoDuration: number
): string[] {
  const frames: string[] = [];
  for (let i = 0; i < frameCount; i++) {
    const timeOffset = (videoDuration / frameCount) * i;
    const frameUrl = `${videoUrl
      .replace("/upload/", `/upload/so_${timeOffset},w_52,h_50/`)
      .replace(".mp4", "")}.jpg`;

    frames.push(frameUrl);
  }
  return frames;
}

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
    builder
      .addCase(extractFrames.pending, (state) => {
        state.loading = true;
        state.progress = 0;
      })
      .addCase(extractFrames.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(extractFrames.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setVideoState, resetProgress, setLoading } = videoSlice.actions;

export default videoSlice.reducer;
