import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import API from "../services/api";

export default function EditProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await API.get("/user/profile");

      setName(response.data.user.name);
      setEmail(response.data.user.email);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Unable to load profile."
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const updateProfile = async () => {
    if (name.trim() === "") {
      Alert.alert("Validation", "Name cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.put("/user/profile", {
        name,
      });

      Alert.alert(
        "Success",
        response.data.message || "Profile Updated Successfully",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Profile")
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Profile update failed."
      );
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#064789" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>

      <Text style={styles.label}>Name</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Email</Text>

      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={email}
        editable={false}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={updateProfile}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#427AA1" />
        ) : (
          <Text style={styles.buttonText}>Update Profile</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F4F6F8",
    padding: 20,
    justifyContent: "center",
    fontFamily: "Arial",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#064789",
    marginBottom: 30,
    fontFamily: "Arial",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
    fontFamily: "Arial",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "Arial",
  },

  disabledInput: {
    backgroundColor: "#EEEEEE",
    color: "#666666",
    fontFamily: "Arial",
  },

  button: {
    backgroundColor: "#064789",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
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