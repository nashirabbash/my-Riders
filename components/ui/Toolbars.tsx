import Button from "@/components/ui/Button";
import { View } from "@/src/tw";
import React from "react";

const Toolbars = ({ children }: any) => {
  return (
    <View className="flex flex-row items-center justify-center gap-2">
      {children}
    </View>
  );
};

Toolbars.Button = Button;

export default Toolbars;
