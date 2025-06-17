import { Text, View } from "react-native";

type CityDetailsProps = {
  Icon: React.ComponentType<any>;
  icon: string | string[];
  city: string | string[];
  temp: string | string[];
};

export default function CityDetails({ Icon, icon, city, temp }: CityDetailsProps) {
  const cityName = Array.isArray(city) ? city.join(", ") : city;
  const iconName = Array.isArray(icon) ? icon.join(", ") : icon;
  const tempValue = Array.isArray(temp) ? temp.join(", ") : temp;

  return (
    <View
      style={{
        paddingHorizontal: 30,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(0,0,0,0.2)",
      }}
    >
      <Text style={{ fontSize: 28, fontFamily: "Circe-Regular" }}>
        {cityName}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            height: 130,
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 140,
              lineHeight: 150,
              fontFamily: "Codega-Demo",
            }}
          >
            {tempValue + "\u00B0"}
          </Text>

          {Icon && (
            <Icon
              width={25}
              height={25}
              style={{ marginLeft: 15 }}
              stroke={"#000000"}
              strokeWidth={2}
            />
          )}
        </View>

        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            fontFamily: "Circe-Regular",
          }}
        >
          {iconName}
        </Text>
      </View>
    </View>
  );
}
