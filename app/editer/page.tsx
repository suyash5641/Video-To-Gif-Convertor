"use client";
// import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import VideoToGifConverter from "@/components/VideoToGifConverter";
// import { Separator } from "@radix-ui/react-separator";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { VideoTimeline } from "@/components/VideoTimeline";
import { MobileNavbar } from "@/components/ui/MobileNavbar";
import { AppSidebar } from "@/components/AppSidebar";
import { Timeline } from "@/components/Timeline";

export default function Page() {
  const videoState = useSelector((state: RootState) => state.video);
  const video = videoState?.file;
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
      {video ? <VideoTimeline /> : <Timeline />}
      <MobileNavbar />
    </div>
  );
}
