import { Animated, TextInput } from "react-native";
import { Dispatch, SetStateAction } from "react";
import { City } from "./CityListItem";
import { getDeviceId } from "../../utils/device";

type Props = {
  newCityName: string;
  setNewCityName: Dispatch<SetStateAction<string>>;
  setCities: Dispatch<SetStateAction<City[]>>;
  setShowInput: Dispatch<SetStateAction<boolean>>;
  inputAnim: Animated.Value;
  resetRotation: () => void;
};

export default function CityAddField({
  newCityName,
  setNewCityName,
  setCities,
  setShowInput,
  inputAnim,
  resetRotation,
}: Props) {
  const handleAddCity = async () => {
    if (!newCityName.trim()) return;

    try {
      const deviceId = await getDeviceId();

      const res = await fetch("http://192.168.50.156:3000/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCityName, device_id: deviceId }),
      });

      const added = await res.json();
      setCities((prev) => [...prev, added]);
      setNewCityName("");

      resetRotation();

      Animated.parallel([
        Animated.timing(inputAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowInput(false);
      });
    } catch (err) {
      console.error("Error adding city:", err);
    }
  };

  const inputTranslateY = inputAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  const inputOpacity = inputAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={{
        opacity: inputOpacity,
        transform: [{ translateY: inputTranslateY }],
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TextInput
        placeholder="Enter city name"
        placeholderTextColor="#9F9F9F"
        value={newCityName}
        onChangeText={setNewCityName}
        onSubmitEditing={handleAddCity}
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          paddingVertical: 10,
          paddingInlineStart: 30,
          borderRadius: 10,
          fontFamily: "Circe-Regular",
          fontSize: 20,
        }}
      />
    </Animated.View>
  );
}
