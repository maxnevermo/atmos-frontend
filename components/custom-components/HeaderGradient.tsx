import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Animated, Platform } from "react-native";

export default function HeaderGradient({
  gradientOpacity,
  colors,
  locations,
}: {
  gradientOpacity: Animated.Value;
  colors: [string, string] | [string, string, string];
  locations: [number, number] | [number, number, number];
}) {
  return (
    <>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 320,
          opacity: gradientOpacity,
        }}
      >
        <LinearGradient
          colors={colors}
          locations={locations}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1 }}
        />
      </Animated.View>

      {Platform.OS === "ios" && (
        <BlurView
          intensity={100}
          tint="light"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 460,
          }}
        />
      )}
    </>
  );
}
