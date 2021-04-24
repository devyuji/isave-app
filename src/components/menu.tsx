import React, { useState } from "react";
import { Text } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";

function HeaderMenu() {
  const [visible, setVisible] = useState<boolean>(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const openBrowser = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
      statusBarHeight={30}
    >
      <Menu.Item
        onPress={() => openBrowser("https://isave.ga")}
        icon="web"
        title="Web App"
      />
      <Menu.Item
        onPress={() => openBrowser("https://instagram.com/devyuji")}
        icon="instagram"
        title="Instagram"
      />
      <Menu.Item
        onPress={() => openBrowser("https://github.com/devyuji/isave-app")}
        icon="github"
        title="Github"
      />
      <Text style={{ textAlign: "center", fontSize: 16 }}>Made by Yuji</Text>
    </Menu>
  );
}

export default HeaderMenu;
