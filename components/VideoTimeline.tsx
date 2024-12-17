"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { CustomSlider } from "./ui/customslider";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { setVideoState } from "@/lib/slice/videoSlice";

interface VideoTimelineProps {
  frames: string[];
}

const VideoTimeline: React.FC<VideoTimelineProps> = ({ frames }) => {
  const videoState = useSelector((state: RootState) => state.video);
  const dispatch = useDispatch();
  const duration = videoState?.duration;
  const videoRange = videoState?.range;
  const [value, setValue] = useState<number[]>([0]);

  const handleRangeChange = (value: number[]) => {
    const [newStartTime, newEndTime] = value;
    const currentTime =
      newStartTime !== videoRange[0] ? newStartTime : newEndTime;
    dispatch(
      setVideoState({
        range: [newStartTime, newEndTime],
        currentTime: currentTime,
      })
    );
  };

  const handleChange = (value: number[]) => {
    const [newValue] = value;
    dispatch(setVideoState({ currentTime: newValue }));
    setValue([newValue]);
  };

  const getActiveFrameIndex = (time: number) => {
    return Math.floor((time / duration) * frames.length);
  };

  return (
    <div className="fixed bottom-[40px]  z-10  border-t md:relative md:bottom-auto bg-customdarkbackground w-full space-y-4 flex items-center justify-start">
      {!frames.length ? (
        <>
          <div className="w-full space-y-4 flex items-center justify-center" />
        </>
      ) : (
        <>
          <div className="relative  space-y-4  rounded-lg p-4 overflow-scroll py-[34px] md:h-[149px]">
            <div className="relative pl-[28px] w-full">
              <div className="flex gap-1  mx-2 ml-0">
                <div className="flex gap-1 transition-transform duration-200 ">
                  {frames.map((frame, index) => (
                    <div
                      key={index}
                      className={`relative flex-none transition-opacity duration-200 ${
                        index >= getActiveFrameIndex(videoRange[0]) &&
                        index <= getActiveFrameIndex(videoRange[1])
                          ? "opacity-100"
                          : "opacity-40"
                      }`}
                    >
                      <Image
                        src={frame}
                        alt={`Frame ${index + 1}`}
                        width={52}
                        height={50}
                        className="rounded-sm object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute w-[1008px] top-[20px] left-4 px-2">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <CustomSlider
                    value={value}
                    max={duration}
                    step={0.01}
                    onValueChange={handleChange}
                    className="absolute left-2 left-0 top-0 z-20"
                  />
                </div>
              </div>
              <div className="absolute w-[1012px] top-[24px] left-4 px-2">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <Slider
                    value={videoRange}
                    max={duration}
                    step={0.01}
                    minStepsBetweenThumbs={40}
                    onValueChange={handleRangeChange}
                    className="absolute left-2 right-2 top-0 z-40"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default VideoTimeline;
