import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { RNCamera } from 'react-native-camera';
const QrCodeKumpulZakatFitrah = ({ navigation, route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [rerender, setrerender] = useState(false);

    const { type, year_hijriah } = route.params;
    const handleBarCodeScanned = ({data}) => {
        setScanned(true);
        if (type === 'TerimaZakatFitrah') {
            navigation.navigate("ConfirmTerimaZakatFitrah", {
                id_peserta: data,
                year_hijriah: year_hijriah,
            });
        } else if (type === "BeriZakatFitrah") {
            navigation.navigate("ConfirmBeriZakatFitrah", {
                id_peserta: data,
                year_hijriah: year_hijriah,
            });
        } else if (type === "TerimaCelengan") {
            navigation.navigate("ConfirmTerimaCelengan", {
                id_peserta: data,
                year_hijriah: year_hijriah,
            });
        } else if (type === "BeriCelengan") {
            navigation.navigate("ConfirmBeriCelengan", {
                id_peserta: data,
                year_hijriah: year_hijriah,
            });
        } else if (type === "BeriQurban") {
            navigation.navigate("ConfirmBeriQurban", {
                id_peserta: data,
                year_hijriah: year_hijriah,
            });
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                style={{
                    flex: 1
                }}
                onBarCodeRead={(event) => {
                    handleBarCodeScanned(event)}
                }
                captureAudio={false}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                    title: "Permission to use camera",
                    message: "We need your permission to use your camera",
                    buttonPositive: "Ok",
                    buttonNegative: "Cancel",
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default QrCodeKumpulZakatFitrah;
