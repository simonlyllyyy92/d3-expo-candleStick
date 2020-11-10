import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { LoadAssets, StyleGuide } from "./src/components";
import CoinbasePro from "./src/CoinbasePro";



const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      CoinbasePro: {
        screen: CoinbasePro,
        navigationOptions: {
          title: "Coinbase Pro",
          header: () => null
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: StyleGuide.palette.primary,
          borderBottomWidth: 0
        },
        headerTintColor: "white"
      }
    }
  )
);

export default () => (
  <LoadAssets>
    <StatusBar barStyle="light-content" />
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  </LoadAssets>
);
