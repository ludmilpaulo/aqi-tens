import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logoutUser, selectUser } from '../redux/slices/authSlice';
import { basAPI, googleAPi } from '../configs/variable';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const UserProfile: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [imageInfo, setImageInfo] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const userLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleAPi}`,
            );
            const data = await response.json();
            const formattedAddress = data.results[0].formatted_address;
            setAddress(formattedAddress);
          } catch (error) {
            console.error("Error fetching location:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
      );
    };

    userLocation();
  }, []);

  const handleTakePhotoOrSelect = async (imageUri: string) => {
    setImageInfo(imageUri);
  };

  const userUpdate = async () => {
    if (!imageInfo) {
      Alert.alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", { uri: imageInfo, name: 'avatar.jpg', type: 'image/jpeg' });
    formData.append("access_token", user.token);
    formData.append("address", address);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone", phone);

    try {
      const response = await fetch(`${basAPI}/accounts/customer/profile/update/`, {
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert(data.status);
        navigation.goBack();
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.non_field_errors.join(", "));
      }
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faTimes} size={24} />
      </TouchableOpacity>
      <Text style={styles.header}>Complete seu perfil</Text>
      <View style={styles.form}>
        <Image source={{ uri: imageInfo }} style={styles.image} />
        <TextInput style={styles.input} placeholder="Primeiro Nome" value={firstName} onChangeText={setFirstName} />
        <TextInput style={styles.input} placeholder="Ultimo Nome" value={lastName} onChangeText={setLastName} />
        <TextInput style={styles.input} placeholder="Número de Telefone" value={phone} onChangeText={setPhone} />
        <TextInput style={styles.input} placeholder="Endereco" value={address} onChangeText={setAddress} />
        <TouchableOpacity style={styles.button} onPress={userUpdate}>
          <Text style={styles.buttonText}>Atualize seu Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '90%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  }
});

export default UserProfile;
