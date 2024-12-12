"use client";
import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GifSpeed } from "./GifSpeed";

import { data } from "@/lib/navbardata";
import GenerateGif from "./GenerateGif";
import FrameRate from "./FrameRate";

const MobileNavbar = () => {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);

  const [sheetOpen, setSheetOpen] = React.useState(false);

  const MobileContent = () => (
    <div className="p-4 space-y-4">
      {activeItem.title === "Speed" && <GifSpeed />}
      {activeItem.title === "Frame" && <FrameRate />}
      {activeItem.title === "Preview Gif" && <GenerateGif />}
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
                <SheetContent side="bottom" className="h-auto">
                  <SheetHeader>
                    <SheetTitle>{""}</SheetTitle>
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
};
export default MobileNavbar;
