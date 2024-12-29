import { useState } from "react";
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Alert
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from 'expo-image-picker';

import { RootState } from "../../../redux/store";
import { getImageUrl, updateUserInFirestore, uploadImage } from "../../../services/firestore";
import { setUserInfo } from "../../../redux/auth/authReducer";

import Input from "../../../components/forms/Input";
import Button from "../../../components/buttons/Button";

import { styles } from "./ProfileScreen.styles";
import { colors } from "../../../styles/GlobalStyles";



const ProfileScreen = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [userName, setUserName] = useState<string>(userInfo?.displayName || '')
    const [isUploading, setIsUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageUpload = async (userId: string, file: File | Blob, fileName: string) => {
        try {
            // Upload the image
            const imageRef = await uploadImage(userId, file, fileName);
            // Get the URL of the uploaded image
            const imageUrl = await getImageUrl(imageRef);

            if (!imageUrl) {
                throw new Error('Failed to retrieve image URL');
            }
            return imageUrl;
        } catch (error) {
            return null;
        }
    };

    const pickAvatar = async () => {
        try {
            setIsUploading(true);

            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                alert("Permission to access media library is required!");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri;
                setSelectedImage(uri);

                const response = await fetch(uri);
                const file = await response.blob();
                const fileName = uri.split('/').pop() || `image_${Date.now()}`;
                const imageFile = new File([file], fileName, { type: file.type });

                if (userInfo) {
                    const imageUrl = await handleImageUpload(userInfo.uid, imageFile, fileName);
                    if (imageUrl) {
                        // Update selectedImage with uploaded URL
                        setSelectedImage(imageUrl);
                        dispatch(setUserInfo({ ...userInfo, profilePhoto: imageUrl }));
                    }
                }
            }
        } catch (error) {
            Alert.alert("Error", "Unable to upload the selected image. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const onUserNameChange = async () => {
        if (!userInfo) return;

        try {
            // Оновлення даних користувача в Firestore
            await updateUserInFirestore(userInfo?.uid, {
                displayName: userName || userInfo.displayName,
                profilePhoto: selectedImage,
            });

            // Update the Redux state with new data
            dispatch(setUserInfo({ ...userInfo, displayName: userName || userInfo.displayName, profilePhoto: selectedImage || userInfo?.profilePhoto }));
        } catch (error) {
            Alert.alert("Error", "Unable to update the username and profile photo. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                {isUploading && <ActivityIndicator size="large" color={colors.orange} />}

                <View style={styles.avatarContainer}>
                    {selectedImage ? (
                        <View>
                            <Image
                                source={{
                                    uri: selectedImage || userInfo?.profilePhoto || 'https://via.placeholder.com/150',
                                }}
                                style={styles.image}
                            />
                            <TouchableOpacity style={styles.buttonSelectedAvatar} onPress={pickAvatar}>
                                <Text style={styles.buttonAvatarText}>{'+'}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View
                            style={styles.avatar}
                        >
                            <TouchableOpacity
                                style={styles.buttonAvatar}
                                onPress={pickAvatar}
                                accessibilityLabel="Select Profile Picture"
                                accessibilityHint="Opens your photo library to select a profile picture."
                            >
                                <Text style={styles.buttonAvatarText}>{'+'}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            
                <View style={styles.infoContainer}>
                    <View style={styles.info}>
                        <Text style={styles.title}>Name:</Text>
                        <Text style={styles.title}>{userInfo?.displayName || 'Anonim'}</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={styles.title}>Email:</Text>
                        <Text style={styles.title}>{userInfo?.email || 'Anonim'}</Text>
                    </View>
                </View>

                <Input
                    value={userName}
                    outerStyles={{ width: "60%" }}
                    onValueChange={setUserName}
                    onEndEditing={onUserNameChange}

                />

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={onUserNameChange}
                    >
                        <Text style={styles.button}>Update profile</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default ProfileScreen;