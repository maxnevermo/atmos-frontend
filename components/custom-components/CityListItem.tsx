import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { iconMap } from "../../utils/IconMap";
export type City = {
  id: string;
  country: string;
  time: string;
  name: string;
  temp: number;
  icon: string;
};

type Props = {
  item: City;
  onRemove: (id: string) => void;
};

export default function CityListItem({ item, onRemove }: Props) {
  const router = useRouter();

  const handleDoubleSwipe = () => {
    Alert.alert("Remove city", "Do you want to remove this city?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => onRemove(item.id) },
    ]);
  };

  const Icon = iconMap[item.icon?.toLowerCase() as keyof typeof iconMap];

  return (
    <TouchableOpacity
      onLongPress={handleDoubleSwipe}
      onPress={() =>
        router.push({
          pathname: "/details",
          params: { city: item.name, temp: item.temp, icon: item.icon },
        })
      }
      style={{
        padding: 20,
        borderBottomWidth: 1,
        borderColor: "#9B9B9B",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 15, fontFamily: "Circe-Light", color: "#5F5F5F" }}>
            {item.country}
          </Text>
          <Text style={{ fontSize: 35, fontFamily: "Circe-Regular" }}>{item.name}</Text>
        </View>

        <View>
          <Text
            style={{
              textAlign: "right",
              fontSize: 15,
              fontFamily: "Circe-Light",
            }}
          >
            {item.time}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ fontSize: 30, fontFamily: "Circe-Regular" }}>{item.temp + "\u00B0"}</Text>
            {Icon && (
              <Icon width={30} height={30} stroke="#9B9B9B" strokeWidth={2} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
