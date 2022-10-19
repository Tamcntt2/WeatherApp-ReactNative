import ForecastComponent from "../components/ForecastComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import values from "../contains/values";

function FavoriteOverviewScreen({ route }) {
  const navigation = useNavigation();
  const isFavoriteRoute = route.params.isFavorite;
  const [isFavorite, setIsFavorite] = useState(isFavoriteRoute);
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const handleDeleteDataStorage = route.params.handleDeleteDataStorage;
  const handleAddDataStorage = route.params.handleAddDataStorage;

  const axios = require("axios").default;
  // const [cityNew, setCityNew] = useState(null);

  const getForecastItemData = async () => {
    let cityNew;
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      )
      .then((response) => {
        const data = response.data;
        const address = data.address;
        const city = address.city.replace("Thành phố", "");
        // setCityNew(city);
        cityNew = city.trim();
        console.log("FC: City item new data : ", cityNew);
      });
    axios
      .get(
        "https://api.openweathermap.org/data/3.0/onecall?exclude=minutely&units=metric",
        {
          params: {
            appid: values.key_API,
            lat: latitude,
            lon: longitude,
          },
        }
      )
      .then((response) => {
        console.log("FC: Response forecast new: ", response.data);
        const item = {
          latitude: latitude,
          longitude: longitude,
          address: cityNew,
          icon: response.data.current.weather[0].icon,
          temp: response.data.current.temp,
          humidity: response.data.current.humidity,
          wind_speed: response.data.current.wind_speed,
          isFavorite: true,
        };
        console.log("FC: Item new: ", item);
        handleAddDataStorage(item);
      })
      .catch((error) => console.log("FC: Error: ", error));
  };

  useEffect(async () => {
    setHeaderBarRight();
  }, [navigation]);

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Thông báo",
      isFavorite
        ? "Xóa khỏi danh sách yêu thích?"
        : "Thêm vào danh sách yêu thích",
      [
        {
          text: "Hủy",
          onPress: () => {
            console.log("FC : Cancel Pressed");
          },
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => {
            console.log("OK Pressed");
            if (isFavorite) {
              handleDeleteDataStorage(latitude, longitude);
              setIsFavorite(false);
              setHeaderBarRight();
              Alert.alert("Đã xóa khỏi danh sách yêu thích!");
            } else {
              getForecastItemData();
              setIsFavorite(true);
              setHeaderBarRight();
              Alert.alert("Đã thêm vào danh sách yêu thích!");
            }
          },
        },
      ]
    );

  const setHeaderBarRight = () => {
    navigation.setOptions({
      title: "",
      headerBackVisible: true,
      headerRight: () => (
        <TouchableOpacity>
          {
            isFavorite && (
              <Text onPress={createTwoButtonAlert} style={{ color: "#0D99FF" }}>
                Xóa
              </Text>
            )
          }
          {
            !isFavorite && (
              <Text onPress={createTwoButtonAlert} style={{ color: "#0D99FF" }}>
                Thêm
              </Text>
            )
          }
        </TouchableOpacity>
      ),
    });
  };

  const location = {
    coords: {
      latitude: route.params.latitude,
      longitude: route.params.longitude,
    },
  };

  return (
    <>
      <ForecastComponent location={location} />
    </>
  );
}

export default FavoriteOverviewScreen;
