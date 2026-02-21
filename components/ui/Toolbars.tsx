import Button from "@/components/ui/Button";
import { View } from "@/src/tw";
import React from "react";
import Avatar from "./Avatar";

interface ToolbarsProps {
  children: React.ReactNode;
  className?: string;
}

const Toolbars = ({ children, className }: ToolbarsProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center gap-1 ${className}`}
    >
      {children}
    </View>
  );
};

Toolbars.Button = Button;
Toolbars.Avatar = Avatar;

export default Toolbars;
