"use client";
import { Seeker } from "./Seeker";

const TimeLabels = () => {
  const labels = Array.from({ length: 28 }, (_, i) => i * 1);

  return (
    <div className="absolute overflow-hidden h-[20px] top-0 left-12 flex flex-row gap-12">
      {labels.map((label, index) => (
        <div key={index} className="w-8 text-xs">
          |:{label}
        </div>
      ))}
    </div>
  );
};

const DummyTimeline = () => {
  const array = new Array(4).fill(0);
  return (
    <div className="flex overflow-hidden flex-row items-center bg-background fixed bottom-[40px] h-[110px]  md:relative md:bottom-auto w-full  md:h-[150px] bg-gradient-to-b from-transparent to-gray-900/10 backdrop-blur-sm border-t border-gray-200/10">
      <Seeker height="h-[80%]" left="left-10" />
      <div className="flex w-full gap-1 transition-transform duration-200 rounded-md border-0 bg-card">
        <div className="flex gap-1 transition-transform duration-200 ml-[3.2rem] rounded-md border-2 border-white bg-[#000000]">
          {array.map((frame, index) => (
            <div key={index} className="w-[52px] h-[50px] rounded-sm"></div>
          ))}
        </div>
      </div>
      <TimeLabels />
    </div>
  );
};
export default DummyTimeline;
