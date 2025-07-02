import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import CitiesData from "../data/cities.json";

const Cities = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState(CitiesData);

  useEffect(() => {
    const newFilteredCities = CitiesData.filter((city) =>
      city.city.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    setFilteredCities(newFilteredCities);
  }, [search]);

  return (
    <LinearGradient colors={["#00457d", "#05051f"]} style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite a cidade"
          style={styles.input}
          placeholderTextColor={"#fff"}
          value={search}
          onChangeText={(value) => setSearch(value)}
        />
        <MaterialIcons name="search" size={18} color={"#fff"} />
      </View>
      <ScrollView>
        <View style={styles.scrollList}>
          {filteredCities.map((city) => (
            <TouchableOpacity
              onPress={() => router.push(`/${city.city}`)}
              style={styles.listItem}
              key={city.city}
            >
              <Image
                style={styles.cityImage}
                source={require("../assets/images/clouds.png")}
              />
              <Text style={styles.cityName}>
                {city.city.replace(", ", " - ")}
              </Text>
              <Text style={styles.cityTemp}>{city.temp}º</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
    paddingTop: 40,
  },
  scrollList: {
    gap: 36,
  },
  listItem: {
    height: 63,
    width: "100%",
    backgroundColor: "rgba(255,255,255, 0.15)",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  cityName: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
  cityTemp: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "Montserrat_700Bold",
  },
  cityImage: {
    width: 27,
    height: 24,
  },
  inputContainer: {
    // height: 36,
    width: "100%",
    backgroundColor: "rgba(255,255,255, 0.15)",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  input: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
});

export default Cities;
