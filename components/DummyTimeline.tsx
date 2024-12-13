"use client";
import { Seeker } from "./Seeker";

const DummyTimeline = () => {
  const array = new Array(4).fill(0);
  return (
    <div className="flex flex-row bg-background fixed bottom-[40px] h-[110px]  md:relative md:bottom-auto w-full  md:h-[150px] bg-gradient-to-b from-transparent to-gray-900/10 backdrop-blur-sm border-t border-gray-200/10">
      <Seeker height="h-[80%]" left="left-10" />
      <div className="flex gap-1 transition-transform duration-200 ml-[3.2rem] rounded-md border-2 border-white bg-[#242121]">
        {array.map((frame, index) => (
          <div key={index} className="w-[52px] h-[50px] rounded-sm"></div>
        ))}
      </div>
    </div>
  );
};
export default DummyTimeline;
