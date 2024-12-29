import React, { FC, useState, useEffect } from 'react';
import {
    Text,
    View,
    Platform,
    Keyboard,
	TouchableWithoutFeedback,
	TouchableOpacity,
	KeyboardAvoidingView,
	Alert,
	Dimensions,
	Image,
	ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootState } from "../../../redux/store";
import { setUserInfo } from "../../../redux/auth/authReducer";
import { registerDB } from 'services/auth';
import { getImageUrl, uploadImage } from "../../../services/firestore";

import { usePasswordToggle } from '../../../hooks/usePasswordToggle';

import ShowButton from '../../../components/buttons/ShowButton';
import Input from '../../../components/forms/Input';
import Button from '../../../components/buttons/Button';
import { styles } from './RegistrationScreen.styles';
import { colors } from '../../../styles/GlobalStyles';



type RootStackParamList = {
	Registration: undefined,
	Login: undefined,
};

type RegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Registration'>;

interface RegistrationScreenProps {
    navigation: RegistrationScreenNavigationProp,
    route: any,
};

interface RegistrationInputProps{
	profilePhoto: string,
	displayName: string,
	email: string,
	password: string,
};

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const RegistrationScreen: FC<RegistrationScreenProps> = ({ navigation, route }) => {
	const dispatch = useDispatch();

	const [inputQuery, setInputQuery] = useState<RegistrationInputProps>({ displayName: '', email: '', password: '', profilePhoto: '' });
	const [error, setError] = useState<RegistrationInputProps>({ displayName: '', email: '', password: '', profilePhoto: '' });
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	const userInfo = useSelector((state: RootState) => state.auth.userInfo);
	const { isPasswordVisible, togglePasswordVisibility } = usePasswordToggle();
	const [isFocused, setIsFocused] = useState(false);
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const showListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
		const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

		if (route.params?.userEmail) {
			setInputQuery(prev => ({ ...prev, email: route.params.userEmail }));
		}

		return () => {
			showListener.remove();
			hideListener.remove();
		};
	}, []);

	useEffect(() => {
		if (userInfo && userInfo.profilePhoto) {
			setSelectedImage(userInfo.profilePhoto);
		}
	}, [userInfo]);

	const onFocus = () => {
		setIsFocused(true);
	}

	const onBlur = () => {
		setIsFocused(false);
	}

	//Uploading the image and getting the URL
	const handleImageUpload = async (
		userId: string,
		file: File | Blob,
		fileName: string
	) => {
		try {
			const imageRef = await uploadImage(userId, file, fileName);
			const imageUrl = await getImageUrl(imageRef);

			if (!imageUrl) {
				throw new Error('Failed to retrieve image URL');
			}
		
			return imageUrl;
		} catch (error) {
			Alert.alert("Image upload failed");
			return null;
		}
	};
	
	//Selecting an image from the media library and uploading it
	const pickImage = async () => {
		try {
			setIsUploading(true);
			const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (!granted) throw new Error("Media library access denied");

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

	const handleValueChange = (value: string, input: "displayName" | "email" | "password") => {
		setInputQuery(prev => ({ ...prev, [input]: value }));

		// Remove error if input is valid
		if (input === "displayName" && value.length >= 3) {
			setError(prev => ({ ...prev, displayName: '' }));
		};

		if (input === "email" && /\S+@\S+\.\S+/.test(value)) {
			setError(prev => ({ ...prev, email: '' }));
		};

		if (input === "password" && value.length >= 6) {
			setError(prev => ({ ...prev, password: '' }));
		};
	};

	const validate = () => {
		let isValid = true;
		const newErrors = { displayName: '', email: '', password: '', profilePhoto: '' };

		if (!inputQuery.displayName) {
			isValid = false;
			newErrors.displayName = 'Display name is required';
		} else if (inputQuery.displayName.length < 3) {
			newErrors.displayName = 'Display name must be at least 3 characters';
			isValid = false;
		}
        
		if (!inputQuery.email) {
			isValid = false;
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(inputQuery.email)) {
			newErrors.email = 'Please enter a valid email address';
			isValid = false;
		}

		if (!inputQuery.password) {
			isValid = false;
			newErrors.password = 'Password is required';
		} else if (inputQuery.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
			isValid = false;
		}
        
		setError(newErrors);
		return isValid;
	};
	
	const onRegistation = () => {
		Keyboard.dismiss();

		if (!validate()) return;

		if (validate()) {
			registerDB({
				profilePhoto: selectedImage || '',
				displayName: inputQuery.displayName,
				email: inputQuery.email,
				password: inputQuery.password
			});
			Alert.alert("Registration", "Registeration Successful");
		}
	};

	const onSignIn = () => {
		Keyboard.dismiss();
		navigation.navigate('Login');
	};

	return (
		<TouchableWithoutFeedback
			onFocus={onFocus}
			onBlur={onBlur}
			onPress={() => Keyboard.dismiss()
			}>
			<>
				<Image
					source={require('../../../assets/images/background/background-photo.jpg')}
					style={styles.background_image}
				/>
				
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.container}
				>
					<View
						style={{
							...styles.formContainer,
							paddingBottom: isKeyboardVisible ? 32 : 92,
						}}
					>
						{isUploading && <ActivityIndicator size="large" color={colors.orange} />}

						<View style={styles.avatarContainer}>
							{selectedImage ? (
								<View>
									<Image
										source={{ uri: selectedImage }}
										style={styles.image}
									/>
									<TouchableOpacity style={styles.buttonSelectedAvatar} onPress={pickImage}>
										<Text style={styles.buttonAvatarText}>{'+'}</Text>
									</TouchableOpacity>
								</View>
							) : (
								<View
									style={styles.avatar}
								>
									<TouchableOpacity
										style={styles.buttonAvatar}
										onPress={pickImage}
										accessibilityLabel="Select Profile Picture"
										accessibilityHint="Opens your photo library to select a profile picture."
									>
										<Text style={styles.buttonAvatarText}>{'+'}</Text>
									</TouchableOpacity>
								</View>
							)}
						</View>

						<View style={[styles.formContainer, { width: SCREEN_WIDTH }]}>
							<Text style={styles.title}>Sign Up</Text>
						
							<View style={styles.innerContainer}>
								<Input
									value={inputQuery.displayName}
									error={error.displayName}
									outerStyles={styles.outerStyles}
									placeholder="Display name"
									autofocus={true}
									autoCapitalize='none'
									onValueChange={(value) => handleValueChange(value, "displayName")}
									placeholderTextColor={isFocused ? '#FF6C00' : '#BDBDBD'}
								/>
						
								<Input
									value={inputQuery.email}
									error={error.email}
									outerStyles={styles.outerStyles}
									placeholder="Email address"
									autofocus={true}
									autoCapitalize='none'
									onValueChange={(value) => handleValueChange(value, "email")}
									placeholderTextColor={isFocused ? '#FF6C00' : '#BDBDBD'}
								/>
						
								<Input
									value={inputQuery.password}
									error={error.password}
									outerStyles={styles.outerStyles}
									placeholder="Password"
									rightButton={<ShowButton togglePasswordVisibility={togglePasswordVisibility} />}
									secureTextEntry={!isPasswordVisible}
									autoCapitalize='none'
									onValueChange={(value) => handleValueChange(value, "password")}
									placeholderTextColor={isFocused ? '#FF6C00' : '#BDBDBD'}
								/>
							</View>
						</View>

						<View style={{ display: isKeyboardVisible ? 'none' : 'flex' }}>
							<View style={styles.buttonsContainer}>
								<Button
									buttonStyles={styles.button}
									onPress={onRegistation}
								>
									<Text style={[styles.baseText, styles.buttonText]}>
										Create account
									</Text>
								</Button>

								<View style={styles.signInContainer}>
									<Text style={styles.baseText}>
										Do you already have an account?
									</Text>
									<TouchableWithoutFeedback onPress={onSignIn}>
										<Text style={[styles.baseText, styles.signInText]}>
											Sign in
										</Text>
									</TouchableWithoutFeedback>
								</View>
							</View>
						</View>
					</View>
				</KeyboardAvoidingView>
			</>
		</TouchableWithoutFeedback>
	);
};

export default RegistrationScreen;