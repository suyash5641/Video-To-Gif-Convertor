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

// Async action for extracting frames
export const extractFrames = createAsyncThunk(
  "video/extractFrames",
  async (
    { duration, video }: { duration: number; video: string },
    { dispatch, getState }
  ) => {
    const blob = base64ToBlob(video, "video/mp4");
    const formData = new FormData();
    formData.append("file", blob);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? ""
    );
    formData.append("resource_type", "video");

    const interval = setInterval(() => {
      // Access the current state (if needed, you can get the latest state using a selector or useSelector in the component)
      const state = getState() as RootState;
      const currentProgress = state.video.progress;

      // Update progress
      const updatedProgress =
        currentProgress < 90 ? currentProgress + 5 : currentProgress;

      // Dispatch the updated progress
      dispatch(setVideoState({ progress: updatedProgress }));

      // Clear interval if progress reaches 90
      if (updatedProgress >= 90) {
        clearInterval(interval);
      }
    }, 2000);

    try {
      const response = await UploadVideoCloudinary(formData);
      if (response) {
        const frames = getVideoFrames(response, 18, duration);
        dispatch(setVideoState({ frames, progress: 100 }));
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to upload video.");
    } finally {
      clearInterval(interval);
    }
  }
);

// Helper function to get video frames
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
