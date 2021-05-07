import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// screens
import Post from "./src/screens/post";
import Profile from "./src/screens/profile";
import Header from "./src/components/header";
import axios from "axios";

const Tab = createMaterialTopTabNavigator();

const App: FC = () => {
  axios.defaults.baseURL = "http://192.168.43.106:5001/api";

  const [loaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    semi_bold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
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
              backgroundColor: "#7300BF",
            },
            style: {
              elevation: 0,
            },
            labelStyle: {
              fontFamily: "semi_bold",
            },
            activeTintColor: "#7300BF",
            inactiveTintColor: "#BEC7C7",
          }}
          backBehavior="none"
        >
          <Tab.Screen name="Post" component={Post} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
