"use client";

export function DummyTimeline() {
  return (
    <div className="relative w-fit space-y-4 bg-gray-900/95 rounded-lg p-4">
      {/* Static Timeline Frames */}
      <div className="relative">
        <div className="flex gap-1 overflow-hidden mx-2">
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="w-[100px] h-[50px] bg-blue-200 rounded-sm flex items-center justify-center text-sm text-gray-600"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Static Slider */}
    </div>
  );
}
