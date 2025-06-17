import { View } from "react-native";
import WeatherMetric from "./WeatherMetric";

type WeatherDetails = {
  feels_like: number;
  humidity: number;
  uv_index: number;
  wind_speed: number;
};

export default function CityWeatherInfo({
  feels_like,
  humidity,
  uv_index,
  wind_speed,
}: WeatherDetails) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 40,
        flexWrap: "wrap",
        paddingHorizontal: 40,
        paddingTop: 20,
        paddingBottom: 40,
        borderBottomColor: "rgba(0,0,0,0.2)",
        borderBottomWidth: 0.5,
      }}
    >
      <WeatherMetric metric="feels like" value={`${feels_like}`} />
      <WeatherMetric metric="humidity" value={`${humidity} %`} />
      <WeatherMetric metric="uv index" value={`${Math.round(uv_index ?? 0)}`} />
      <WeatherMetric metric="wind" value={`${wind_speed.toFixed()} m/s`} />
    </View>
  );
}
