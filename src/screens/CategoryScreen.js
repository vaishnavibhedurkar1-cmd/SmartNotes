import React, { useState, useCallback } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TextInput,
  
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import {
  getNotesByCategory,
  deleteNote,
  togglePinNote,
} from "../services/noteService";

export default function CategoryScreen({ navigation, route }) {
  const { category } = route.params;

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
   const [search, setSearch] = useState("");

const onRefresh = async () => {
  setRefreshing(true);
  await loadNotes();
  setRefreshing(false);
};

  const loadNotes = async () => {
    try {
      setLoading(true);

      const data = await getNotesByCategory(category._id);

      setNotes(data);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Unable to load notes.");
    } finally {
      setLoading(false);
    }
  };
   const filteredNotes = notes
  .filter((note) => {

    const title = note.title || "";
    const content = note.content || "";

    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      content.toLowerCase().includes(search.toLowerCase())
    );

  })

  .sort((a, b) => {

    return b.isPinned - a.isPinned;

  });
    useFocusEffect(
    useCallback(() => {
      loadNotes();
//        

    }, [])
  );


   const handlePin = async (id) => {

  try {

    await togglePinNote(id);

    loadNotes();

  } catch (error) {

    Alert.alert(
      "Error",
      "Unable to pin note."
    );

  }

};

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
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
              await deleteNote(id);

              Alert.alert(
                "Success",
                "Note deleted successfully."
              );

              loadNotes();
            } catch (error) {
              Alert.alert(
                "Error",
                "Unable to delete note."
              );
            }
          },
        },
      ]
    );
  };

  const renderNote = ({ item }) => (

<View style={styles.noteCard}>

<TouchableOpacity
onPress={() =>
navigation.navigate("Note", {
note: item,
})
}

onLongPress={() => handleDelete(item._id)}
>

<Text style={styles.noteTitle}>

{item.title}

</Text>

<Text
style={styles.noteContent}
numberOfLines={2}
>

{item.content}

</Text>

</TouchableOpacity>

<View style={styles.row}>

<TouchableOpacity

style={styles.pinButton}

onPress={() => handlePin(item._id)}

>

<Text style={styles.pinText}>

{item.isPinned ? "unpin" : " 📌pin"}

</Text>

</TouchableOpacity>

</View>

</View>

);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {category.name}
      </Text>

<TextInput
  style={styles.search}
  placeholder="Search notes..."
  placeholderTextColor="#888"
  value={search}
  onChangeText={setSearch}
/>

<Text style={styles.count}>
Total Notes : {filteredNotes.length}
</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#427AA1"
        />
 ) : (
       

        <FlatList
        style={{ flex: 1 }}
         
          data={filteredNotes}
          keyExtractor={(item) => item._id}
          renderItem={renderNote}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20,
   }}
           refreshControl={
  <RefreshControl
    refreshing={refreshing}
    onRefresh={onRefresh}
  />
           }
          ListEmptyComponent={() => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyIcon}></Text>

    <Text style={styles.empty}>
      No Notes Yet
    </Text>

    <Text style={styles.emptySub}>
      Tap "Add Note" below to create your first note.
    </Text>
  </View>
)}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("AddNote", {
            categoryId: category._id,
          })
        }
      >
        <Text style={styles.buttonText}>
          + Add Note
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
    fontFamily: "Arial",
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#064789",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 20,
    fontFamily: "Arial",
  },

  noteCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    fontFamily: "Arial",
  },

  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: "Arial",
  },

  noteContent: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
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
    backgroundColor: "#427AA1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
    fontFamily: "Arial",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
  },

  row:{
flexDirection:"row",
justifyContent:"flex-end",
marginTop:12,
fontFamily: "Arial",
},

editButton:{
backgroundColor:"#10B981",
paddingHorizontal:15,
paddingVertical:8,
borderRadius:8,
marginRight:10,
fontFamily: "Arial",
},

deleteButton:{
backgroundColor:"#679436",
paddingHorizontal:15,
paddingVertical:8,
borderRadius:8,
fontFamily: "Arial",
},

actionText:{
color:"#fff",
fontWeight:"bold",
fontFamily: "Arial",
},

emptyContainer: {
  flex: 1,
  justifyContent: "center",
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

count: {
  textAlign: "center",
  marginBottom: 15,
  color: "#6B7280",
  fontSize: 16,
  fontWeight: "600",
  fontFamily: "Arial",
},

search: {
  height: 50,
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#064789",
  borderRadius: 10,
  paddingHorizontal: 15,
  marginBottom: 15,
  fontSize: 16,
  fontFamily: "Arial",
},

pinButton:{

backgroundColor:"#427AA1",

paddingHorizontal:15,

paddingVertical:8,

borderRadius:8,

marginTop:12,

alignSelf:"flex-end",

},

pinText:{

color:"#fff",

fontWeight:"bold",

fontSize:15,

},



});