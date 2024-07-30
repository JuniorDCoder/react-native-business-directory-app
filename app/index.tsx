import { Redirect } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Index() {
  return <Redirect href={'/home'} />
}
