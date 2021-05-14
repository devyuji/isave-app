import React, { FC } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface ImageViewerProps {
  visible: boolean;
  onDismiss: () => void;
  imageUrl: string;
}

const { height } = Dimensions.get("screen");

const ImageViewer: FC<ImageViewerProps> = ({
  visible,
  onDismiss,
  imageUrl,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onDismiss}
      transparent={true}
    >
      <View style={styles.container}>
        <Pressable style={styles.close} onPress={onDismiss}>
          <AntDesign name="closecircle" size={26} color="white" />
        </Pressable>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  close: {
    position: "absolute",
    top: 30,
    right: 10,
    zIndex: 1000,
  },
  image: {
    width: "100%",
    height,
  },
});

export default ImageViewer;
