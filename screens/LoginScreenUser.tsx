import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { basAPI, useHeaderData } from '@/configs/variable';
import axios from 'axios';
import tailwind from 'tailwind-rn';
import { FontAwesome5 } from '@expo/vector-icons';

const LoginScreenUser: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const headerData = useHeaderData(); // This should be adapted to be compatible with React Native

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${basAPI}/accounts/login/`, {
        username: username,
        password: password,
      });

      if (response.status === 200 && response.data.is_customer === true) {
        Alert.alert("Login successful!");
        dispatch(loginUser(response.data));
        navigation.navigate('Home');
      } else if (response.data.is_customer === false) {
        dispatch(loginUser(response.data));
        navigation.navigate('ShopDashboard');
      } else {
        Alert.alert("Error", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Login Error", "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: headerData?.backgroundApp }}
      style={tailwind('flex-1 justify-center items-center')}
      resizeMode="cover"
    >
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <View style={tailwind('bg-white p-4 rounded-lg')}>
        <View style={tailwind('mb-4')}>
          <Text style={tailwind('text-xl font-bold')}>Faça login na sua conta</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={tailwind('text-sm text-blue-500')}>Não tem uma conta? Assine aqui</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Nome do Usuário"
          value={username}
          onChangeText={setUsername}
          style={tailwind('bg-gray-200 p-2 rounded mb-4')}
        />
        <View style={tailwind('relative')}>
          <TextInput
            value={password}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            style={tailwind('bg-gray-200 p-2 rounded mb-4')}
          />
          <TouchableOpacity
            style={tailwind('absolute inset-y-0 right-0 p-2')}
            onPress={togglePasswordVisibility}
          >
            <FontAwesome5 name={showPassword ? 'eye-slash' : 'eye'} size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tailwind('bg-blue-500 p-3 rounded mb-2')}
          onPress={handleSubmit}
        >
          <Text style={tailwind('text-white text-center')}>Entrar na Minha Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={tailwind('text-blue-500 text-center')}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreenUser;
