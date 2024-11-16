import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { useNavigation } from '@react-navigation/native';
const App = () => {
    const navigation = useNavigation();
    const handleContinue = () => {
      console.log("Continue pressed");
      navigation.navigate("welcome");
      // Add navigation logic or desired action
    };
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
    <View style={styles.container}>
      {/* Logo Section */}
     

      {/* Learn Words Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learn words</Text>
        <View style={styles.circularContainer}>
            <TouchableOpacity  onPress={handleContinue}>
            <Image
        source={require('../../assets/images/mala.png')} // Update the path to your image
        style={styles.images}
        resizeMode="contain"
      />
            </TouchableOpacity>
      
        </View>
      </View>

      {/* Learn More About Culture Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learn more about the culture</Text>
        <TouchableOpacity >
        <Image style={styles.culture}
          
          source={require('../../assets/images/cul.jpg')} 
           
          
        />
        </TouchableOpacity>
    
      </View>

      {/* Navigation Part */}
    
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    fontSize: 20,
    
    textAlign: "center",
    color: "#800000",
    marginBottom: 20,
  },
  section: {
    //alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight:'bold',
    color: "#000",
  },
  circularContainer: {
    marginBottom:100,
    marginTop:40,
    width: 100,
    height: 100,
   
    justifyContent: "center",
    alignItems: "center",
  },
  textInsideCircle: {
    fontSize: 40,
    color: "#800000",
  },
  image: {
    width: 200,
    height: 100,
    borderRadius: 10,
  },
  navigationButton: {
    marginTop: 20,
    backgroundColor: "#ADD8E6",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  navigationText: {
    fontSize: 16,
    color: "#000",
  },
  images:{
    height:200,
    width:200
  },
  culture:{
    height:300,
    width:300
  }
});

export default App;
