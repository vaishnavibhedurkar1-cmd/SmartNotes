import React, { useContext, useCallback, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Image,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { AuthContext } from "../context/AuthContext";

import {
  getCategories,
  deleteCategory,
} from "../services/categoryService";

export default function HomeScreen({ navigation }) {

  const { logout } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);


  const loadCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, [])
  );

  const onRefresh = async () => {
  setRefreshing(true);
  await loadCategories();
  setRefreshing(false);
};

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Category",
      "Are you sure you want to delete this category?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCategory(id);
              loadCategories();
            } catch (error) {
              Alert.alert("Error", "Unable to delete category");
            }
          },
        },
      ]
    );
  };

  const renderCategory = ({ item }) => (
    <View style={styles.card}>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Category", {
            category: item,
          })
        }
      >
        <Text style={styles.cardText}>
          {item.name}
        </Text>
      </TouchableOpacity>

      <View style={styles.row}>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("EditCategory", {
              category: item,
            })
          }
        >
          <Text style={styles.actionText}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item._id)}
        >
          <Text style={styles.actionText}>
            Delete
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>

      <Text style={styles.heading}>
        Smart Notes
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.profileImage}
        />
      </TouchableOpacity>

    </View>

      <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#427AA1"
        />
      )  :(

        <FlatList
          style={{ flex: 1 }}
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={renderCategory}
          contentContainerStyle={{ flexGrow: 1,paddingBottom: 20,

           }}
          refreshControl={
  <RefreshControl
    refreshing={refreshing}
    onRefresh={onRefresh}
  />
}
         ListEmptyComponent={() => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyIcon}>📁</Text>

    <Text style={styles.empty}>
      No Categories Yet
    </Text>

    <Text style={styles.emptySub}>
      Tap "Add Category" below to create your first category.
    </Text>
  </View>
)}
 />
      )}</View>
      
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddCategory")}
      >
        <Text style={styles.buttonText}>
          + Add Category

        </Text>
      </TouchableOpacity>

      

<Text style={[styles.count ,{marginTop: 20}]}>
📘Total Categories: {categories.length}
</Text>
 </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
    fontFamily: "Arial",
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#064789",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 25,
    fontFamily: "Arial",
    
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    fontFamily: "Arial",
    
  },

  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    fontFamily: "Arial",
    
  },

  empty: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 18,
    color: "#6B7280",
    fontFamily: "Arial",
    
  },

  addButton: {
    backgroundColor: "#064789",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    fontFamily: "Arial",
    
  },

  

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
  },

  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    fontFamily: "Arial",
  },

  editButton: {
    backgroundColor: "#427AA1",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
    fontFamily: "Arial",
  },

  deleteButton: {
    backgroundColor: "#8ca766",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    fontFamily: "Arial",
  },

  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Arial",
  },

  count: {
  textAlign: "center",
  marginBottom: 15,
  color: "#6B7280",
  fontSize: 16,
  fontFamily: "Arial",
},

emptyContainer: {
  alignItems: "center",
  marginTop: 80,
  fontFamily: "Arial",
},

emptyIcon: {
  fontSize: 60,
  marginBottom: 10,
  fontFamily: "Arial",
},

emptySub: {
  textAlign: "center",
  color: "#9CA3AF",
  fontSize: 15,
  marginTop: 8,
  paddingHorizontal: 20,
  fontFamily: "Arial",
},

header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginHorizontal: 20,
  marginTop: 15,
  marginBottom: 10,
  fontFamily: "Arial",
},

profileImage: {
  width: 42,
  height: 42,
  borderRadius: 21,
  borderWidth: 2,
  borderColor: "#c4c4c6",
  fontFamily: "Arial",
},



});






