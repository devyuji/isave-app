import React, { FC } from "react";
import { View, Text } from "react-native";

interface InfoProps {
  text: string;
}

const Info: FC<InfoProps> = ({ text }) => {
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
        {text}
      </Text>
    </View>
  );
};

export default Info;
