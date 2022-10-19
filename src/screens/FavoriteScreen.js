import { View, TouchableOpacity } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionic from "react-native-vector-icons/Ionicons";

import FavoriteOverviewScreen from "./FavoriteOverviewScreen";
import FavoriteListScreen from "./FavoriteListScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const FavoriteScreen = () => {

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="FavoriteList"
          component={FavoriteListScreen}
        />
        <Stack.Screen
          name="FavoriteOverview"
          component={FavoriteOverviewScreen}
          // options={{
          //   title: "",
          //   headerBackVisible: true,
          //   headerRight: () => (
          //     <View>
          //       <TouchableOpacity>
          //         <Ionic name="heart" size={25} color="red" />
          //       </TouchableOpacity>
          //     </View>
          //   ),
          // }}
        />
      </Stack.Navigator>
    </>
  );
};

export default FavoriteScreen;
