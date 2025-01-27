import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const Login = ({ route, setToken }) => {
    
    const [error, setError] = useState('')

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm();
    const navigation = useNavigation();

    const handleLogin = async (credentials) => {
        try {
          console.log("Data login-----", credentials)
          const response = await axios.post("http://192.168.1.59:4000/api/login", credentials);
          setError("");
          setToken(response.data.token);
        } catch (error) {
          if (error.response?.status === 401) {
            setError("Unauthorized user, Please register!");
          } else {
            setError("An error occurred during login");
          }
          console.error("Login error:", error);
        }
      };

    const onSubmit = (data) => {
        handleLogin(data)
    };

    return (
        <View style={styles.authContainer}>
            <View style={styles.authCard}>
                <Text style={styles.title}>Login</Text>
                {error && <Text style={styles.errorMessage}>{error}</Text>}
                <View style={styles.formGroup}>
                    <Text>Email</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                keyboardType="email-address"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="email"
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        }}
                    />
                    {errors.email && <Text style={styles.errorMessage}>{errors.email.message}</Text>}
                </View>

                <View style={styles.formGroup}>
                    <Text>Password</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="password"
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }
                        }}
                    />
                    {errors.password && <Text style={styles.errorMessage}>{errors.password.message}</Text>}
                </View>

                <Button title="Login" onPress={handleSubmit(onSubmit)} color="#1d4ed8" />
                
                <Text style={styles.authSwitch}>
                    Don't have an account?{' '}
                    <Text style={styles.switchButton} onPress={() => navigation.navigate('Register')}>
                        Register
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        padding: 20,
        backgroundColor: '#f0f0f0', // Replace with your variable
    },
    authCard: {
        backgroundColor: '#ffffff', // Replace with your variable
        padding: 32,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        maxWidth: 400,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: '#333', // Replace with your variable
        marginBottom: 24,
    },
    formGroup: {
        marginBottom: 15,
    },
    input: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc', // Replace with your variable
        borderRadius: 4,
        fontSize: 16,
        backgroundColor: '#ffffff', // Replace with your variable
        color: '#333', // Replace with your variable
    },
    errorMessage: {
        color: '#ff3333',
        backgroundColor: '#ffe6e6',
        padding: 10,
        borderRadius: 4,
        marginBottom: 15,
        textAlign: 'center',
    },
    authSwitch: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666', // Replace with your variable
    },
    switchButton: {
        color: '#1d4ed8', // Replace with your variable
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
});

export default Login;