import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GifState {
  gifUrl: string | null;
  isGifGenerating: boolean;
}

const initialState: GifState = {
  gifUrl: null,
  isGifGenerating: false,
};

const gifSlice = createSlice({
  name: "gif",
  initialState,
  reducers: {
    setGifState(state, action: PayloadAction<Partial<GifState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setGifState } = gifSlice.actions;
export default gifSlice.reducer;
