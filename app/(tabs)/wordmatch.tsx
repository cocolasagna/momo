import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "@/constants/Colors";
import { useNavigation } from '@react-navigation/native'; 

const WordPage = () => {
  const [selectedNepali, setSelectedNepali] = useState<string | null>(null);
  const [selectedNewari, setSelectedNewari] = useState<string | null>(null);
  const [cardColorsNepali, setCardColorsNepali] = useState<{ [key: string]: string }>({});
  const [cardColorsNewari, setCardColorsNewari] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState<string>("");
  const [buttonText, setButtonText] = useState("Check");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [remainingPairs, setRemainingPairs] = useState<{ nepali: string; newari: string }[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const headerHeight = useHeaderHeight();
  const router = useRouter();
  const navigation = useNavigation();

  const initialPairs = [
    { nepali: "Dog", newari: "खिचा [khicā]" },
    { nepali: "cloth", newari: "काप [kāpa]" },
    { nepali: "money", newari: "𑐥𑐿𑐳𑐵" },
    { nepali: "person", newari: " मनू [manū]" },
  ];

  const initializeCardColors = () => {
    const nepaliColors: { [key: string]: string } = {};
    const newariColors: { [key: string]: string } = {};
    initialPairs.forEach((pair) => {
      nepaliColors[pair.nepali] = "#f8f8f8";
      newariColors[pair.newari] = "#f8f8f8";
    });
    setCardColorsNepali(nepaliColors);
    setCardColorsNewari(newariColors);
  };

  useEffect(() => {
    setRemainingPairs(initialPairs);
    initializeCardColors();
  }, []);

  const checkMatch = () => {
    if (selectedNepali && selectedNewari) {
      const correctMatch = remainingPairs.find(
        (pair) => pair.nepali === selectedNepali && pair.newari === selectedNewari
      );
      const isCorrect = !!correctMatch;

      setIsAnswerCorrect(isCorrect);
      setMessage(isCorrect ? "Well Done!" : "Try Again");
      setButtonText(isCorrect ? "Continue" : "Retry");

      setCardColorsNepali((prevColors) => ({
        ...prevColors,
        [selectedNepali]: isCorrect ? Colors.green : Colors.red,
      }));

      setCardColorsNewari((prevColors) => ({
        ...prevColors,
        [selectedNewari]: isCorrect ? Colors.green : Colors.red,
      }));

      if (isCorrect) {
        setTimeout(() => {
          setRemainingPairs((prevPairs) =>
            prevPairs.filter(
              (pair) => pair.nepali !== selectedNepali || pair.newari !== selectedNewari
            )
          );
          if (remainingPairs.length === 1) {
            setGameCompleted(true);
            setMessage("Congratulations! All pairs matched.");
            setButtonText("Continue");
          } else {
            resetSelections();
          }
        }, 500);
      }
    }
  };

  const handleCardSelection = (type: "nepali" | "newari", value: string) => {
    if (type === "nepali") {
      setSelectedNepali(value);
      setCardColorsNepali((prevColors) => ({
        ...prevColors,
        [value]: Colors.yellow,
      }));
    } else {
      setSelectedNewari(value);
      setCardColorsNewari((prevColors) => ({
        ...prevColors,
        [value]: Colors.yellow,
      }));
    }
  };

  const handleContinue = () => {
    if (gameCompleted) {
       
        navigation.navigate("index");
        restartGame()
    } else {
      resetSelections();
    }
  };

  const resetSelections = () => {
    setSelectedNepali(null);
    setSelectedNewari(null);
    setMessage("");
    setButtonText("Check");
    setIsAnswerCorrect(null);
    initializeCardColors();
  };

  const restartGame = () => {
    setRemainingPairs(initialPairs);
    resetSelections();
    setGameCompleted(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <View style={[styles.container, { paddingTop: headerHeight + 10 }]}>
        <Text style={styles.headingTxt}>Match English and Newari Words!</Text>

        <View style={styles.cardRow}>
          {remainingPairs.map((pair, index) => (
            <TouchableOpacity
              key={`nepali-${index}`}
              style={[
                styles.card,
                selectedNepali === pair.nepali && styles.selectedCard,
                { backgroundColor: cardColorsNepali[pair.nepali] },
              ]}
              onPress={() => handleCardSelection("nepali", pair.nepali)}
            >
              <Text style={styles.cardText}>{pair.nepali}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.cardRow}>
          {remainingPairs.map((pair, index) => (
            <TouchableOpacity
              key={`newari-${index}`}
              style={[
                styles.card,
                selectedNewari === pair.newari && styles.selectedCard,
                { backgroundColor: cardColorsNewari[pair.newari] },
              ]}
              onPress={() => handleCardSelection("newari", pair.newari)}
            >
              <Text style={styles.cardText}>{pair.newari}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={buttonText === "Check" ? checkMatch : handleContinue}
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
  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  card: {
    width: "45%",
    height: 60,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: Colors.blue,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  messageContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  button: {
    position:'fixed',
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

export default WordPage;
