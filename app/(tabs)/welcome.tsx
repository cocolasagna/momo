import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Stack } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import { Audio } from "expo-av"; 
import { Ionicons } from "@expo/vector-icons";

const HomePage = () => {

  const headerHeight = useHeaderHeight();
  const [sound, setSound] = useState();
  const navigation = useNavigation();
  const handleContinue = () => {
    
      navigation.navigate("voicelearn");
     
    
    
  };
  // Play MP3 on button click
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/la.mp3") // Replace with the correct path to your MP3
    );
    setSound(sound);
    await sound.playAsync();
  };

  // Function to load and play sound when the button is clicked
 

  return (
    <>
     <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {

            }} style={{ marginLeft: 20 }}>
                  <Image
        source={require('../../assets/images/title.png')} // Update the path to your image
        style={{ width: 40, height: 40, borderRadius: 10 }}
        resizeMode="contain"
      />
            </TouchableOpacity>
              
          ),
        }}
      />
      <View style={[styles.container, { paddingTop: headerHeight + 10 }]}>
      
    <Text style={styles.headingTxt}>Learn a new Word</Text>
      {/* Title Image */}
      <View style = {styles.letter}>
      <Text style={styles.Txt}>लः</Text>
      
      <Text style={styles.subtitle}>
      लः means water
      </Text>
      <TouchableOpacity onPress={playSound} style={styles.vol}>
    <Ionicons name="volume-medium" style={styles.volume} />
  </TouchableOpacity>
      </View>
<View style= {styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: Colors.bgColor,
   
  },
  titleImage: {
    width: 200,  // Adjust width as needed
    height: 200, // Adjust height as needed
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: "#333333",
    textAlign: "center",
    marginTop: 2,
    marginHorizontal: 20,
    fontFamily:'Nithya',
  },
  button: {
    backgroundColor: "#9B1C1C", // Button dark red
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    position: "absolute",
    bottom: 50,
    width: "95%",
    justifyContent:'center',
    alignItems:'center',
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  headingTxt: {
    fontSize: 30,
    color: Colors.black,
    marginTop: 10,
  },
  Txt:{
    color: Colors.darkred,
    fontSize: 200,
    fontFamily:'Nithya',
  },
  letter:{
    margin:90
  },
  buttons:{
    margin :70,
    justifyContent:'center',
    alignItems:"center"
  },
  volume: {
    color: Colors.blue,
    fontSize: 30,
  },
  vol:{
    marginHorizontal:80,
    marginVertical:10
  }
  
});
