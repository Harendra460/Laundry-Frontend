import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, PermissionsAndroid, Platform, Linking, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const VendorSearch = () => {
    const [location, setLocation] = useState(null);
    const [vendors, setVendors] = useState([]);
    const [serviceFilter, setServiceFilter] = useState('');
    const [loading, setLoading] = useState(false);

    // const vendorsList = [
    //     {   
    //         id: 1,
    //         name: 'Harendra', 
    //         city: 'Hyderabad',
    //         service_name: 'Washing'
    //     },
    //     {
    //         id: 2,
    //         name: 'Hari', 
    //         city: 'Bangalore',
    //         service_name: 'Clothes'
    //     },
    //     {   
    //         id:3,
    //         name: '13434', 
    //         city: 'Chennai',
    //         service_name: 'Dry cleaning'
    //     },
    //     {
    //         id: 4,
    //         name: 'yugjhc', 
    //         city: 'Delhi',
    //         service_name: 'Iron'
    //     },
    //     {
    //         id: 5,
    //         name: 'nicuskfj', 
    //         city: 'Noida',
    //         service_name: 'Plumber'
    //     },
    // ]

    useLayoutEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "This app needs access to your location.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );

                console.log("Location permission status:", granted);

                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                return true;
            }
        };

        const getLocation = async () => {
            const hasPermission = await requestLocationPermission();
            if (hasPermission) {
                Geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                        fetchVendors(latitude, longitude);
                    },
                    error => console.log(error),
                    { enableHighAccuracy: true, timeout: 20000 }
                );
            } else {
                console.log("Location permission denied");
            }
        };

        getLocation();
    }, []);

    const fetchVendors = async (lat, lon) => {
        setLoading(true);
        try {
            const response = await axios.get('http://192.168.1.59:4000/api/vendors/search', {
                params: { 
                    latitude: lat, 
                    longitude: lon,
                    service: serviceFilter 
                }
            });

            setVendors(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderVendorItem = ({ item }) => (
        <View style={styles.vendorCard}>
            <Text style={styles.vendorName}>Vendor Name: {item.name}</Text>
            <Text style={styles.vendorCity}>City: {item.city}</Text>
            <Text style={styles.vendorService}>Services: {item.service_name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Vendors</Text>
            </View>
            <TextInput
                placeholder="Search Service"
                placeholderTextColor="#888"
                value={serviceFilter}
                onChangeText={setServiceFilter}
                onSubmitEditing={() => 
                    location && fetchVendors(location.latitude, location.longitude)
                }
                style={styles.input}
            />
            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : vendors.length === 0 ? (
                <Text style={styles.loadingText}>No vendors available!</Text>
            ) : (
                <FlatList
                    data={vendors}
                    renderItem={renderVendorItem}
                    keyExtractor={item => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 10, 
        backgroundColor: '#e0f7fa'
    },
    header: { 
        backgroundColor: '#00796b',
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    headerText: { 
        fontSize: 24,
        fontWeight: 'bold', 
        color: '#ffffff'
    },
    input: {
        height: 50,
        borderColor: '#00796b',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    vendorCard: { 
        padding: 20, 
        borderBottomWidth: 1, 
        borderColor: '#ddd',
        marginBottom: 15,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    loadingText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 25,
    },
    vendorName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    vendorCity: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5
    },
    vendorService: {
        fontSize: 16,
        color: '#00796b',
    },
});

export default VendorSearch;