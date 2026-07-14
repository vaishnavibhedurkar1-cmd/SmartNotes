import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import { createNote } from "../services/noteService";

export default function AddNoteScreen({ navigation, route }) {
  const { categoryId } = route.params;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const saveNote = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await createNote({
        title,
        content,
        categoryId,
      });

      Alert.alert("Success", "Note Added Successfully");

      navigation.goBack();

    } catch (error) {

      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Unable to add note."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Add Note
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.content]}
        placeholder="Write your note..."
        multiline
        value={content}
        onChangeText={setContent}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveNote}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#427AA1" />
        ) : (
          <Text style={styles.buttonText}>
            Save Note
          </Text>
        )}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    fontFamily: "Arial",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#427AA1",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Arial",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Arial",
  },

  content: {
    height: 150,
    textAlignVertical: "top",
    fontFamily: "Arial",
  },

  button: {
    backgroundColor: "#427AA1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    fontFamily: "Arial",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Arial",
  },

});