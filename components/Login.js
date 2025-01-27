import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BlinkingText from './BlinkingText';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ActivityIndicator
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

const Login = ({route, setToken}) => {
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [loadModalVisible, setLoadModalVisible] = useState(false)
  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm();

  const handleLogin = async credentials => {
    try {
      const response = await axios.post(
        'https://laundry-backend-1-omo2.onrender.com/api/login', credentials,
      );
      setError('');
      setToken(response.data.token);
      return response.data
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Unauthorized user, Please register!');
      } else {
        setError('An error occurred during login');
      }
      console.error('Login error:', error);

      return error.response
    }
  };

  const onSubmit = data => {
    setLoadModalVisible(true)
    handleLogin(data).then(() => {
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
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {error && <Text style={styles.errorMessage}>{error}</Text>}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
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
            {errors.email && (
              <Text style={styles.errorMessage}>{errors.email.message}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
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
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
            />
            {errors.password && (
              <Text style={styles.errorMessage}>{errors.password.message}</Text>
            )}
          </View>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.newUserContainer}>
          <Text style={styles.newUserText}>New user? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Create Account</Text>
          </TouchableOpacity>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#007bff',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  newUserContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  newUserText: {
    color: '#666',
    fontSize: 16,
  },
  registerLink: {
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

export default Login;
