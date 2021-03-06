import React, { FC } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Surface } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

// icons
import { Feather } from "@expo/vector-icons";

// utils
import { successMessage } from "../utils/notification";

interface CardProps {
  data: any;
}

interface CardImageProps {
  image: string;
}

interface CardVideoProps {
  video_img: string;
  video_url: string;
}

const randomNumber = (): number => {
  const date = new Date();
  return date.getTime();
};

const downloadImage = async (url: string) => {
  let mediaPermission = await MediaLibrary.requestPermissionsAsync();
  mediaPermission = await MediaLibrary.getPermissionsAsync();

  if (mediaPermission.status === "granted") {
    const fileName = "isave-" + randomNumber() + ".jpg";
    FileSystem.downloadAsync(url, FileSystem.documentDirectory + fileName)
      .then(async ({ uri }) => {
        await MediaLibrary.saveToLibraryAsync(uri);
        successMessage("Image saved to gallery");
        await FileSystem.deleteAsync(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    alert("Required permission in order to download");
  }
};

const downloadVideo = async (url: string) => {
  let mediaPermission = await MediaLibrary.requestPermissionsAsync();
  mediaPermission = await MediaLibrary.getPermissionsAsync();

  if (mediaPermission.status === "granted") {
    const fileName = "isave-" + randomNumber() + ".mp4";
    FileSystem.downloadAsync(url, FileSystem.documentDirectory + fileName)
      .then(async ({ uri }) => {
        await MediaLibrary.saveToLibraryAsync(uri);
        successMessage("Video saved to gallery");
        await FileSystem.deleteAsync(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    alert("Required permission in order to download");
  }
};

const Card: FC<CardProps> = ({ data }) => {
  if (data.type === "image") {
    return <CardImage image={data.image_url} />;
  } else if (data.type === "video") {
    return <CardVideo video_img={data.video_img} video_url={data.video} />;
  } else if (data.type === "slide") {
    return data.links.map((d: any, index: number) =>
      d.type === "image" ? (
        <CardImage image={d.image_url} key={index} />
      ) : (
        <CardVideo video_img={d.video_img} video_url={d.video} key={index} />
      )
    );
  }

  return null;
};

const CardImage: FC<CardImageProps> = ({ image }) => {
  return (
    <Surface style={styles.surface}>
      <View style={styles.logo}>
        <Feather name="image" size={24} color="#06111C" />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Button
        icon="download"
        onPress={() => downloadImage(image)}
        mode="outlined"
        style={{ marginTop: 5 }}
      >
        download
      </Button>
    </Surface>
  );
};

const CardVideo: FC<CardVideoProps> = ({ video_img, video_url }) => {
  return (
    <Surface style={styles.surface}>
      <View style={styles.logo}>
        <Feather name="video" size={24} color="black" />
      </View>
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: video_img,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Button
          icon="download"
          onPress={() => downloadVideo(video_url)}
          mode="outlined"
        >
          download
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    elevation: 3,
    padding: 8,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  logo: {
    marginLeft: "auto",
  },
  imageContainer: {
    marginVertical: 5,
  },
  image: {
    flex: 1,
    height: 300,
  },
});

export default Card;
