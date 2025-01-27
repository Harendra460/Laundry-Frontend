import React, { useState} from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const VendorSearch = () => {
    const [location, setLocation] = useState(null);
    // const [vendors, setVendors] = useState([]);
    const [serviceFilter, setServiceFilter] = useState('');
    const [loading, setLoading] = useState(false);

    const vendorsList = [
        {   
            id: 1,
            name: 'Vikas', 
            mobile: 352352113,
            city: 'Hyderabad',
            service_name: 'Washing'
        },
        {
            id: 2,
            name: 'Kiran', 
            mobile: 984156463,
            city: 'Hyderabad',
            service_name: 'Washing and Folding'
        },
        {   
            id: 3,
            name: 'Anil', 
            mobile: 7489658465,
            city: 'Hyderabad',
            service_name: 'Dry cleaning'
        },
        {
            id: 4,
            name: 'Sunil', 
            mobile: 9465326453,
            city: 'Hyderabad',
            service_name: 'Ironing'
        },
        {
            id: 5,
            name: 'Rajesh', 
            mobile: 265238653,
            city: 'Hyderabad',
            service_name: 'Express Laundry'
        },
        {
            id: 6,
            name: 'Suresh',
            mobile: 286532461, 
            city: 'Hyderabad',
            service_name: 'Premium Laundry'
        },
        {
            id: 7,
            name: 'Ramesh',
            mobile: 96532451, 
            city: 'Hyderabad',
            service_name: 'Clothes Washing'
        },
        {
            id: 8,
            name: 'Mahesh', 
            mobile: 2964518465,
            city: 'Hyderabad',
            service_name: 'Full Laundry Service'
        },
        {
            id: 9,
            name: 'Naveen', 
            mobile: 9465312461,
            city: 'Hyderabad',
            service_name: 'Laundry Pickup'
        },
        {
            id: 10,
            name: 'Ravi', 
            mobile: 86453124312,
            city: 'Hyderabad',
            service_name: 'Washing'
        },
    ]

    // const fetchVendors = async (lat, lon) => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.get('https://laundry-backend-1-omo2.onrender.com/api/vendors/search', {
    //             params: { 
    //                 latitude: lat, 
    //                 longitude: lon,
    //                 service: serviceFilter 
    //             }
    //         });

    //         setVendors(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const filteredVendors = vendorsList.filter(vendor => 
        vendor.service_name.toLowerCase().includes(serviceFilter.toLowerCase())
    );

    const renderVendorItem = ({ item }) => (
        <View style={styles.vendorCard}>
            <Text style={styles.vendorName}>Vendor Name: {item.name}</Text>
            <Text style={styles.vendorCity}>Mobile: {item.mobile}</Text>
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
                // onSubmitEditing={() => 
                //     location && fetchVendors(location.latitude, location.longitude)
                // }
                style={styles.input}
            />
            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : filteredVendors.length === 0 ? (
                <Text style={styles.loadingText}>No vendors available!</Text>
            ) : (
                <FlatList
                    data={filteredVendors}
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
        marginBottom: 10
    },
    vendorCity: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10
    },
    vendorService: {
        fontSize: 16,
        color: '#00796b',
    },
});

export default VendorSearch;
