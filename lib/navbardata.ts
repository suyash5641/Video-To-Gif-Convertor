import { File, Inbox } from "lucide-react";
export const data = {
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
    {
      title: "Preview Gif",
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
