"use client";
import * as React from "react";
import { File, Inbox } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Frame",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Speed",
      url: "#",
      icon: File,
      isActive: false,
    },
  ],
  speedOptions: ["0.5x", "1x", "1.5x", "2x"],
  frameOptions: [
    { rate: 5, maxDuration: 60 },
    { rate: 10, maxDuration: 30 },
    { rate: 30, maxDuration: 10 },
  ],
};

export function MobileNavbar() {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const [selectedSpeed, setSelectedSpeed] = React.useState(
    data.speedOptions[1]
  );
  const [selectedFrame, setSelectedFrame] = React.useState(
    data.frameOptions[0]
  );
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const SpeedComponenet = () => (
    <Select
      value={JSON.stringify(selectedSpeed)}
      onValueChange={(value) => setSelectedSpeed(JSON.parse(value))}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Speed" defaultValue={"1x"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Speed</SelectLabel>
          {data.speedOptions.map((speed) => (
            <SelectItem key={speed} value={JSON.stringify(speed)}>
              {speed}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  const FrameComponent = () => (
    <Select
      value={JSON.stringify(selectedFrame)}
      onValueChange={(value) => setSelectedFrame(JSON.parse(value))}
    >
      <SelectTrigger>
        <SelectValue
          placeholder="Select Frame"
          defaultValue={`${selectedFrame.rate} FPS (${selectedFrame.maxDuration}s)`}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frame Options</SelectLabel>
          {data.frameOptions.map((frame) => (
            <SelectItem key={frame.rate} value={JSON.stringify(frame)}>
              {frame.rate} FPS ({frame.maxDuration}s)
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  const MobileContent = () => (
    <div className="p-4 space-y-4">
      {activeItem.title === "Speed" && <SpeedComponenet />}
      {activeItem.title === "Frame" && <FrameComponent />}
    </div>
  );

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden">
        <nav className="w-full border-t bg-background">
          <div className="flex h-10 items-center justify-around px-4">
            {data.navMain.map((item) => (
              <Sheet
                key={item.title}
                open={activeItem.title === item.title && sheetOpen}
                onOpenChange={setSheetOpen}
              >
                <SheetTrigger asChild>
                  <button
                    onClick={() => {
                      setActiveItem(item);
                      setSheetOpen(true);
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-md ${
                      activeItem.title === item.title ? "bg-muted" : ""
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[50vh]">
                  <SheetHeader>
                    <SheetTitle>{activeItem?.title}</SheetTitle>
                    <SheetDescription>{""}</SheetDescription>
                  </SheetHeader>

                  <MobileContent />
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
