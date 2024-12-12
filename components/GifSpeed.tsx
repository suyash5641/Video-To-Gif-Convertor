"use client";
import { useDispatch, useSelector } from "react-redux";

import { setVideoState } from "@/lib/slice/videoSlice";
import { RootState } from "@/lib/store";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { data } from "@/lib/navbardata";

export const GifSpeed = () => {
  const dispatch = useDispatch();
  const videoState = useSelector((state: RootState) => state.video);
  const gifSpeed = videoState?.speed;

  return (
    <div className="flex flex-col justify-center">
      <p className="text-base"> Speed</p>
      <ToggleGroup
        type="single"
        defaultValue={gifSpeed}
        value={gifSpeed}
        className="w-full justify-center mt-3 gap-[10px]"
        onValueChange={(value: string) =>
          dispatch(setVideoState({ speed: value }))
        }
      >
        {data?.speedOptions.map((value) => {
          return (
            <ToggleGroupItem
              key={value}
              variant="outline"
              value={value.toString()}
              aria-label={`Toggle ${value}`}
              className={gifSpeed === value ? "bg-gray-200" : ""}
            >
              {value}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
};

// export const GifSpeed = () => {
//   const dispatch = useDispatch();
//   const videoState = useSelector((state: RootState) => state.video);
//   const gifSpeed = videoState?.speed;
//   return (
//     <Select
//       value={JSON.stringify(gifSpeed)}
//       onValueChange={(value) =>
//         dispatch(setVideoState({ speed: JSON.parse(value) }))
//       }
//     >
//       <SelectTrigger>
//         <SelectValue placeholder="Select Speed" defaultValue={"1x"} />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Speed</SelectLabel>
//           {data.speedOptions.map((speed) => (
//             <SelectItem key={speed} value={JSON.stringify(speed)}>
//               {speed}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// };
