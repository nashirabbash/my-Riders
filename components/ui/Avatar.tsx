import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Text, View } from "@/src/tw";
import { Image } from "@/src/tw/image";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

interface AvatarProps {
  src?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  xs: { container: "w-6 h-6", text: "text-[10px]", icon: 14 },
  sm: { container: "w-8 h-8", text: "text-xs", icon: 18 },
  md: { container: "w-10 h-10", text: "text-base", icon: 24 },
  lg: { container: "w-[60px] h-[60px]", text: "text-xl", icon: 36 },
  xl: { container: "w-20 h-20", text: "text-2xl", icon: 48 },
};

export default function Avatar({
  src,
  fallback,
  size = "md",
  className = "",
}: AvatarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [hasError, setHasError] = useState(false);

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const { container, text, icon } = sizeMap[size];

  return (
    <View
      className={`rounded-full overflow-hidden items-center justify-center ${container} ${className}`}
      style={{ backgroundColor: colors.secondary }}
    >
      {src && !hasError ? (
        <Image
          source={{ uri: src }}
          className="w-full h-full"
          contentFit="cover"
          onError={() => setHasError(true)}
        />
      ) : fallback ? (
        <Text className={`font-medium ${text}`} style={{ color: colors.icon }}>
          {getInitials(fallback)}
        </Text>
      ) : (
        <Ionicons name="person" size={icon} color={colors.icon} />
      )}
    </View>
  );
}
