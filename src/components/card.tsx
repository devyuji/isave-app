import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Surface } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

// utils
import { flashMessage } from "../utils/flashMessage";

interface CardProps {
  data: any;
}

const randomNumber = (): string | number => {
  let i: number;
  let num: string | number = "";
  for (i = 1; i <= 3; i++) {
    num = num + Math.floor(Math.random() * (10 - 0)) + 0;
  }

  return num;
};

const downloadImage = async (url: string) => {
  let mediaPermission = await MediaLibrary.requestPermissionsAsync();
  mediaPermission = await MediaLibrary.getPermissionsAsync();

  if (mediaPermission.status === "granted") {
    const fileName = "isave" + randomNumber() + ".jpg";
    FileSystem.downloadAsync(url, FileSystem.documentDirectory + fileName)
      .then(({ uri }) => {
        MediaLibrary.saveToLibraryAsync(uri);
        flashMessage("Download completed");
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
    const fileName = "isave" + randomNumber() + ".mp4";
    FileSystem.downloadAsync(url, FileSystem.documentDirectory + fileName)
      .then(({ uri }) => {
        MediaLibrary.saveToLibraryAsync(uri);
        flashMessage("Download completed");
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    alert("Required permission in order to download");
  }
};

function Card({ data }: CardProps) {
  if (data.type === "image") {
    return <ImageCard image={data.image_url} index={0} />;
  } else if (data.type === "video") {
    return (
      <VideoCard
        video_img={data.links[0].video_img}
        video_url={data.links[0].video}
        index={0}
      />
    );
  } else if (data.type === "slide") {
    return data.links.map((d: any, index: number) => {
      if (d.type === "image")
        return <ImageCard image={d.image_url} index={index} />;
      else if (d.type === "video")
        return (
          <VideoCard
            video_img={d.video_img}
            video_url={d.video}
            index={index}
          />
        );
    });
  }
}

const ImageCard = ({ image, index }: { image: string; index: number }) => {
  return (
    <Surface style={styles.surface} key={index * 2}>
      <View style={styles.container}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Button
          icon="download"
          onPress={() => downloadImage(image)}
          mode="outlined"
          style={{ marginTop: 10 }}
        >
          download
        </Button>
      </View>
    </Surface>
  );
};

const VideoCard = ({
  video_img,
  video_url,
  index,
}: {
  video_img: string;
  video_url: string;
  index: number;
}) => {
  return (
    <Surface style={styles.surface} key={index}>
      <View style={styles.container}>
        <Image
          source={{
            uri: video_img,
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Button
          icon="download"
          onPress={() => downloadVideo(video_url)}
          mode="outlined"
          style={{ marginTop: 10 }}
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
    borderRadius: 5,
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#fff",
  },
  container: {},
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});

export default Card;