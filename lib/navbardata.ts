import { File, Inbox } from "lucide-react";
export const data = {
  navMain: [
    {
      title: "Settings",
      url: "#",
      icon: Inbox,
      isActive: true,
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
    { rate: 7, maxDuration: 42 },
    { rate: 8, maxDuration: 35 },
    { rate: 10, maxDuration: 30 },
    { rate: 12, maxDuration: 25 },
    { rate: 16, maxDuration: 20 },
    { rate: 20, maxDuration: 15 },
    { rate: 25, maxDuration: 12 },
    { rate: 33, maxDuration: 10 },
  ],
};
