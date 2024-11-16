import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Colors from "@/constants/Colors";

const App = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    console.log("Continue pressed");
    navigation.navigate("welcome"); // Navigate to "welcome" screen
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: false,
          headerStyle: {
            backgroundColor: "#f8f8f8", 
            // Light background color
          },
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 20 }}
            >
              <Image
                source={require("../../assets/images/title.png")} // Update the path to your image
                style={{ width: 40, height: 40, borderRadius: 10 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        {/* Learn Words Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learn words</Text>
          <View style={styles.circularContainer}>
            <TouchableOpacity onPress={handleContinue}>
              <Image
                source={require("../../assets/images/mala.png")} // Update the path to your image
                style={styles.images}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Learn More About Culture Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learn more about the culture</Text>
          <TouchableOpacity>
            <Image
              style={styles.culture}
              source={require("../../assets/images/cul.png")} // Update the path to your image
            />
          </TouchableOpacity>
        </View>

        {/* Navigation Button */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Goto AR/VR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align everything from the top
    alignItems: "center",
    backgroundColor: Colors.bgColor,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  section: {
    alignItems: "center",
    marginBottom: 40,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 22, // Larger and consistent heading
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333", // Softer black
  },
  circularContainer: {
    width: 120, // Larger for visibility
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f8f8f8", // Subtle background
    borderWidth: 2,
    borderColor: "#800000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  images: {
    height: 100,
    width: 100,
    borderRadius: 50, // Make the image circular
  },
  culture: {
    height: 250,
    width: 250,
    borderRadius: 15, // Rounded corners for better look
  },
  buttons: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#9B1C1C", // Dark red button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: "90%", // Full-width button
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default App;
