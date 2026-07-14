import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function NoteScreen({ route }) {

  const { note } = route.params;

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >

      <Text style={styles.title}>
        {note.title}
      </Text>

      <Text style={styles.content}>
        {note.content}
      </Text>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#F5F7FA",

    padding: 20,

    fontFamily: "Arial",

  },

  title: {

    fontSize: 28,

    fontWeight: "bold",

    color: "#427AA1",

    marginTop: 40,

    marginBottom: 20,

    fontFamily: "Arial",

  },

  content: {

    fontSize: 18,

    color: "#000000",

    lineHeight: 28,

    fontFamily: "Arial",

  },

});