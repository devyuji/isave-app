import React from "react";
import { View, Text } from "react-native";

function Info() {
  return (
    <View style={{ marginTop: "30%" }}>
      <Text
        style={{
          fontFamily: "regular",
          fontSize: 18,
          textTransform: "capitalize",
          textAlign: "center",
        }}
      >
        isave doesn't require your Instagram login credentials.
      </Text>
    </View>
  );
}

export default Info;
