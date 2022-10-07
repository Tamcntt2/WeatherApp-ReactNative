import ForecastComponent from "../components/ForecastComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FavoriteOverviewScreen({ route }) {
  const navigation = route.params.navigation;

  const handleAddData = (itemData) => {
    const newData = [...dataListFavorite, itemData];
    AsyncStorage.setItem("storedData", JSON.stringify(newData))
      .then(() => {
        setDataListFavorite(newData);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteData = (rowMap, latitude, longitude) => {
    const newData = [...dataListFavorite];
    const itemIndex = dataListFavorite.findIndex((item) => item.latitude == latitude && item.longitude == longitude);
    newData.splice(itemIndex, 1);

    AsyncStorage.setItem("storedData", JSON.stringify(newData))
      .then(() => {
        setDataListFavorite(newData);
      })
      .catch((error) => console.log(error));
  };
  const handleClearData = () => {
    setDataListFavorite([]);
    AsyncStorage.setItem("storedData", JSON.stringify([]))
      .then(() => {
        setDataListFavorite([]);
      })
      .catch((error) => console.log(error));
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
