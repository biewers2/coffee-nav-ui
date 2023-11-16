import { ThemeProvider } from "@rneui/themed";
import { Slot } from "expo-router";

export default function RootLayout() {
  return <ThemeProvider><Slot/></ThemeProvider>;
}