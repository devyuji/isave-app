import React, { FC } from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FlashMessage from "react-native-flash-message";

// screens
import Post from "./src/screens/post";
import Profile from "./src/screens/profile";
import Header from "./src/components/header";
import axios from "axios";

const Tab = createMaterialTopTabNavigator();

const App: FC = () => {
  axios.defaults.baseURL = "https://shielded-basin-48291.herokuapp.com/api";

  const [fontLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    semi_bold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const theme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
      ...DefaultTheme.colors,
      primary: "#000000",
      accent: "#f1c40f",
    },
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <Header />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Post"
          tabBarOptions={{
            tabStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
            indicatorStyle: {
              backgroundColor: "#000000",
            },
            style: {
              elevation: 0,
            },
            labelStyle: {
              fontFamily: "semi_bold",
            },
            activeTintColor: "#000000",
            inactiveTintColor: "#BEC7C7",
          }}
          backBehavior="none"
        >
          <Tab.Screen name="Post" component={Post} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
      <FlashMessage floating={true} position="bottom" />
    </PaperProvider>
  );
};

export default App;
