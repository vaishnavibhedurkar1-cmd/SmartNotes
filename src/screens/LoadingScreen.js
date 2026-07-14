import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#427AA1" />

      <Text style={styles.text}>
        Loading Smart Notes...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    fontFamily: "Arial",
  },

  text: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
  },
});