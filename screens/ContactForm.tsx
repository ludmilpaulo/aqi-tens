import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slices/authSlice';
import { fetchAboutUsData, basAPI } from '@/configs/variable';
import tailwind from 'tailwind-rn';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faMailBulk, faPhone, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [aboutUsData, setAboutUsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAboutUsData();
      setAboutUsData(data);
    };
    fetchData();
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log('Form submitted:', formData);
    
    try {
      const response = await axios.post(`${basAPI}/info/contacts/`, formData);
  
      if (response.status === 200) {
        Alert.alert('Success', 'Your form has been submitted successfully. We will contact you within 24 hours.');
        setFormData({
          subject: '',
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <ScrollView style={tailwind('flex-1')}>
      <ImageBackground
        source={{ uri: aboutUsData?.backgroundApp }}
        style={tailwind('w-full')}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={tailwind('p-4')}>
          <Text style={tailwind('text-3xl font-bold mb-4 text-center')}>Let’s chat and get a quote!</Text>
          <View style={tailwind('mb-4')}>
            <Text style={tailwind('text-gray-800 text-sm font-semibold mb-2')}>Subject</Text>
            <View style={tailwind('flex-row items-center')}>
              <FontAwesomeIcon icon={faUser} style={tailwind('text-gray-600 mr-2')} />
              <TextInput
                style={tailwind('border rounded w-full py-2 px-3 text-gray-700')}
                onChangeText={text => handleChange('subject', text)}
                value={formData.subject}
                placeholder="Enter your Subject"
              />
            </View>
          </View>
          <View style={tailwind('mb-4')}>
            <Text style={tailwind('text-gray-800 text-sm font-semibold mb-2')}>Name</Text>
            <View style={tailwind('flex-row items-center')}>
              <FontAwesomeIcon icon={faUser} style={tailwind('text-gray-600 mr-2')} />
              <TextInput
                style={tailwind('border rounded w-full py-2 px-3 text-gray-700')}
                onChangeText={text => handleChange('name', text)}
                value={formData.name}
                placeholder="Enter your name"
              />
            </View>
          </View>
          <View style={tailwind('mb-4')}>
            <Text style={tailwind('text-gray-800 text-sm font-semibold mb-2')}>Email Address</Text>
            <View style={tailwind('flex-row items-center')}>
              <FontAwesomeIcon icon={faMailBulk} style={tailwind('text-gray-600 mr-2')} />
              <TextInput
                style={tailwind('border rounded w-full py-2 px-3 text-gray-700')}
                onChangeText={text => handleChange('email', text)}
                value={formData.email}
                placeholder="Enter your email address"
              />
            </View>
          </View>
          <View style={tailwind('mb-4')}>
            <Text style={tailwind('text-gray-800 text-sm font-semibold mb-2')}>Phone</Text>
            <View style={tailwind('flex-row items-center')}>
              <FontAwesomeIcon icon={faPhone} style={tailwind('text-gray-600 mr-2')} />
              <TextInput
                style={tailwind('border rounded w-full py-2 px-3 text-gray-700')}
                onChangeText={text => handleChange('phone', text)}
                value={formData.phone}
                placeholder="Enter your phone number"
              />
            </View>
          </View>
          <View style={tailwind('mb-4')}>
            <Text style={tailwind('text-gray-800 text-sm font-semibold mb-2')}>Message</Text>
            <View style={tailwind('flex-row items-center')}>
              <FontAwesomeIcon icon={faCommentDots} style={tailwind('text-gray-600 mr-2')} />
              <TextInput
                style={tailwind('border rounded w-full py-2 px-3 text-gray-700 h-32')}
                multiline={true}
                onChangeText={text => handleChange('message', text)}
                value={formData.message}
                placeholder="Enter your message"
              />
            </View>
          </View>
          <Button title="Submit" onPress={handleSubmit} color="#4f46e5" />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default ContactForm;
