"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { setVideoState } from "@/lib/slice/videoSlice";
import { RootState } from "@/lib/store";
import { data } from "@/lib/navbardata";

const FrameRate = () => {
  const dispatch = useDispatch();
  const videoState = useSelector((state: RootState) => state.video);
  const gifFrameRate = videoState?.frameRate;

  return (
    <div className="flex flex-col justify-center gap-4">
      <p className="text-xs"> Frames</p>
      <Select
        defaultValue={JSON.stringify({ rate: 33, maxDuration: 10 })}
        value={JSON.stringify(gifFrameRate)}
        onValueChange={(value) =>
          dispatch(setVideoState({ frameRate: JSON.parse(value) }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Frame" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frame Options</SelectLabel>

            {data.frameOptions.map((frame) => (
              <SelectItem key={frame.rate} value={JSON.stringify(frame)}>
                {frame.rate} (max {frame.maxDuration}s)
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default FrameRate;
