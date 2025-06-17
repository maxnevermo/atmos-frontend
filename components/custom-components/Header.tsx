import { Animated, Text, TouchableOpacity, View } from "react-native";
import { Dispatch, SetStateAction, useRef } from "react";

type Props = {
  showInput: boolean;
  setShowInput: Dispatch<SetStateAction<boolean>>;
  inputAnim: Animated.Value;
  rotation: Animated.Value;
  resetRotation: () => void;
};

export default function Header({
  showInput,
  setShowInput,
  inputAnim,
  rotation,
  resetRotation,
}: Props) {
  const toggleInput = () => {
    if (!showInput) {
      setShowInput(true);
      Animated.parallel([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(inputAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(rotation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(inputAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowInput(false);
      });
    }
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <View
      style={{
        paddingHorizontal: 30,
        paddingTop: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <Text style={{ fontSize: 80, fontFamily: "Circe-Bold" }}>atmos</Text>
      <TouchableOpacity onPress={toggleInput}>
        <Animated.Text
          style={{
            fontSize: 70,
            fontFamily: "Circe-Regular",
            transform: [{ rotate: rotateInterpolate }],
          }}
        >
          +
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
}
