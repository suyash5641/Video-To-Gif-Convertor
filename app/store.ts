import { configureStore } from "@reduxjs/toolkit";
import gifslice from "./slice/gifSlice";
import videoslice from "./slice/videoSlice";

// export const videoStore = configureStore({
//   reducer: {
//     gif: gifslice,
//     video: videoslice,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

export const store = () => {
  return configureStore({
    reducer: {
      gif: gifslice,
      video: videoslice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof store>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
