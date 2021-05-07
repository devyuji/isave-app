import React, { FC, useState } from "react";
import { Linking, Text, View } from "react-native";
import { IconButton, Menu } from "react-native-paper";

const HeaderMenu: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const openBrowser = (url: string) => {
    Linking.openURL(url);
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
        title="Website"
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
};

export default HeaderMenu;
