import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import { getAddressFromCoordinates } from '../../../services/getAddressFromCoordinates';
import { styles } from './MapScreen.style';

type Coordinates = {
    latitude: number;
    longitude: number;
};

const MapScreen: FC<{ route: any }> = ({ route }) => {
    const [location, setLocation] = useState<Coordinates | null>(null);
    const [markerCoords, setMarkerCoords] = useState<Coordinates | null>(null);
    const [address, setAddress] = useState<string>('');

    useEffect(() => {
        // If the coordinates from the picture are transferred, set the marker
        if (route.params?.location) {
            const { latitude, longitude } = route.params.location.coords;
            setMarkerCoords({ latitude, longitude });
            fetchAddress(latitude, longitude);
        } else {
            getCurrentLocation();
        }
    }, [route.params]);

    const getCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setLocation({ latitude, longitude });
        setMarkerCoords({ latitude, longitude });
        fetchAddress(latitude, longitude);
    };

    const fetchAddress = async (latitude: number, longitude: number) => {
        try {
            const fetchedAddress = await getAddressFromCoordinates({ latitude, longitude });
            
            //!: Delete later console.log
            console.log('Fetched address:', fetchedAddress);
            setAddress(fetchedAddress);
        } catch (error) {
            console.error('Failed to fetch address:', error);
        }
    };

    const handleMarkerDragEnd = async (event: any) => {
        const newCoords = event.nativeEvent.coordinate;
        setMarkerCoords(newCoords);
        fetchAddress(newCoords.latitude, newCoords.longitude);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: location?.latitude || 37.4220936,
                    longitude: location?.longitude || -122.083922,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(event) => {
                    const newCoords = event.nativeEvent.coordinate;
                    setMarkerCoords(newCoords);
                    fetchAddress(newCoords.latitude, newCoords.longitude);
                }}
            >
                {markerCoords && (
                    <Marker
                        draggable
                        coordinate={markerCoords}
                        title="Location"
                        description={address || 'Fetching address...'}
                        onDragEnd={handleMarkerDragEnd}
                    />
                )}
            </MapView>
        </View>
    );
};

export default MapScreen;