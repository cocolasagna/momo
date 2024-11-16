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
    "Dog": "#f8f8f8",
    "Bag": "#f8f8f8",
    "Money": "#f8f8f8",
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
    apt: require("../../assets/sounds/apt.mp3"),
    bag: require("../../assets/sounds/bag.mp3"),
    money: require("../../assets/sounds/money.mp3"),
    sujan: require("../../assets/sounds/sujan.mp3"),
  };

  const soundToTextMap: { [key: string]: string } = {
    apt: "Dog",
    bag: "Bag",
    money: "Money",
    sujan: "Sujan"
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

  // Play a random sound and set the correct answer
  const playRandomSound = async () => {
    const randomKeys = Object.keys(soundToTextMap);
    const randomKey = randomKeys[Math.floor(Math.random() * randomKeys.length)];

    setCurrentSoundKey(randomKey); // Store the new sound key
    setCorrectCard(soundToTextMap[randomKey]); // Set correct card

    // Now play the sound
    await stopAndPlaySound(randomKey); // Stop any existing sound and play the new one
  };

  // Check the selected card against the correct card
  const checkCard = () => {
    if (selectedCard && correctCard) {
      const isCorrect = selectedCard === correctCard;
      setIsAnswerCorrect(isCorrect);
      setMessage(isCorrect ? "Well Done!" : "Try Again");
      setButtonText(isCorrect ? "Continue" : "Try Again");

      // Change card color based on correctness
      setCardColors((prevColors) => ({
        ...prevColors,
        [selectedCard]: isCorrect ? Colors.green : "red",
      }));
    }
  };

  // Continue to the next screen or reset the game
  const handleContinue = () => {
    if (isAnswerCorrect) {
      navigation.navigate("letter");
      resetGame();
    } else {
      reset();
    }
  };

  // Reset the game state and play a new random sound
  const resetGame = () => {
    setSelectedCard(null);
    setCardColors({
      Dog: "#f8f8f8",
      Bag: "#f8f8f8",
      Money: "#f8f8f8",
      Sujan: "#f8f8f8",
    });
    setMessage("");
    setButtonText("Check");
    setIsAnswerCorrect(null);
    playRandomSound(); // Play a new random sound after reset
  };

  const reset = () => {
    setSelectedCard(null);
    setCardColors({
      Dog: "#f8f8f8",
      Bag: "#f8f8f8",
      Money: "#f8f8f8",
      Sujan: "#f8f8f8",
    });
    setMessage("");
    setButtonText("Check");
    setIsAnswerCorrect(null);
    // Play a new random sound after reset
  };

  useEffect(() => {
    if (!currentSoundKey) {
      playRandomSound(); // Initialize the game by playing a random sound if no sound is set
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
                source={{
                  uri: "https://xsgames.co/randomusers/avatar.php?g=male",
                }}
                style={{ width: 40, height: 40, borderRadius: 10 }}
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
                { backgroundColor: cardColors[soundToTextMap[soundKey]] },
                selectedCard === soundToTextMap[soundKey] && { borderWidth: 3, borderColor: Colors.blue } // Highlight selected card
              ]}
              onPress={() => setSelectedCard(soundToTextMap[soundKey])}
            >
              <Text style={styles.cardText}>{soundToTextMap[soundKey]}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
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
    fontWeight: "900",
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
    shadowColor: Colors.black,
    shadowOffset: { width: 20, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 5,
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
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10, // Space between rows
    shadowColor: Colors.black,
    shadowOffset: { width: 20, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  messageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  messageText: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.black,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
   // gap: 20,
  },
  button: {
    backgroundColor: Colors.blue,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    width:'100%'
,  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.white,

  },
});

export default VoicePage;
