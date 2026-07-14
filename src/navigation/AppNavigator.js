import React,
{
useContext
}
from "react";


import {
NavigationContainer
}
from "@react-navigation/native";


import {
createNativeStackNavigator
}
from "@react-navigation/native-stack";


import LoginScreen from "../screens/LoginScreen";

import SignupScreen from "../screens/SignupScreen";

import HomeScreen from "../screens/HomeScreen";

import LoadingScreen from "../screens/LoadingScreen";

import AddCategoryScreen from "../screens/AddCategoryScreen";

import CategoryScreen from "../screens/CategoryScreen";    

import AddNoteScreen from "../screens/AddNoteScreen";

import NoteScreen from "../screens/NoteScreen";

import EditCategoryScreen from "../screens/EditCategoryScreen";

import ProfileScreen from "../screens/ProfileScreen";
 
import EditProfileScreen from "../screens/EditProfileScreen";
import {
    AuthContext
}
from "../context/AuthContext";




const Stack=createNativeStackNavigator();



export default function AppNavigator(){


const {
userToken,
loading
}
=
useContext(AuthContext);



if(loading){

return <LoadingScreen />;

}



return(

<NavigationContainer>


<Stack.Navigator

screenOptions={{
headerShown:false
}}

>


{
userToken ?

(

<>
    <Stack.Screen
        name="Home"
        component={HomeScreen}
    />

    <Stack.Screen
        name="AddCategory"
        component={AddCategoryScreen}
    />

 <Stack.Screen
        name="Category"
        component={CategoryScreen}    
    /> 
    
<Stack.Screen
    name="AddNote"
    component={AddNoteScreen}
/>

<Stack.Screen
    name="Note"
    component={NoteScreen}
/>

<Stack.Screen
    name="EditCategory"
    component={EditCategoryScreen}
/>

<Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={{ title: "Profile" }}
/>

<Stack.Screen
    name="EditProfile"
    component={EditProfileScreen}
/>
</>


)


:

(

<>

<Stack.Screen

name="Login"

component={LoginScreen}

/>


<Stack.Screen

name="Signup"

component={SignupScreen}

/>


</>



)


}

</Stack.Navigator>


</NavigationContainer>


);


}