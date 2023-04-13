import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';

const QrCodeKumpulZakatFitrah = ({ navigation, route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [rerender, setrerender] = useState(false);

    const { type, year_hijriah } = route.params;
    // useEffect(() => {
    //     (async () => {
    //         const { status } = await BarCodeScanner.requestPermissionsAsync();
    //         setHasPermission(status === 'granted');
    //     })();
    // }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        if (type === 'TerimaZakatFitrah') {
            navigation.navigate('ConfirmTerimaZakatFitrah', {
                id_peserta: data,
                year_hijriah: year_hijriah,
            });
        } else if (type === 'BeriZakatFitrah') {
            navigation.navigate('ConfirmBeriZakatFitrah', {
                id_peserta: data,
                year_hijriah: year_hijriah,
            });
        } else if (type === 'TerimaCelengan') {
            navigation.navigate('ConfirmTerimaCelengan', {
                id_peserta: data,
                year_hijriah: year_hijriah,
            });
        } else if (type === 'BeriCelengan') {
            navigation.navigate('ConfirmBeriCelengan', {
                id_peserta: data,
                year_hijriah: year_hijriah,
            });
        } else if (type === 'BeriQurban') {
            navigation.navigate('ConfirmBeriQurban', {
                id_peserta: data,
                year_hijriah: year_hijriah,
            });
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {/* <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}></BarCodeScanner>
            {scanned && (
                <Button
                    title={'Tekan Untuk Pindah Kembali'}
                    onPress={() => setScanned(false)}
                />
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default QrCodeKumpulZakatFitrah;
