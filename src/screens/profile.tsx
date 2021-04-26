import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Surface, TextInput } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

// components
import Info from "../components/info";

// utils
import { flashMessage } from "../utils/flashMessage";

function Profile() {
  const [text, setText] = useState<string>("");
  const [prevText, setPrevText] = useState<string>("");
  const [DATA, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const similarUsernameCheck = (): boolean => {
    if (text === prevText) {
      return false;
    }

    return true;
  };

  const fetchApi = async () => {
    if (text && similarUsernameCheck()) {
      setLoading(true);
      try {
        const { data } = await axios.post("/profile", {
          username: text,
        });
        setPrevText(text);
        setData(data);
      } catch (err) {
        setPrevText("");
        alert("no user found!");
      }
      setLoading(false);
    }
  };

  const randomNumber = (): number => {
    const date = new Date();
    return date.getTime();
  };

  const downloadImage = async (url: string) => {
    let mediaPermission = await MediaLibrary.requestPermissionsAsync();
    mediaPermission = await MediaLibrary.getPermissionsAsync();

    if (mediaPermission.status === "granted") {
      const fileName = "isave-profile" + randomNumber() + ".jpg";
      FileSystem.downloadAsync(url, FileSystem.documentDirectory + fileName)
        .then(({ uri }) => {
          MediaLibrary.saveToLibraryAsync(uri);
          flashMessage("saved to gallery");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Required permission in order to download");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Enter username"
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor="#bbbfca"
          style={{
            backgroundColor: "#fff",
          }}
        />
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
        <View style={styles.cardContainer}>
          <Surface style={styles.surface}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Avatar.Image size={120} source={{ uri: DATA.profile_image }} />
              <View>
                <Text style={styles.profileText} numberOfLines={1}>
                  Name :{" "}
                  {DATA.name
                    ? DATA.name.length > 20
                      ? DATA.name.slice(0, 20) + "..."
                      : DATA.name
                    : "N/A"}
                </Text>
                <Text style={styles.profileText} numberOfLines={1}>
                  Username : {DATA.username}
                </Text>
                <Text style={styles.profileText}>
                  Following : {DATA.following}
                </Text>
                <Text style={styles.profileText}>
                  Followers : {DATA.followers}
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
      ) : (
        <Info />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  inputContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  btn: {
    marginTop: 10,
    elevation: 0,
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  surface: {
    elevation: 3,
    padding: 8,
    borderRadius: 5,
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
});

export default Profile;
