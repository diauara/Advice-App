import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

type AdviceSlip = {
  advice: string;
  id: number;
};

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [advice, setAdvice] = useState<AdviceSlip[]>([]);

  const reloadPage = () => {
    setLoading(true);
    getAdvice();
  };

  const getAdvice = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice([{ advice: data.slip.advice, id: data.slip.id }]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.adviceLayout}>
        {isLoading ? (
          <ActivityIndicator
            color={"hsl(150, 100%, 66%)"}
            style={{ padding: 30 }}
          />
        ) : (
          <FlatList
            data={advice}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.itemContent}>
                <Text style={styles.adviceHead}>ADVICE #{item.id}</Text>
                <Text style={styles.adviceBody}>"{item.advice}"</Text>
                <View style={styles.seperator}>
                  <Ionicons
                    name="remove"
                    size={20}
                    color="hsl(193, 38%, 86%)"
                  />
                  <Ionicons name="pause" size={30} color="hsl(193, 38%, 86%)" />
                  <Ionicons
                    name="remove"
                    size={20}
                    color="hsl(193, 38%, 86%)"
                  />
                </View>
                <TouchableOpacity
                  onPress={reloadPage}
                  style={{
                    backgroundColor: "hsl(150, 100%, 66%)",
                    width: 70,
                    alignItems: "center",
                    marginTop: 20,
                    padding: 20,
                    borderRadius: 50,
                    alignSelf: "center",
                  }}
                >
                  <FontAwesome5 name="dice-d20" size={30} color="black" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(218, 23%, 16%)",
    alignItems: "center",
    justifyContent: "center",
  },
  adviceLayout: {
    backgroundColor: "hsl(217, 19%, 24%)",
    width: 375,
    // height: 375,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContent: {
    margin: 50,
  },
  adviceHead: {
    color: "hsl(150, 100%, 66%)",
    textAlign: "center",
    paddingBottom: 30,
  },
  adviceBody: {
    fontSize: 28,
    color: "hsl(193, 38%, 86%)",
    textAlign: "center",
    fontFamily: "https://fonts.google.com/specimen/Manrope",
    fontWeight: "800",
  },
  divider: {
    color: "white",
    marginVertical: 10,
    height: 10,
    width: "100%",
  },
  image: {
    height: 50,
    width: 200,
  },
  seperator: {
    marginTop: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
});
