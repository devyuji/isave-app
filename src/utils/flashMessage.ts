import { ToastAndroid } from "react-native";

export const flashMessage = (msg: string) => {
  ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
};
