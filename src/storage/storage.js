import AsyncStorage from 
"@react-native-async-storage/async-storage";


// Save Data

export const saveData = async(key,value)=>{

    try{

        await AsyncStorage.setItem(
            key,
            value
        );

    }

    catch(error){

        console.log(error);

    }

};



// Get Data

export const getData = async(key)=>{

    try{

        const data = await AsyncStorage.getItem(key);

        return data;

    }

    catch(error){

        console.log(error);

    }

};



// Remove Data

export const removeData = async(key)=>{

    try{

        await AsyncStorage.removeItem(key);

    }

    catch(error){

        console.log(error);

    }

};