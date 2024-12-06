import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import { getAddressFromCoordinates } from '../../../services/getAddressFromCoordinates';
import { styles } from './MapScreen.style';

type MapScreenProps = {
    route: any;
    navigation: any;
};

type Coordinates = {
    latitude: number;
    longitude: number;
};

const MapScreen: FC<MapScreenProps> = ({ route, navigation }) => {
    const [location, setLocation] = useState<Coordinates | null>(null);
    const [markerCoords, setMarkerCoords] = useState<Coordinates | null>(null);
    const [address, setAddress] = useState<string>('');

    useEffect(() => {
        if (route.params?.currentLocation) {
            const { latitude, longitude } = route.params.currentLocation;
            setMarkerCoords({ latitude, longitude });
            fetchAddress(latitude, longitude);
        } else {
            getCurrentLocation();
        }
    }, [route.params]);

    const fetchAddress = async (latitude: number, longitude: number) => {
        try {
            const fetchedAddress = await getAddressFromCoordinates({ latitude, longitude });
            setAddress(fetchedAddress);
        } catch (error) {
            console.error('Failed to fetch address:', error);
        }
    };

    const getCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        fetchAddress(latitude, longitude);
        setLocation({ latitude, longitude });
        setMarkerCoords({ latitude, longitude });
    };

    const handleMarkerDragEnd = async (event: any) => {
        const newCoords = event.nativeEvent.coordinate;
        setMarkerCoords(newCoords);
        const fetchedAddress = await getAddressFromCoordinates(newCoords);
        setAddress(fetchedAddress);
        navigation.navigate('CreatePost', { address: fetchedAddress });
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                initialRegion={{
                    latitude: markerCoords?.latitude || 37.78825,
                    longitude: markerCoords?.longitude || -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {markerCoords && (
                    <Marker
                        coordinate={markerCoords}
                        draggable
                        onDragEnd={handleMarkerDragEnd}
                    />
                )}
            </MapView>
        </View>
    );
};

export default MapScreen;
