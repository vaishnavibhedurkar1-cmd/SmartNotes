import React, { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const loginUser = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill all fields");
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

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      await login(response.data.token);

      Alert.alert("Success", "Login Successful");
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Smart Notes</Text>

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
        onPress={loginUser}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#427AA1" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>
          Don't have an account? Signup
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