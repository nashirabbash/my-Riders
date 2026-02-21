import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Pressable, Text, View } from "@/src/tw";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface ButtonProps {
  alt: string;
  title?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  iconOnly?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  size?: "small" | "medium" | "large";
  type?:
    | "primary"
    | "secondary"
    | "desctructive"
    | "ghost"
    | "outline"
    | "destructive";
}

export default function Button({
  type = "primary",
  size = "medium",
  iconPosition = "left",
  ...props
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const pressed = useSharedValue(false);
  const [isPressed, setIsPressed] = React.useState(false);

  // Animation for press effect
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(pressed.value ? 0.96 : 1) }],
      opacity: withSpring(pressed.value ? 0.8 : 1),
    };
  });

  // Size configuration
  const getSizeConfig = () => {
    switch (size) {
      case "small":
        return {
          height: 32,
          paddingHorizontal: 12,
          fontSize: 14,
          iconSize: 16,
          radius: 8,
        };
      case "large":
        return {
          height: 50,
          paddingHorizontal: 24,
          fontSize: 17,
          iconSize: 24,
          radius: 14,
        };
      case "medium":
      default:
        return {
          height: 44,
          paddingHorizontal: 16,
          fontSize: 17,
          iconSize: 20,
          radius: 12,
        };
    }
  };

  const config = getSizeConfig();

  const getColors = () => {
    switch (type) {
      case "secondary":
        return {
          bg: colors.secondary,
          text: colors.tint,
          icon: colors.tint,
          border: "transparent",
        };
      case "destructive":
        return {
          bg: colors.destructive,
          text: colors.buttonText,
          icon: colors.buttonText,
          border: "transparent",
        };
      case "ghost":
        return {
          bg: "transparent",
          text: colors.tint,
          icon: colors.tint,
          border: "transparent",
        };
      case "outline":
        return {
          bg: "transparent",
          text: colors.text,
          icon: colors.text,
          border: colors.border,
        };
      case "primary":
      default:
        return {
          bg: colors.primary,
          text: colors.buttonText,
          icon: colors.buttonText,
          border: "transparent",
        };
    }
  };

  const buttonColors = getColors();

  return (
    <View
      className="p-3 flex flex-row items-center justify-center bg-transparent"
      accessibilityRole="button"
      accessibilityLabel={props.alt}
    >
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={props.onPress}
          disabled={props.isLoading || props.disabled}
          onPressIn={() => {
            pressed.value = true;
            setIsPressed(true);
          }}
          onPressOut={() => {
            pressed.value = false;
            setIsPressed(false);
          }}
          className={`flex-row items-center justify-center overflow-hidden ${
            props.disabled ? "opacity-50" : ""
          }`}
          style={{
            backgroundColor: buttonColors.bg,
            borderColor: buttonColors.border,
            borderWidth: type === "outline" ? 1 : 0,
            height: props.iconOnly ? config.height : config.height,
            width: props.iconOnly ? config.height : "auto", // Square for icon only
            paddingHorizontal: props.iconOnly ? 0 : config.paddingHorizontal,
            borderRadius: props.iconOnly ? config.height / 2 : config.radius,
          }}
        >
          {props.isLoading ? (
            <ActivityIndicator color={buttonColors.text} />
          ) : (
            <>
              {/* Left Icon */}
              {((props.iconName && iconPosition === "left") ||
                props.iconOnly) && (
                <Ionicons
                  name={
                    (isPressed
                      ? `${props.iconName}-sharp`
                      : `${props.iconName!}-outline`) as keyof typeof Ionicons.glyphMap
                  }
                  size={config.iconSize}
                  color={buttonColors.icon}
                  style={
                    !props.iconOnly && { marginRight: 6 } // Space between icon and text
                  }
                />
              )}

              {/* Default Left Icon Logic (if props.icon is passed directly) */}
              {props.icon && iconPosition === "left" && (
                <View className="mr-2">{props.icon}</View>
              )}

              {/* Text Label */}
              {!props.iconOnly && (
                <Text
                  className="text-center font-medium"
                  style={{
                    fontSize: config.fontSize,
                    color: buttonColors.text,
                  }}
                >
                  {props.title}
                </Text>
              )}

              {/* Right Icon */}
              {props.iconName &&
                iconPosition === "right" &&
                !props.iconOnly && (
                  <Ionicons
                    name={props.iconName}
                    size={config.iconSize}
                    color={buttonColors.icon}
                    style={{ marginLeft: 6 }}
                  />
                )}

              {/* Custom Right Icon */}
              {props.icon && iconPosition === "right" && (
                <View className="ml-2">{props.icon}</View>
              )}
            </>
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
}
