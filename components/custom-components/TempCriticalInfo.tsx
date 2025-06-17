import { Text, View } from "react-native";
import Back from "../../assets/icons/back.svg";

export default function TempCriticalInfo({
  temp,
  order,
}: {
  temp: number;
  order: string;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      <Back
        width={30}
        height={30}
        stroke="#000000"
        strokeWidth={2}
        style={{
          transform: [{ rotate: order === "max" ? "90deg" : "-90deg" }],
        }}
      />
      <Text style={{ fontSize: 20, fontFamily: "Codega-Demo" }}>{temp}</Text>
    </View>
  );
}
