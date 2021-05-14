import { showMessage } from "react-native-flash-message";

export const successMessage = (msg: string) => {
  showMessage({
    message: msg,
    backgroundColor: "#000",
    color: "#fff",
  });
};

export const errorMessage = (msg: string) => {
  showMessage({
    message: msg,
    type: "danger",
  });
};
