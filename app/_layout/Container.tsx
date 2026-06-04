import React from "react";
import { cn } from "../_lib/utils";

export default function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(`max-w-7xl m-auto px-4 h-full`, className)}>{children}</div>;
}
