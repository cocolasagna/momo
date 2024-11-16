import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av"; 
import Colors from "@/constants/Colors";
import { useNavigation } from '@react-navigation/native'; 

const VoicePage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [cardColors, setCardColors] = useState<{ [key: string]: string }>({
    "la": "#f8f8f8",
    "bag": "#f8f8f8",
    "money": "#f8f8f8",
    "sujan": "#f8f8f8",
  });
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [correctCard, setCorrectCard] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [buttonText, setButtonText] = useState("Check");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [currentSoundKey, setCurrentSoundKey] = useState<string | null>(null); 
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();

  const soundFiles: { [key: string]: any } = {
    la: require("../../assets/sounds/la.mp3"),
    bag: require("../../assets/sounds/bag.mp3"),
    money: require("../../assets/sounds/money.mp3"),
    sujan: require("../../assets/sounds/sujan.mp3"),
  };

  const imageFiles: { [key: string]: any } = {
    la: require("../../assets/images/la.png"),
    bag: require("../../assets/images/bag.png"),
    money: require("../../assets/images/money.png"),
    sujan: require("../../assets/images/person.png"),
  };

  const soundToTextMap: { [key: string]: string } = {
    la: "लः",
    bag: "क",
    money: "ख",
    sujan: "घ"
  };

  const stopAndPlaySound = async (soundKey: string) => {
    if (sound) {
      await sound.stopAsync(); 
      await sound.unloadAsync(); 
    }

    const { sound: newSound } = await Audio.Sound.createAsync(soundFiles[soundKey]);
    setSound(newSound); 
    await newSound.playAsync(); 
  };

  const playSound = async () => {
    if (currentSoundKey && soundFiles[currentSoundKey]) {
      await stopAndPlaySound(currentSoundKey);
    }
  };

  const playFirstSound = async () => {
    const firstKey = "la"; 
    setCurrentSoundKey(firstKey); 
    setCorrectCard(soundToTextMap[firstKey]); 
    await stopAndPlaySound(firstKey); 
  };

  const checkCard = () => {
    if (selectedCard && correctCard) {
      const isCorrect = selectedCard === correctCard;
      setIsAnswerCorrect(isCorrect);
      setMessage(isCorrect ? "Well Done!" : "Try Again");
      setButtonText(isCorrect ? "Continue" : "Retry");
      setCardColors((prevColors) => ({
        ...prevColors,
        [selectedCard]: isCorrect ? Colors.green : "red", 
      }));
    }
  };

  const handleContinue = () => {
    if (isAnswerCorrect) {
      navigation.navigate("wordmatch");
      resetGame();
    } else {
      reset();
    }
  };

  const resetGame = () => {
    setSelectedCard(null);
    setCardColors({
      la: "#f8f8f8",
      bag: "#f8f8f8",
      money: "#f8f8f8",
      sujan: "#f8f8f8",
    });
    setMessage("");
    setButtonText("Check");
    setIsAnswerCorrect(null);
    playFirstSound(); 
  };

  const reset = () => {
    setSelectedCard(null);
    setCardColors({
      la: "#f8f8f8",
      bag: "#f8f8f8",
      money: "#f8f8f8",
      sujan: "#f8f8f8",
    });
    setMessage("");
    setButtonText("Check");
    setIsAnswerCorrect(null);
  };

  useEffect(() => {
    if (!currentSoundKey) {
      playFirstSound(); 
    } else {
      playSound(); 
    }

    return () => {
      if (sound) {
        sound.unloadAsync(); 
      }
    };
  }, [currentSoundKey]);

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: 20 }}>
              <Image
                source={require('../../assets/images/title.png')} 
                style={{ width: 40, height: 40, borderRadius: 10 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={[styles.container, { paddingTop: headerHeight + 10 }]}>
        <Text style={styles.headingTxt}>Select the Correct Image</Text>

        <View style={[styles.play, { flexDirection: 'row', alignItems: 'center' }]}>
  <TouchableOpacity onPress={playSound} style={{ marginRight: 10 }}>
    <Ionicons name="volume-medium" style={styles.volume} />
  </TouchableOpacity>
  <Text style={styles.Txt}>लः</Text>
</View>


        <View style={styles.cardRow}>
          {Object.keys(soundToTextMap).map((soundKey, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.card,
                { backgroundColor: cardColors[soundKey] },
                selectedCard === soundToTextMap[soundKey] && { 
                  borderWidth: 3, 
                  borderColor:isAnswerCorrect === null ? "rgba(116,195,252,0.2)" : isAnswerCorrect ? Colors.darkgreen : Colors.darkred,
                  backgroundColor: isAnswerCorrect === null ? "rgba(116,195,252,0.2)" : isAnswerCorrect ? Colors.green : Colors.red,
                } 
              ]}
              onPress={() => setSelectedCard(soundToTextMap[soundKey])}
            >
              <Image
                source={imageFiles[soundKey]}
                style={styles.cardImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: isAnswerCorrect === null ? Colors.blue : isAnswerCorrect ? Colors.darkgreen : Colors.darkred }]}
            onPress={isAnswerCorrect === null ? checkCard : handleContinue}
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
  
  volume: {
    color: Colors.blue,
    fontSize: 30,
  },
  play: {
    marginTop:20,
    paddingHorizontal:10    

  },
  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", 
    marginTop: 20,
  },
  card: {
    width: "45%",
    height: 150,
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
  cardImage: {
    width: 80, 
    height: 80, 
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    width: '100%',
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
  Txt:{
    color: Colors.black,
    fontSize: 80,
    fontFamily:'Nithya',
  }
});

export default VoicePage;
