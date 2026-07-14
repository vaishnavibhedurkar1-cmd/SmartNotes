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

import API from "../services/api";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signupUser = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      Alert.alert("Success", "Registration Successful");

      navigation.replace("Login");
     
    }catch (error) {
  console.log("Signup Error:", error.response?.data);
  console.log("Full Error:", error);

  Alert.alert(
    "Signup Failed",
    JSON.stringify(error.response?.data) || error.message
  );
}
    finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={signupUser}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Signup</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    fontFamily: "Arial",
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#064789",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Arial",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontFamily: "Arial",
  },

  button: {
    backgroundColor: "#064789",
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

  link: {
    color: "#427AA1",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Arial",
  },
});