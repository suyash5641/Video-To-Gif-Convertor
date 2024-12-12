"use client";

const Timeline = () => {
  return (
    <div className="fixed bottom-[50px] md:relative md:bottom-auto w-full h-[60px] md:h-[113px] bg-gradient-to-b from-transparent to-gray-900/10 backdrop-blur-sm border-t border-gray-200/10">
      <div className="relative h-full max-w-[1200px] mx-auto px-4 flex items-center">
        <div className="relative w-full h-[55px] flex items-center">
          <div className="absolute left-0 right-0 h-1 bg-gray-700 rounded-full">
            <div
              className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
                          shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 ease-out"
            />
          </div>

          <div className="absolute left-[40%] -translate-x-1/2 cursor-pointer group">
            <div
              className="w-4 h-4 rounded-full bg-white border-2 border-blue-500 shadow-lg
                          group-hover:scale-110 group-active:scale-95 transition-all duration-200
                          before:absolute before:w-1 before:h-8 before:bg-blue-500/20 before:left-1/2 before:-translate-x-1/2 before:-bottom-8"
            />
          </div>

          <div className="absolute inset-x-0 flex justify-between bottom-[2px]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-px h-2 bg-gray-400/30" />
                <span className="mt-1 text-xs text-gray-400">
                  {String(i * 25).padStart(2, "0")}:00
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timeline;
