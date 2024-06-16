import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Title } from "react-native-paper";
const ScanBeriZakatFitrah = ({ route, navigation, year_hijriah }) => {
  const [loading, setloading] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: "5%",
          }}
        >
          <Title style={{ textAlign: "center" }}>
            Sentuh Tombol Dibawah Untuk Melakukan Scan Code
          </Title>
          <Button
            onPress={() =>
              navigation.navigate("QrCodeKumpulZakatFitrah", {
                type: "BeriZakatFitrah",
                year_hijriah: year_hijriah,
              })
            }
            style={{ width: "100%", color: "#fff" }}
            loading={loading}
            disabled={loading}
            mode="contained"
          >
            <Text style={{ color: "white" }}>Scan</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
  },
  sub_container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  container_menu: {
    paddingVertical: "4%",
    width: "100%",
    marginVertical: "1%",
    backgroundColor: "#28b5b5",
  },
});

export default ScanBeriZakatFitrah;
