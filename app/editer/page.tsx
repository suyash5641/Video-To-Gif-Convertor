"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import AppSidebar from "@/components/AppSidebar";
import MobileNavbar from "@/components/MobileNavbar";
import Timeline from "@/components/Timeline";
import VideoTimeline from "@/components/VideoTimeline";
import VideoToGifConverter from "@/components/VideoToGifConverter";

const Page = () => {
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
};
export default Page;
