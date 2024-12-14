import { configureStore } from "@reduxjs/toolkit";
import gifslice from "./slice/gifSlice";
import videoslice from "./slice/videoSlice";

export const store = () => {
  return configureStore({
    reducer: {
      gif: gifslice,
      video: videoslice,
    },
  });
};

export type AppStore = ReturnType<typeof store>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
