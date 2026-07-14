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

import { addCategory } from "../services/categoryService";

export default function AddCategoryScreen({ navigation }) {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const saveCategory = async () => {
    if (!categoryName.trim()) {
      Alert.alert("Error", "Please enter category name.");
      return;
    }

    try {
      setLoading(true);

      await addCategory(categoryName);
      Alert.alert("Success", "Category added successfully.");

      navigation.goBack();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Unable to add category."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Category</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Category Name"
        value={categoryName}
        onChangeText={setCategoryName}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveCategory}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#427AA1" />
        ) : (
          <Text style={styles.buttonText}>
            Save Category
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
    justifyContent: "center",
    fontFamily: "Arial",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#064789",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Arial",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Arial",
  },

  button: {
    backgroundColor: "#427AA1",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    fontFamily: "Arial",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
  },

  cancelButton: {
    marginTop: 15,
    alignItems: "center",
    fontFamily: "Arial",
  },

  cancelText: {
    color: "#A5BE00",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Arial",
  },
});