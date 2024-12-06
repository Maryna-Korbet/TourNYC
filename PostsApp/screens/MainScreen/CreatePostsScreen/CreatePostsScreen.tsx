import React, { FC, useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';

import CameraScreen from '../../NestedScreens/CameraScreen/CameraScreen';
import Button from '../../../components/buttons/Button';
import LocationButton from '../../../components/buttons/LocationButton';

import { styles } from './CreatePostsScreen.styles';


type CreatePostsScreenProps = {
    navigation: any;
    route: any;
};

type LocationProps = {
    latitude: number;
    longitude: number;
};


const CreatePostsScreen: FC<CreatePostsScreenProps> = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [picture, setPicture] = useState<string | null>(null);
    const [location, setLocation] = useState<LocationProps | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    

    useEffect(() => {
        if (route.params?.picture) setPicture(route.params.picture);
        if (route.params?.location) setLocation(route.params.location);

        if (route.params?.adress) {
            setAddress(route.params.address);
        }
    }, [route.params]);

    const handleNameChange = (value: string) => {
        setName(value);
    };

    const handleLocationPress = () => {
        navigation.navigate('Map', { currentLocation: location });
    };


    const onPublishButton = () => {
        if (picture && name && location) {
            navigation.navigate('DefaultPostsScreen', { picture, name, location });
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.publishContainer}>
                        <CameraScreen navigation={navigation} route={route} />

                        <View style={styles.publishInputsContainer}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.nameInput}
                                    placeholder="Name..."
                                    value={name}
                                    autoCapitalize="none"
                                    onChangeText={handleNameChange}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <View style={styles.locacionInputContainer}>
                                    <LocationButton
                                        style={styles.locationButton}
                                        onLocation={handleLocationPress}
                                    />
                                    <TextInput
                                        style={styles.locacionInput}
                                        placeholder="Locality..."
                                        value={address || ''}
                                        maxLength={40}
                                        autoCapitalize="none"
                                        editable={false}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.publishButtonContainer}>
                            <Button onPress={onPublishButton}>
                                <Text style={styles.publishButtonText}>Publish</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default CreatePostsScreen;
