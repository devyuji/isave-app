import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

import Menu from "../components/menu";

const Header: FC = () => {
  return (
    <Appbar.Header statusBarHeight={30} style={styles.header}>
      <Appbar.Content title="isave" titleStyle={{ fontFamily: "semi_bold" }} />
      <Menu />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    elevation: 0,
  },
});

export default Header;
