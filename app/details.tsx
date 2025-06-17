import { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, ScrollView, Animated } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { iconMap } from "../utils/IconMap";

import { getGradientColors, getGradientLocations } from "../utils/colorUtils";

import Back from "../assets/icons/back.svg";
import CityDetails from "@/components/custom-components/CityDetails";
import CityWeatherInfo from "@/components/custom-components/CityWeatherInfo";
import TemperaturePredictionScroll from "@/components/custom-components/TemperaturePredictionScroll";
import HeaderGradient from "@/components/custom-components/HeaderGradient";
import TempCriticalInfo from "@/components/custom-components/TempCriticalInfo";

type WeatherData = {
  temp: number;
  temp_max: number;
  temp_min: number;
  humidity: number;
  wind_speed: number;
  feels_like: number;
  icon: string;
  time: string;
  name: string;
  uv_index: number;
  forecast_next_hours: {
    time: string;
    temp: number;
    condition: string;
  }[];
};

export default function DetailScreen() {
  const { city, temp, icon } = useLocalSearchParams();
  const router = useRouter();
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const gradientOpacity = useRef(new Animated.Value(0.4)).current;

  const iconString = typeof icon === "string" ? icon.toLowerCase() : "";
  const Icon = iconMap[iconString as keyof typeof iconMap];
  const colors = getGradientColors(iconString);
  const locations = getGradientLocations(colors);

  useEffect(() => {
    async function fetchCityWeather() {
      const data = await fetch(`http://192.168.50.156:3000/weather/${city}`);
      const fetchedWeather = await data.json();
      setWeather(fetchedWeather);

      Animated.timing(gradientOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }

    fetchCityWeather();
  }, [city]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderGradient
        colors={colors}
        gradientOpacity={gradientOpacity}
        locations={locations}
      />

      <ScrollView style={{ flex: 1, paddingTop: 60 }} scrollEventThrottle={16}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginBottom: 20,
            borderBottomColor: "rgba(0,0,0,0.2)",
            borderBottomWidth: 0.5,
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
        >
          <Back
            width={60}
            height={60}
            stroke="#000000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </TouchableOpacity>

        <CityDetails city={city} icon={icon} temp={temp} Icon={Icon} />

        {weather && (
          <>
            <View style={{ flexDirection: "row", gap: 80, padding: 40 }}>
              <TempCriticalInfo temp={weather?.temp_max} order="max" />
              <TempCriticalInfo temp={weather?.temp_min} order="min" />
            </View>

            <CityWeatherInfo
              feels_like={weather.feels_like}
              humidity={weather.humidity}
              uv_index={weather.uv_index}
              wind_speed={weather.wind_speed}
            />

            <TemperaturePredictionScroll
              forecast_next_hours={weather.forecast_next_hours}
              temperatureNow={weather.temp}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}
