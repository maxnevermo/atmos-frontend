import { ScrollView, View } from "react-native";
import TemperaturePredition from "./TemperaturePrediction";

type WeatherForecats = {
  time: string;
  temp: number;
  condition: string;
};

export default function TemperaturePredictionScroll({
  forecast_next_hours,
  temperatureNow,
}: {
  forecast_next_hours: WeatherForecats[];
  temperatureNow: number;
}) {
  return (
    <View
      style={{
        paddingHorizontal: 40,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            paddingVertical: 40,
            flexDirection: "row",
            gap: 35,
          }}
        >
          <TemperaturePredition time={"now"} value={temperatureNow} />
          {forecast_next_hours.map((hour, index) => (
            <TemperaturePredition
              key={index}
              time={hour.time}
              value={hour.temp}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
