import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av"; // Import Audio from expo-av
import Colors from "@/constants/Colors";
import { useNavigation } from '@react-navigation/native'; // Navigation hook

const VoicePage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [cardColors, setCardColors] = useState<{ [key: string]: string }>({
    "माल": "#f8f8f8",
    "Bag": "#f8f8f8",
    "ख": "#f8f8f8",
    "Sujan": "#f8f8f8",
  });
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [correctCard, setCorrectCard] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [buttonText, setButtonText] = useState("Check");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [currentSoundKey, setCurrentSoundKey] = useState<string | null>(null); // To store the current sound
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();

  const soundFiles: { [key: string]: any } = {
    mala: require("../../assets/sounds/mala.mp3"),
    bag: require("../../assets/sounds/bag.mp3"),
    money: require("../../assets/sounds/money.mp3"),
    sujan: require("../../assets/sounds/sujan.mp3"),
  };

  const soundToTextMap: { [key: string]: string } = {
    mala: "माल",
    bag: "क",
    money: "ख",
    sujan: "घ"
  };

  // Stop the current sound if it exists and then play the new one
  const stopAndPlaySound = async (soundKey: string) => {
    if (sound) {
      await sound.stopAsync(); // Stop the current sound
      await sound.unloadAsync(); // Unload it to free up resources
    }

    // Now play the new sound
    const { sound: newSound } = await Audio.Sound.createAsync(soundFiles[soundKey]);
    setSound(newSound); // Set the new sound to state
    await newSound.playAsync(); // Play the new sound
  };

  // Play the sound based on currentSoundKey
  const playSound = async () => {
    if (currentSoundKey && soundFiles[currentSoundKey]) {
      await stopAndPlaySound(currentSoundKey);
    }
  };

  // Play the first sound and set the correct answer (no randomization)
  const playFirstSound = async () => {
    const firstKey = "mala"; // Change this to the first sound you want to play
    setCurrentSoundKey(firstKey); // Set the current sound key
    setCorrectCard(soundToTextMap[firstKey]); // Set correct card for the first sound

    // Now play the sound
    await stopAndPlaySound(firstKey); // Stop any existing sound and play the first one
  };

  // Check the selected card against the correct card
  const checkCard = () => {
    if (selectedCard && correctCard) {
      const isCorrect = selectedCard === correctCard;

      // Set the result of correctness immediately
      setIsAnswerCorrect(isCorrect);
      setMessage(isCorrect ? "Well Done!" : "Try Again");
      setButtonText(isCorrect ? "Continue" : "Retry");

      // Change the background color of the selected card based on correctness
      setCardColors((prevColors) => ({
        ...prevColors,
        [selectedCard]: isCorrect ? Colors.green : "red", // Instant color change on selected card
      }));
    }
  };

  // Continue to the next screen or reset the game
  const handleContinue = () => {
    if (isAnswerCorrect) {
      navigation.navigate("index");
      resetGame();
    } else {
      reset();
    }
  };

  // Reset the game state and play the first sound
  const resetGame = () => {
    setSelectedCard(null);
    setCardColors({
        माल: "#f8f8f8",
      क: "#f8f8f8",
      ख: "#f8f8f8",
      घ: "#f8f8f8",
    });
    setMessage("");
    setButtonText("Check");
    setIsAnswerCorrect(null);
    playFirstSound(); // Play the first sound after reset
  };

  const reset = () => {
    setSelectedCard(null);
    setCardColors({
        माल: "#f8f8f8",
      क: "#f8f8f8",
      ख: "#f8f8f8",
      घ: "#f8f8f8",
    });
    setMessage("");
    setButtonText("Check");
    setIsAnswerCorrect(null);
    // Do not play a sound after reset, but you can adjust this as needed
  };

  useEffect(() => {
    if (!currentSoundKey) {
      playFirstSound(); // Initialize the game by playing the first sound if no sound is set
    } else {
      playSound(); // Play the same sound if a sound key is already set
    }

    return () => {
      if (sound) {
        sound.unloadAsync(); // Cleanup the sound when the component is unmounted
      }
    };
  }, [currentSoundKey]); // Re-run the effect when the currentSoundKey changes

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: 20 }}>
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
        <Text style={styles.headingTxt}>What do you hear?</Text>

        <View style={styles.play}>
          <TouchableOpacity onPress={playSound} style={styles.playsound}>
            <Ionicons name="volume-medium" style={styles.volume} />
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
          {Object.keys(soundToTextMap).map((soundKey, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.card,
                { backgroundColor: cardColors[soundToTextMap[soundKey]] }, // This will reflect the updated color
                selectedCard === soundToTextMap[soundKey] && { 
                  borderWidth: 3, 
                 
                  borderColor:isAnswerCorrect === null ? "rgba(116,195,252,0.2)" : isAnswerCorrect ? Colors.darkgreen : Colors.darkred,
                  backgroundColor: isAnswerCorrect === null ? "rgba(116,195,252,0.2)" : isAnswerCorrect ? Colors.green : Colors.red,
                } // Highlight selected card with border and soft color if selected
              ]}
              onPress={() => setSelectedCard(soundToTextMap[soundKey])}
            >
              <Text style={styles.cardText}>{soundToTextMap[soundKey]}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: isAnswerCorrect === null ? Colors.blue : isAnswerCorrect ? Colors.darkgreen : Colors.darkred }]} // Button color change
            onPress={isAnswerCorrect === null ? checkCard : handleContinue} // Ensure sound does not play during check
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: Colors.bgColor,
  },
  headingTxt: {
    fontSize: 30,
    color: Colors.black,
    marginTop: 10,
  },
  playsound: {
    backgroundColor: Colors.blue,
    width: 150,
    height: 150,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
 
  },
  volume: {
    color: Colors.white,
    fontSize: 100,
  },
  play: {
    margin: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Ensures cards are spaced evenly
    marginTop: 20,
  },
  card: {
    width: "48%", // Each card takes up 48% of the container's width, leaving space for two cards per row
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 10,
    shadowColor: Colors.grey,
    borderWidth:2,
    borderColor:Colors.grey,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  cardText: {
    color: Colors.black,
    fontSize: 30,
    fontFamily:'Nithya',
    //fontWeight: "bold",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default VoicePage;
