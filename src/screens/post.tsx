import axios from "axios";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

// components
import Card from "../components/card";
import Info from "../components/info";

function Post() {
  const [text, setText] = useState<string>("");
  const [prevText, setPrevText] = useState<string>("");
  const [DATA, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

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
      setError(false);
      setLoading(true);
      try {
        const { data } = await axios.post("/post", {
          url: text,
        });
        setPrevText(text);
        setData(data);
      } catch (err) {
        setPrevText("");
        alert("Check Account Type Maybe Its A Private Account Try Again Later");
      }
      setLoading(false);
    } else {
      setError(true);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Paste url here"
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor="#bbbfca"
          style={{ backgroundColor: "#fff" }}
          error={error}
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

      <View style={styles.cardContainer}>
        {DATA ? <Card data={DATA} /> : <Info />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
    marginHorizontal: 20,
  },
});

export default Post;
