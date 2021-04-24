import React from "react";
import { View, Text } from "react-native";

interface InfoProps {
  text: string;
}

function Info({ text }: InfoProps) {
  return (
    <View style={{ marginTop: "30%" }}>
      <Text
        style={{
          fontFamily: "regular",
          fontSize: 17,
          textTransform: "capitalize",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </View>
  );
}

export default Info;
