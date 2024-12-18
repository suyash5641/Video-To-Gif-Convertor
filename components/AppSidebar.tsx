"use client";
import * as React from "react";
import { ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { GifSpeed } from "./GifSpeed";

import { data } from "@/lib/navbardata";
import GenerateGif from "./GenerateGif";
import FrameRate from "./FrameRate";
import UploadVideo from "./UploadVideo";
import { uploadVideo } from "@/lib/utils";
import { useDispatch } from "react-redux";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const { setOpen } = useSidebar();

  const handleVideoUpload = async (file: File) => {
    await uploadVideo({ file, dispatch });
  };

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="overflow-y-auto [&>[data-sidebar=sidebar]]:flex-row "
        {...props}
      >
        {/* Sidebar for icons */}
        <Sidebar
          collapsible="none"
          className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu>
                  {data.navMain.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          setActiveItem(item);
                          setOpen(true);
                        }}
                        isActive={activeItem.title === item.title}
                        className="px-2.5 md:px-2"
                      >
                        <item.icon />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Sidebar for main content */}
        <Sidebar collapsible="none" className="hidden flex-1 md:flex">
          <SidebarContent>
            <div className="flex flex-row w-full justify-end p-2">
              <SidebarTrigger className="-ml-1" icon={<ChevronRight />} />
            </div>
            <SidebarGroup className="px-4 flex flex-row">
              {activeItem.title === "Settings" && (
                <div className="flex flex-col justify-center gap-8">
                  <GifSpeed />
                  <FrameRate />
                </div>
              )}

              {activeItem.title === "Preview Gif" && <GenerateGif />}
              {activeItem.title === "Upload" && (
                <div className="flex flex-col justify-center gap-8 w-full">
                  <UploadVideo
                    onVideoSelect={handleVideoUpload}
                    buttonText="Upload Video"
                  />
                </div>
              )}
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </Sidebar>
    </>
  );
};
export default AppSidebar;
