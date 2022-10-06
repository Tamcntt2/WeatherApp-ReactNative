import ForecastComponent from "../components/ForecastComponent";

function FavoriteOverviewScreen({ route }) {
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
