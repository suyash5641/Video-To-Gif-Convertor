"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import AppSidebar from "@/components/AppSidebar";
import VideoTimeline from "@/components/VideoTimeline";

import DummyTimeline from "@/components/DummyTimeline";
import VideoToGifConverter from "@/components/VideoToGifConverter";

const Page = () => {
  const videoState = useSelector((state: RootState) => state.video);
  const video = videoState?.file;
  const frame = videoState?.frames;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <SidebarProvider
          style={
            {
              "--sidebar-width": "280px",
              minHeight: `calc(100vh - 150px)`,
              maxHeight: `calc(100vh - 150px)`,

              overflow: "hidden",
            } as React.CSSProperties
          }
        >
          <AppSidebar />

          <SidebarInset>
            <VideoToGifConverter />
          </SidebarInset>
        </SidebarProvider>
      </div>
      {video && frame?.length ? (
        <VideoTimeline frames={frame} />
      ) : (
        <DummyTimeline />
      )}
    </div>
  );
};
export default Page;
