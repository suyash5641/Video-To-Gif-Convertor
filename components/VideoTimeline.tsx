// "use client";
// import { useEffect, useState, useCallback } from "react";
// import { Slider } from "@/components/ui/slider";
// import Image from "next/image";
// import { Loader2 } from "lucide-react";
// import { CustomSlider } from "./ui/customslider";

// interface VideoTimelineProps {
//   video: File;
//   onTimeChange: (
//     startTime: number,
//     endTime: number,
//     slider: "left" | "right"
//   ) => void;
//   handleChangeVideoRange: (startRange: number, endRange: number) => void;
//   videoRange: number[];
// }

// export function VideoTimeline({
//   video,
//   onTimeChange,
//   handleChangeVideoRange,
//   videoRange,
// }: VideoTimelineProps) {
//   const [frames, setFrames] = useState<string[]>([]);

//   const [loading, setIsLoading] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [value, setValue] = useState<number[]>([0]);

//   // const [videoRange, setVideoRange] = useState<number[]>([0, 0]);

//   const extractFrames = useCallback(
//     async (duration: number) => {
//       setIsLoading(true);
//       const videoUrl = URL.createObjectURL(video);
//       const videoElement = document.createElement("video");
//       videoElement.src = videoUrl;

//       await new Promise<void>((resolve) => {
//         videoElement.onloadedmetadata = () => resolve();
//       });

//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");
//       const frameCount = 10;
//       const frameUrls: string[] = [];

//       canvas.width = 160;
//       canvas.height = 90;

//       for (let i = 0; i < frameCount; i++) {
//         const time = (duration / frameCount) * i;
//         videoElement.currentTime = time;

//         await new Promise<void>((resolve) => {
//           videoElement.onseeked = () => resolve();
//         });

//         context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
//         frameUrls.push(canvas.toDataURL());
//       }

//       setFrames(frameUrls);
//       setIsLoading(false);
//       URL.revokeObjectURL(videoUrl);
//     },
//     [video]
//   );

//   const handleRangeChange = (value: number[]) => {
//     const [newStartTime, newEndTime] = value;
//     if (newStartTime !== videoRange[0]) {
//       onTimeChange(newStartTime, videoRange[1], "left");
//     }

//     if (newEndTime !== videoRange[1]) {
//       onTimeChange(videoRange[0], newEndTime, "right");
//     }
//     // setVideoRange([newStartTime, newEndTime]);
//     handleChangeVideoRange(newStartTime, newEndTime);
//   };

//   const handleChange = (value: number[]) => {
//     const [newValue] = value;
//     onTimeChange(newValue, videoRange[1], "left");
//     setValue([newValue]);
//   };

//   const getActiveFrameIndex = (time: number) => {
//     return Math.floor((time / duration) * frames.length);
//   };

//   useEffect(() => {
//     const videoElement = document.createElement("video");
//     videoElement.src = URL.createObjectURL(video);
//     videoElement.onloadedmetadata = () => {
//       setDuration(videoElement.duration);
//       // setVideoRange([0, videoElement.duration]);
//       handleChangeVideoRange(0, videoElement.duration);
//       if (videoElement?.duration) extractFrames(videoElement?.duration);
//     };

//     return () => URL.revokeObjectURL(videoElement.src);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [video]);

//   return (
//     <>
//       {loading || !frames.length ? (
//         <div className="w-full space-y-4 flex items-center justify-center">
//           <Loader2 className="animate-spin text-white" size={32} />
//         </div>
//       ) : (
//         <div className="relative w-fit space-y-4 bg-gray-900/95 rounded-lg p-4">
//           <>
//             <div className="relative">
//               <div className="flex gap-1 overflow-hidden mx-2">
//                 <div className="flex gap-1 transition-transform duration-200">
//                   {frames.map((frame, index) => (
//                     <div
//                       key={index}
//                       className={`relative flex-none transition-opacity duration-200 ${
//                         index >= getActiveFrameIndex(videoRange[0]) &&
//                         index <= getActiveFrameIndex(videoRange[1])
//                           ? "opacity-100"
//                           : "opacity-40"
//                       }`}
//                     >
//                       <Image
//                         src={frame}
//                         alt={`Frame ${index + 1}`}
//                         width={100}
//                         height={50}
//                         className="rounded-sm object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Slider */}
//             <div className="relative px-2 mt-2">
//               <div className="absolute inset-x-2 top-1/2 h-1 -translate-y-1/2 bg-gray-700 rounded-full" />
//               <div className="flex justify-between text-xs text-gray-400 mb-2">
//                 <Slider
//                   value={videoRange}
//                   max={duration}
//                   step={0.01}
//                   minStepsBetweenThumbs={40}
//                   onValueChange={handleRangeChange}
//                   className="absolute left-2 right-2 top-0"
//                 />
//               </div>
//             </div>
//           </>
//         </div>
//       )}
//     </>
//   );
// }
"use client";
import { useEffect, useState, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { CustomSlider } from "./ui/customslider";

interface VideoTimelineProps {
  video: File;
  onTimeChange: (
    startTime: number,
    endTime: number,
    slider: "left" | "right"
  ) => void;
  handleChangeVideoRange: (startRange: number, endRange: number) => void;
  videoRange: number[];
}

export function VideoTimeline({
  video,
  onTimeChange,
  handleChangeVideoRange,
  videoRange,
}: VideoTimelineProps) {
  const [frames, setFrames] = useState<string[]>([]);

  const [loading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [value, setValue] = useState<number[]>([0]);

  const extractFrames = useCallback(
    async (duration: number) => {
      setIsLoading(true);
      const videoUrl = URL.createObjectURL(video);
      const videoElement = document.createElement("video");
      videoElement.src = videoUrl;

      await new Promise<void>((resolve) => {
        videoElement.onloadedmetadata = () => resolve();
      });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const frameCount = 10;
      const frameUrls: string[] = [];

      canvas.width = 160;
      canvas.height = 90;

      for (let i = 0; i < frameCount; i++) {
        const time = (duration / frameCount) * i;
        videoElement.currentTime = time;

        await new Promise<void>((resolve) => {
          videoElement.onseeked = () => resolve();
        });

        context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        frameUrls.push(canvas.toDataURL());
      }

      setFrames(frameUrls);
      setIsLoading(false);
      URL.revokeObjectURL(videoUrl);
    },
    [video]
  );

  const handleRangeChange = (value: number[]) => {
    const [newStartTime, newEndTime] = value;
    if (newStartTime !== videoRange[0]) {
      onTimeChange(newStartTime, videoRange[1], "left");
    }

    if (newEndTime !== videoRange[1]) {
      onTimeChange(videoRange[0], newEndTime, "right");
    }
    handleChangeVideoRange(newStartTime, newEndTime);
  };

  const handleChange = (value: number[]) => {
    const [newValue] = value;
    onTimeChange(newValue, videoRange[1], "left");
    setValue([newValue]);
  };

  const getActiveFrameIndex = (time: number) => {
    return Math.floor((time / duration) * frames.length);
  };

  useEffect(() => {
    const videoElement = document.createElement("video");
    videoElement.src = URL.createObjectURL(video);
    videoElement.onloadedmetadata = () => {
      setDuration(videoElement.duration);
      handleChangeVideoRange(0, videoElement.duration);
      if (videoElement?.duration) extractFrames(videoElement?.duration);
    };

    return () => URL.revokeObjectURL(videoElement.src);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

  return (
    <>
      {loading || !frames.length ? (
        <div className="w-full space-y-4 flex items-center justify-center">
          <Loader2 className="animate-spin text-white" size={32} />
        </div>
      ) : (
        <div className="relative w-fit space-y-4 bg-gray-900/95 rounded-lg p-4">
          <div className="relative">
            <div className="flex gap-1 overflow-hidden mx-2">
              <div className="flex gap-1 transition-transform duration-200">
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
                      width={100}
                      height={50}
                      className="rounded-sm object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute w-full top-[28px] px-2">
              {/* Adjusted position of the slider */}

              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <CustomSlider
                  value={value}
                  max={videoRange[1]}
                  step={0.01}
                  onValueChange={handleChange}
                  className="absolute left-2 right-2 top-0 z-20"
                />
              </div>
            </div>
          </div>

          <div className="relative px-2 mt-2">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <Slider
                value={videoRange}
                max={duration}
                step={0.01}
                minStepsBetweenThumbs={40}
                onValueChange={handleRangeChange}
                className="absolute left-2 right-2 top-0 z-20"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
