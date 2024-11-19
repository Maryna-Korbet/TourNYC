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
import { StackNavigationProp } from '@react-navigation/stack';
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
	login: string,
	email: string,
	password: string,
};

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const RegistrationScreen: FC<RegistrationScreenProps> = ({ navigation, route }) => {
	const [inputQuery, setInputQuery] = useState<RegistrationInputProps>({ login: '', email: '', password: '' });
	const [error, setError] = useState<RegistrationInputProps>({ login: '', email: '', password: '' });
	const { isPasswordVisible, togglePasswordVisibility } = usePasswordToggle();
	const [isFocused, setIsFocused] = useState(false);
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

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

	const handleValueChange = (value: string, input: "login" | "email" | "password") => {
		setInputQuery(prev => ({ ...prev, [input]: value }));

		// Remove error if input is valid
		if (input === "login" && value.length >= 3) {
			setError(prev => ({ ...prev, login: '' }));
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
		const newErrors = { login: '', email: '', password: '' };
		
		if (!inputQuery.login) {
			isValid = false;
			newErrors.login = 'Login name is required';
		} else if (inputQuery.login.length < 3) {
			newErrors.login = 'Login name must be at least 3 characters';
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

	const onChangeavatar = () => {
		console.log('Change avatar');
		Alert.alert("Change avatar", "Avatar change Successful");
	};

	const onRegistation = () => {
		Keyboard.dismiss();

		if (!validate()) return;

		if (validate()) {
			console.log("Credentials", inputQuery.login, inputQuery.email, inputQuery.password);
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
									value={inputQuery.login}
									error={error.login}
									placeholder="Login name"
									autofocus={true}
									autoCapitalize='none'
									onValueChange={(value) => handleValueChange(value, "login")}
									placeholderTextColor={isFocused ? '#FF6C00' : '#BDBDBD'}
								/>
						
								<Input
									value={inputQuery.email}
									error={error.email}
									placeholder="Email address"
									autofocus={true}
									autoCapitalize='none'
									onValueChange={(value) => handleValueChange(value, "email")}
									placeholderTextColor={isFocused ? '#FF6C00' : '#BDBDBD'}
								/>
						
								<Input
									value={inputQuery.password}
									error={error.password}
									placeholder="Password"
									rightButton={<ShowButton togglePasswordVisibility={togglePasswordVisibility} />}
									outerStyles={styles.outerStyles}
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