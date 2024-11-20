import React, { FC, useState } from 'react';
import {
    Dimensions,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
   /*  Alert, */
    Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { usePasswordToggle } from '../../../hooks/usePasswordToggle';
import ShowButton from '../../../components/buttons/ShowButton';
import Input from '../../../components/forms/Input';
import Button from '../../../components/buttons/Button';
import { styles } from './LoginScreen.styles';


type RootStackParamList = {
    Registration: { userEmail?: string };
    Login: undefined,
    PostsScreen: undefined
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
    navigation: LoginScreenNavigationProp,
    route: any,
};

interface LoginInputProps{
	email: string,
	password: string,
};

interface UserEmailProps {
    email: string,
};

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const LoginScreen: FC<LoginScreenProps> = ({navigation, route}) => {
    const [inputQuery, setInputQuery] = useState<LoginInputProps>({ email: '', password: '' });
    const [error, setError] = useState<LoginInputProps>({ email: '', password: '' });
    const { isPasswordVisible, togglePasswordVisibility } = usePasswordToggle();


    const handleValueChange = (value: string, input: "email" | "password") => {
        setInputQuery(prev => ({ ...prev, [input]: value }));

        // Remove error if input is valid
        if (input === "email" && /\S+@\S+\.\S+/.test(value)) {
            setError(prev => ({ ...prev, email: '' }));
        }
        if (input === "password" && value.length >= 6) {
            setError(prev => ({ ...prev, password: '' }));
        }
    };

    const validate = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };
        
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

    const onLogin = () => {
        Keyboard.dismiss();

        if (!validate()) return;

        if (validate()) {
            /* console.log("Credentials", inputQuery.email, inputQuery.password);
            Alert.alert("Login", "Login Successful"); */
            navigation.navigate('PostsScreen');
        }
    };


    const onSignUp = (inputQuery: UserEmailProps) => {
        Keyboard.dismiss();
        navigation.navigate('Registration', { userEmail: inputQuery.email });
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <>
                <Image
                    source={require('../../../assets/images/background/background-photo.jpg')}
                    style={styles.background_image}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    <View style={[styles.formContainer, { width: SCREEN_WIDTH }]}>
                        <Text style={styles.title}>Sign In</Text>

                        <View style={styles.innerContainer}>
                            <Input
                                placeholder="Email address"
                                value={inputQuery.email}
                                error={error.email}
                                autofocus={true}
                                autoCapitalize='none'
                                onValueChange={(value) => handleValueChange(value, "email")}
                            />

                            <Input
                                placeholder="Password"
                                value={inputQuery.password}
                                error={error.password}
                                rightButton={<ShowButton togglePasswordVisibility={togglePasswordVisibility} />}
                                outerStyles={styles.outerStyles}
                                secureTextEntry={!isPasswordVisible}
                                autoCapitalize='none'
                                onValueChange={(value) => handleValueChange(value, "password")}
                            />
                        </View>

                        <View style={styles.buttonsContainer}>
                            <Button
                                buttonStyles={styles.button}
                                onPress={onLogin}
                            >
                                <Text style={[styles.baseText, styles.buttonText]}>
                                    Sign In
                                </Text>
                            </Button>

                            <View style={styles.signUpContainer}>
                                <Text style={styles.baseText}>
                                    Don't have an account?
                                </Text>
                                <TouchableWithoutFeedback onPress={() => onSignUp(inputQuery)}>
                                    <Text style={[styles.baseText, styles.signUpText]}>
                                        Sign up
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </>
        </TouchableWithoutFeedback>
    );
};

export default LoginScreen;
