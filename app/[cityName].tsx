import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const CityDetails = () => {
  const searchParams = useLocalSearchParams();

  console.log(searchParams);

  return (
    <View>
      <Text>Details</Text>
    </View>
  );
};

export default CityDetails;
