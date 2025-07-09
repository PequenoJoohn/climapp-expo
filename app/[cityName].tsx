import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const CityDetails = () => {
  const searchParams = useLocalSearchParams();
  const [cityDetails, setCityDetails] = useState(null);

  console.log(searchParams);

  const handleData = async () => {
    try {
      const response = await fetch("https://climapp-api.vercel.app/api");
      const responseJSON = await response.json();

      const city = responseJSON.find(
        (cityData: any) => cityData.city === searchParams.cityName
      );

      console.log(city);

      setCityDetails(city);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <LinearGradient colors={["#00457d", "#05051f"]} style={styles.container}>
      <View>
        <MaterialIcons
          name="chevron-left"
          size={24}
          color={"#fff"}
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}>{cityDetails?.city}</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderTitle}>Hoje</Text>
          <Text style={styles.cardHeaderTitle}>{cityDetails?.date}</Text>
        </View>

        <View style={styles.cardBox}>
          <Image
            source={require("../assets/images/clouds.png")}
            style={styles.cardImage}
          />

          <View>
            <Text style={styles.cardTemperature}>{cityDetails?.temp}º</Text>
            <Text style={styles.cardDescription}>
              {cityDetails?.description}
            </Text>
          </View>
        </View>

        <View style={styles.rowBox}>
          <View style={styles.row}>
            <Image source={require("../assets/icons/humidity.png")} />
            <Text style={styles.rowTitle}>Humidity:</Text>
            <Text style={styles.rowValue}>{cityDetails?.humidity}%</Text>
          </View>
          <View style={styles.row}>
            <Image source={require("../assets/icons/temperature.png")} />
            <Text style={styles.rowTitle}>Min/Max:</Text>
            <Text style={styles.rowValue}>
              {cityDetails?.forecast[0].min}/{cityDetails?.forecast[0].max}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    gap: 40,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "center",
  },
  card: {
    width: "100%",
    borderRadius: 24,
    backgroundColor: "#4463D5",
    padding: 16,
    gap: 24,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  cardHeaderTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
  headerIcon: {
    position: "absolute",
    left: 0,
  },
  cardImage: {
    width: 72,
    height: 64,
  },
  cardTemperature: {
    color: "#fff",
    fontSize: 43,
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
  },
  cardDescription: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
  },
  cardBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  rowTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold"
  }, 
  rowValue: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    marginLeft: "auto"
  },
  rowBox: {
    gap: 8
  }
});

export default CityDetails;
