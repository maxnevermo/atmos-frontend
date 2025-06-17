import { useState, useRef, useEffect } from "react";
import { FlatList, View, Animated } from "react-native";
import CityListItem, {
  City,
} from "../components/custom-components/CityListItem";
import Header from "@/components/custom-components/Header";
import CityAddField from "@/components/custom-components/CityAddField";

import { getDeviceId } from "../utils/device";

export default function HomeScreen() {
  const [cities, setCities] = useState<City[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [newCityName, setNewCityName] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      const deviceId = await getDeviceId();

      fetch(`http://192.168.50.156:3000/cities?device_id=${deviceId}`)
        .then((res) => res.json())
        .then((data) => {
          const filled = data.map((city: any) => ({
            ...city,
          }));
          setCities(filled);
        })
        .catch((err) => console.error("Error loading cities:", err));
    };

    fetchCities();
  }, []);

  const inputAnim = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const handleRemoveCity = async (cityId: string) => {
    await fetch(`http://localhost:3000/cities/${cityId}`, {
      method: "DELETE",
    });
    setCities((prev) => prev.filter((city) => city.id !== cityId));
  };

  const resetRotation = () => {
    Animated.timing(rotation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        showInput={showInput}
        setShowInput={setShowInput}
        inputAnim={inputAnim}
        rotation={rotation}
        resetRotation={resetRotation}
      />

      {showInput && (
        <CityAddField
          newCityName={newCityName}
          setNewCityName={setNewCityName}
          setCities={setCities}
          setShowInput={setShowInput}
          inputAnim={inputAnim}
          resetRotation={resetRotation}
        />
      )}

      <FlatList
        data={cities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CityListItem item={item} onRemove={handleRemoveCity} />
        )}
      />
    </View>
  );
}
