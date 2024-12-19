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
import UploadVideo from "./UploadVideo";
import { uploadVideo } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const { setOpen } = useSidebar();

  const handleVideoUpload = async (file: File) => {
    await uploadVideo({ file, dispatch, toast });
  };

  const MobileContent = () => (
    <div className="p-4 space-y-4">
      {activeItem.title === "Settings" && (
        <div className="flex flex-col justify-center gap-8">
          <GifSpeed />
          <FrameRate />
        </div>
      )}
      {activeItem.title === "Preview Gif" && <GenerateGif />}
      {activeItem.title === "Upload" && (
        <UploadVideo
          onVideoSelect={handleVideoUpload}
          buttonText="Upload Video"
        />
      )}
    </div>
  );

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
export default AppSidebar;
