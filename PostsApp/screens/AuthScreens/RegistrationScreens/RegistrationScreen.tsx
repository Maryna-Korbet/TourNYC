import React, { FC, useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Alert,
	Dimensions,
	Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { usePasswordToggle } from '../../../hooks/usePasswordToggle';
import ShowButton from '../../../components/buttons/ShowButton';
import Input from '../../../components/forms/Input';
import Button from '../../../components/buttons/Button';
import { styles } from './RegistrationScreen.styles';
import { registerDB } from 'services/auth';



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
	profilePhoto: string | undefined,
	displayName: string,
	email: string,
	password: string,
};

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const RegistrationScreen: FC<RegistrationScreenProps> = ({ navigation, route }) => {
	const [inputQuery, setInputQuery] = useState<RegistrationInputProps>({ displayName: '', email: '', password: '', profilePhoto: '' });
	const [error, setError] = useState<RegistrationInputProps>({ displayName: '', email: '', password: '', profilePhoto: '' });
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

	const onFocus = () => {
		setIsFocused(true);
	}

	const onBlur = () => {
		setIsFocused(false);
	}

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

	/* const onChangeavatar = () => {
		launchImageLibrary(
			{
				//select only photos
				mediaType: 'photo',
				quality: 1, 
			},
			(response) => {
				if (response.assets && response.assets.length > 0) {
					const uri = response.assets[0].uri;
					setInputQuery(prev => ({ ...prev, profilePhoto: uri }));
					Alert.alert("Avatar selected", "You have successfully selected an avatar.");
				} else {
					Alert.alert('You will choose an avatar next time'); 
				}
			}
		);
	}; */

	const onChangeavatar = () => {
    launchImageLibrary(
        {
            mediaType: 'photo',
            quality: 1,
        },
        (response) => {
            console.log(response); // Check the structure of the response
            if (response.didCancel) {
                Alert.alert('You cancelled the image picker');
                return;
            }

            if (response.errorCode) {
                Alert.alert('Error', response.errorMessage || 'An error occurred');
                return;
            }

            if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                setInputQuery(prev => ({ ...prev, profilePhoto: uri }));
                Alert.alert("Avatar selected", "You have successfully selected an avatar.");
            } else {
                Alert.alert('No avatar selected');
            }
        }
    );
};

	const onRegistation = () => {
		Keyboard.dismiss();

		if (!validate()) return;

		if (validate()) {
			//!Delete console.log
			console.log("Credentials", inputQuery.displayName, inputQuery.email, inputQuery.password, inputQuery.profilePhoto);

			registerDB({
				profilePhoto: inputQuery.profilePhoto !== undefined ? inputQuery.profilePhoto : '',
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
							paddingBottom: isFocused ? 32 : 92,
						}}
					>
						<View style={styles.avatar}>
							<TouchableOpacity style={styles.buttonAvatar} onPress={onChangeavatar}>
								<Text style={styles.buttonAvatarText}>{'+'}</Text>
							</TouchableOpacity>
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