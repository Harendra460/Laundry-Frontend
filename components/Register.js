import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import BlinkingText from './BlinkingText';

const Register = ({route, setToken}) => {
  const navigation = useNavigation();
  const [loadModalVisible, setLoadModalVisible] = useState(false)
  const [error, setError] = useState('')

    const { control, handleSubmit, formState: { errors } } = useForm();

    const handleRegister = async(data) => {
      try {
          const response = await axios.post("https://laundry-backend-1-omo2.onrender.com/api/register", data);
          setError("");
          setToken(response.data.token);
          return response.data
      } catch (error) {
          if (error.response?.status === 400) {
              setError("User already exists, Please login!");
          } else {
              setError("An error occurred during register");
          }
          console.error("Register error:", error);
          return error.response
      }
  }

  const onSubmit = (data) => {
    setLoadModalVisible(true)
      handleRegister(data).then(() => {
        setLoadModalVisible(false)
      })
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={loadModalVisible}
        animationType="slide"
        onRequestClose={() => {}}
        transparent={true}
      >
        <View style={styles.batchModalCenterView}>
          <View>
            <ActivityIndicator color={'#92EDE1'} size={"large"} />
            <BlinkingText text="Please wait...." duration={1000} />
          </View>
        </View>
      </Modal>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>
        {error && <Text style={styles.errorMessage}>{error}</Text>} 
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Name"
                                placeholderTextColor="#999"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="name"
                        rules={{
                            required: 'Name is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters',
                            },
                        }}
                    />
                    {errors.name && <Text style={styles.errorMessage}>{errors.name.message}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#999"
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
                                message: 'Invalid email address',
                            },
                        }}
                    />
                    {errors.email && <Text style={styles.errorMessage}>{errors.email.message}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#999"
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
                                value: 8,
                                message: 'Password must be at least 8 characters',
                            },
                        }}
                    />
                    {errors.password && <Text style={styles.errorMessage}>{errors.password.message}</Text>}

          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 16,
  },
  loginLink: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: '#ff3333',
    backgroundColor: '#ffe6e6',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
    textAlign: 'center',
},
batchModalCenterView: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
});

export default Register;
