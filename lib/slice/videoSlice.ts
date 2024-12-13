import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FrameRateOption {
  rate: number;
  maxDuration: number;
}

interface VideoState {
  file: File | null;
  range: number[];
  duration: number;
  speed: string;
  frameRate: FrameRateOption | null;
  currentTime: number;
}

const initialState: VideoState = {
  file: null,
  range: [0, 0],
  duration: 0,
  speed: "1x",
  frameRate: { rate: 33, maxDuration: 10 },
  currentTime: 0,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoState(state, action: PayloadAction<Partial<VideoState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setVideoState } = videoSlice.actions;

export default videoSlice.reducer;
