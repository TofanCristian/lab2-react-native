import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const languages = [
  {
    id: 1,
    name: "JavaScript",
    description: "Popular pentru web development",
    emoji: "🟨",
  },
  {
    id: 2,
    name: "Python",
    description: "Foarte bun pentru începători",
    emoji: "🐍",
  },
  {
    id: 3,
    name: "Java",
    description: "Folosit pentru aplicații mari",
    emoji: "☕",
  },
  {
    id: 4,
    name: "C++",
    description: "Rapid și performant",
    emoji: "💻",
  },
];

export default function HomeScreen() {
  const [userName, setUserName] = useState("");
  const [started, setStarted] = useState(false);

  const [currentPair, setCurrentPair] = useState(0);

  const [results, setResults] = useState<any[]>([]);

  const [finished, setFinished] = useState(false);

  const pairs = [
    [languages[0], languages[1]],
    [languages[2], languages[3]],
  ];

  const startGame = () => {
    if (userName.trim() === "") return;

    setStarted(true);
  };

  const vote = (item: any) => {
    const updated = [...results, item];

    setResults(updated);

    if (currentPair + 1 >= pairs.length) {
      setFinished(true);
    } else {
      setCurrentPair(currentPair + 1);
    }
  };

  const restart = () => {
    setStarted(false);
    setFinished(false);
    setCurrentPair(0);
    setResults([]);
    setUserName("");
  };

  if (!started) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.startBox}>
          <Text style={styles.title}>
            Let's find your favourite language!
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={userName}
            onChangeText={setUserName}
          />

          <Pressable style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>START</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (finished) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Tournament Finished!</Text>

        <Text style={styles.subtitle}>
          User: {userName}
        </Text>

        {results.map((item, index) => (
          <View key={index} style={styles.resultCard}>
            <Text style={styles.emoji}>{item.emoji}</Text>

            <Text style={styles.resultTitle}>
              {index + 1}. {item.name}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>
          </View>
        ))}

        <Pressable style={styles.button} onPress={restart}>
          <Text style={styles.buttonText}>RESTART</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.roundText}>
        Round {currentPair + 1} / {pairs.length}
      </Text>

      <View style={styles.cardsContainer}>
        {pairs[currentPair].map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.emoji}>
              {item.emoji}
            </Text>

            <Text style={styles.cardTitle}>
              {item.name}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

            <Pressable
              style={styles.voteButton}
              onPress={() => vote(item)}
            >
              <Text style={styles.buttonText}>
                VOTE
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff3d6",
    padding: 20,
    justifyContent: "center",
  },

  startBox: {
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#4b2e05",
  },

  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    width: "90%",
    borderBottomWidth: 1,
    borderColor: "#555",
    padding: 10,
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#2196f3",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  roundText: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },

  cardsContainer: {
    gap: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  description: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },

  voteButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },

  emoji: {
    fontSize: 60,
    marginBottom: 15,
  },

  resultCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },

  resultTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
});