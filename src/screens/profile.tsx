import axios from "axios";
import React, { FC, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  TextInput,
} from "react-native";
import { Avatar, Button, Surface } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

// components
import Info from "../components/info";
import ImageViewer from "../components/imageViewer";

// utils
import { errorMessage, successMessage } from "../utils/notification";

// lib
import { getClipboardData } from "../lib/clipboard";

const randomNumber = (): number => {
  const date = new Date();
  return date.getTime();
};

const downloadImage = async (url: string) => {
  let mediaPermission = await MediaLibrary.requestPermissionsAsync();
  mediaPermission = await MediaLibrary.getPermissionsAsync();

  if (mediaPermission.status === "granted") {
    const fileName = "isave-profile-" + randomNumber() + ".jpg";
    FileSystem.downloadAsync(url, FileSystem.documentDirectory + fileName)
      .then(async ({ uri }) => {
        await MediaLibrary.saveToLibraryAsync(uri);
        successMessage("Profile image saved to gallery");
        await FileSystem.deleteAsync(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    alert("Required permission in order to download");
  }
};

interface DATAProps {
  profile_image: string;
  followers: string;
  following: string;
  name: string;
  username: string;
}

const { width } = Dimensions.get("screen");

const Profile: FC = () => {
  const [text, setText] = useState<string>("");
  const [prevText, setPrevText] = useState<string>("");
  const [DATA, setData] = useState<DATAProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageVisible, setImageVisible] = useState<boolean>(false);
  const [showClearInputBtn, setShowClearInputBtn] = useState<boolean>(false);

  const similarUsernameCheck = (): boolean => {
    if (text === prevText) {
      return false;
    }

    return true;
  };

  const isUrl = (): string => {
    const profile_url = new RegExp(
      "(https?://(?:www.)?instagram.com/([^/?#&]+)).*"
    );

    if (text.match(profile_url)) {
      const s = text.split("/")[3];
      return s.split("?")[0];
    }

    return text;
  };

  const fetchApi = async () => {
    if (text && similarUsernameCheck()) {
      setLoading(true);
      try {
        const send = isUrl();
        const { data } = await axios.post("/profile", {
          username: send,
        });
        setPrevText(text);
        setData(data);
      } catch (err) {
        setPrevText("");
        errorMessage("No user found!");
      }
      setLoading(false);
    }
  };

  const closeImage = () => {
    setImageVisible(false);
  };

  const openImage = () => {
    setImageVisible(true);
  };

  const input = (text: string) => {
    setText(text);

    if (text.length > 0) setShowClearInputBtn(true);
    else setShowClearInputBtn(false);
  };

  const setClipboard = async () => {
    const res = await getClipboardData();
    setText(res);
    setShowClearInputBtn(true);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.inputOptions}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Paste the profile url or enter the username"
              value={text}
              onChangeText={input}
              selectionColor="#bbbfca"
              style={styles.input}
              autoCapitalize="none"
              onSubmitEditing={fetchApi}
            />
            {showClearInputBtn ? (
              <Pressable
                onPress={() => {
                  setText("");
                  setShowClearInputBtn(false);
                }}
                style={{ marginLeft: 5 }}
              >
                <Feather name="x" size={22} color="black" />
              </Pressable>
            ) : (
              <Pressable onPress={setClipboard} style={{ marginLeft: 5 }}>
                <Feather name="link-2" color="black" size={22} />
              </Pressable>
            )}
          </View>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={fetchApi}
            loading={loading}
            disabled={loading}
          >
            submit
          </Button>
        </View>
        {DATA ? (
          <>
            <View style={styles.cardContainer}>
              <Surface style={styles.surface}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Pressable onPress={openImage}>
                    <Avatar.Image
                      size={width / 4}
                      source={{ uri: DATA.profile_image }}
                    />
                  </Pressable>
                  <View>
                    <Text style={styles.profileText} numberOfLines={1}>
                      {DATA.username}
                    </Text>
                    <Text style={styles.profileText} numberOfLines={1}>
                      Name :{" "}
                      {DATA.name
                        ? DATA.name.length > 20
                          ? DATA.name.slice(0, 20) + "..."
                          : DATA.name
                        : "N/A"}
                    </Text>
                    <Text style={styles.profileText}>
                      Followers : {DATA.followers}
                    </Text>
                    <Text style={styles.profileText}>
                      Following : {DATA.following}
                    </Text>
                  </View>
                </View>
                <Button
                  mode="outlined"
                  icon="download"
                  style={styles.btn}
                  onPress={() => downloadImage(DATA.profile_image)}
                >
                  download profile picture
                </Button>
              </Surface>
            </View>
            <ImageViewer
              visible={imageVisible}
              onDismiss={closeImage}
              imageUrl={DATA.profile_image}
            />
          </>
        ) : (
          <Info text="Paste the url or enter the username" />
        )}
      </ScrollView>
      <StatusBar hidden={imageVisible} hideTransitionAnimation="slide" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  inputOptions: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
    padding: 15,
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  surface: {
    elevation: 3,
    padding: 8,
    borderRadius: 10,
  },
  profileText: {
    fontFamily: "regular",
    fontSize: 15,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: "regular",
  },
  btn: {
    marginTop: 10,
    elevation: 0,
  },
  btnText: {
    color: "white",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontFamily: "semi_bold",
  },
});

export default Profile;
