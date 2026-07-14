import React, { useState, useEffect,useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  
  
} from "react-native";

import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "http://172.16.1.79:8000/api";

export default function ProfileScreen({ navigation }) {
    const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    totalNotes: 0,
    pinnedNotes: 0,
    archivedNotes: 0,
    totalCategories: 0,
  });

  useEffect(() => {
        getProfile();
    }, []);

  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
console.log(res.data);



      setUser(res.data.user);
      setStats(res.data.stats);
    } catch (error) {
  console.log("PROFILE ERROR:");
  console.log(error.response?.data);
  console.log(error.message);

         Alert.alert("Error", "Unable to load profile");
       }finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async (logoutUser) => {
          await logout();
        },
      },
    ]
  );
};

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#427AA1" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
  source={{
    uri:
      user?.profileImage ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  }}
  style={styles.image}
/>

        <Text style={styles.name}>{user?.name}</Text>

          <Text style={styles.email}>{user?.email}</Text>

            <Text style={styles.date}>
            Joined :
             {user?.createdAt
                ? new Date(user.createdAt).toDateString()
                 : ""}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.item}>
          📝 Total Notes : {stats.totalNotes}
        </Text>

        <Text style={styles.item}>
          📌 Pinned Notes : {stats.pinnedNotes}
        </Text>

       

        <Text style={styles.item}>
          🏷 Categories : {stats.totalCategories}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.buttonText}>
          Edit Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logout]}
        onPress={logout}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    fontFamily: "Arial",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  },

  imageContainer: {
    alignItems: "center",
    marginTop: 30,
    fontFamily: "Arial",
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    fontFamily: "Arial",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
    fontFamily: "Arial",
  },

  email: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
    fontFamily: "Arial",
  },

  date: {
    marginTop: 5,
    color: "#555",
    fontFamily: "Arial",
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    fontFamily: "Arial",
  },

  item: {
    fontSize: 18,
    marginVertical: 10,
    fontFamily: "Arial",
  },

  button: {
    backgroundColor: "#064789",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    fontFamily: "Arial",
  },

  logout: {
    backgroundColor: "#427AA1",
    fontFamily: "Arial",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Arial",
  },
});