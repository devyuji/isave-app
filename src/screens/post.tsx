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

  const similarUrlCheck = (): boolean => {
    if (text === prevText) {
      return false;
    }

    return true;
  };

  const fetchApi = async () => {
    if (text && similarUrlCheck()) {
      setLoading(true);
      try {
        const { data } = await axios.post("/post", {
          url: text,
        });
        setPrevText(text);
        setData(data);
      } catch (err) {
        setPrevText("");
        alert(err);
      }
      setLoading(false);
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
        {DATA ? (
          <Card data={DATA} />
        ) : (
          <Info text="Copy the post url and paste it." />
        )}
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
