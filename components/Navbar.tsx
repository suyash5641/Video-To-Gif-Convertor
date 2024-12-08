"use client";

import * as React from "react";

import { PopOver } from "./Popover";

export function Navbar() {
  return (
    <nav className="fixed left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm shadow-lg border border-border rounded-full p-2 flex flex-col items-center space-y-4">
      <PopOver />
    </nav>
  );
}
