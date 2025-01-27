import React, { useState, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../src/Register';
import Login from '../src/Login';
import VendorSearch from '../src/VendorSearch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const RootNavigationStack = () => {
    const [token, setToken] = useState(null);

    const loadToken = async () => {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
            setToken(storedToken);
        }
    };

    const saveToken = async (newToken) => {
        await AsyncStorage.setItem('userToken', newToken);
        setToken(newToken);
    };

    useLayoutEffect(() => {
        loadToken();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {!token ? (
                    <>
                        <Stack.Screen 
                            name="Register" 
                            options={{ headerShown: false }}
                        >
                            {props => <Register {...props} setToken={saveToken} />}
                        </Stack.Screen>
                        <Stack.Screen 
                            name="Login" 
                            options={{ headerShown: false }}
                        >
                            {props => <Login {...props} setToken={saveToken} />}
                        </Stack.Screen>
                    </>
                ) : (
                    <Stack.Screen name="VendorSearch" options={{ headerShown: false }}>
                        {props => <VendorSearch {...props} token={token} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigationStack;
