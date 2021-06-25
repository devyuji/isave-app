import Clipboard from "expo-clipboard";

export const getClipboardData = async () => {
  const res = await Clipboard.getStringAsync();
  return res;
};
