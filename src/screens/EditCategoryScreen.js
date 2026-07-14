import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { updateCategory } from "../services/categoryService";

export default function EditCategoryScreen({
  navigation,
  route,
}) {

  const { category } = route.params;

  const [name, setName] = useState(category.name);

  const saveCategory = async () => {

    if (!name.trim()) {

      Alert.alert(
        "Error",
        "Category name is required"
      );

      return;

    }

    try {

      await updateCategory(
        category._id,
        {
          name,
        }
      );

      Alert.alert(
        "Success",
        "Category Updated"
      );

      navigation.goBack();

    } catch (error) {

      Alert.alert(
        "Error",
        "Unable to update category"
      );

    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Edit Category
      </Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveCategory}
      >

        <Text style={styles.buttonText}>
          Update Category
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    padding: 20,

    justifyContent: "center",

    backgroundColor: "#fff",

    fontFamily: "Arial",

  },

  heading: {

    fontSize: 28,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 30,

    color: "#064789",

    fontFamily: "Arial",

  },

  input: {

    borderWidth: 1,

    borderColor: "#ccc",

    borderRadius: 10,

    padding: 15,

    marginBottom: 20,

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