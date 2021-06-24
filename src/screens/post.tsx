import axios from "axios";
import React, { FC, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

// components
import Card from "../components/card";
import Info from "../components/info";
import { errorMessage } from "../utils/notification";

const Post: FC = () => {
  const [text, setText] = useState<string>("");
  const [prevText, setPrevText] = useState<string>("");
  const [DATA, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showClearInputBtn, setShowClearInputBtn] = useState<boolean>(false);

  const similarUrlCheck = (): boolean => {
    if (text === prevText) {
      return false;
    }

    return true;
  };

  const urlChecker = (): boolean => {
    const p = new RegExp("(https?://(?:www.)?instagram.com/p/([^/?#&]+)).*");
    const tv = new RegExp("(https?://(?:www.)?instagram.com/tv/([^/?#&]+)).*");
    const reel = new RegExp(
      "(https?://(?:www.)?instagram.com/reel/([^/?#&]+)).*"
    );

    if (text.match(p) || text.match(tv) || text.match(reel)) return true;

    return false;
  };

  const fetchApi = async () => {
    if (text && urlChecker() && similarUrlCheck()) {
      setLoading(true);
      try {
        const { data } = await axios.post("/post", {
          url: text,
        });
        setPrevText(text);
        setData(data);
      } catch (err) {
        setPrevText("");
        errorMessage("Something went wrong try again");
      }
      setLoading(false);
    }
  };

  const input = (text: string) => {
    setText(text);

    if (text.length > 0) setShowClearInputBtn(true);
    else setShowClearInputBtn(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputOptions}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Paste url here"
            value={text}
            onChangeText={input}
            style={styles.input}
            selectionColor="#bbbfca"
            autoCapitalize="none"
            onSubmitEditing={fetchApi}
          />
          {showClearInputBtn && (
            <Pressable
              onPress={() => {
                setText("");
                setShowClearInputBtn(false);
              }}
              style={{ marginLeft: 5 }}
            >
              <Feather name="x" size={22} color="black" />
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

      <View style={styles.cardContainer}>
        {DATA ? <Card data={DATA} /> : <Info text="Just paste the url" />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputOptions: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
    padding: 15,
    overflow: "hidden",
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
  cardContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});

export default Post;
