import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Modal, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import tailwind from 'tailwind-rn';
import axios from 'axios';
import { basAPI, fetchAboutUsData } from '@/configs/variable';

interface Career {
  id: number;
  title: string;
  description: string;
}

interface FormValues {
  fullName: string;
  email: string;
  resume: File | null; // This needs handling for mobile, typically using a document picker
}

const Careers: React.FC = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormValues>({ fullName: '', email: '', resume: null });
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Career[]>(`${basAPI}/careers/careers/`);
        setCareers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch careers data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApply = (careerId: number) => {
    setSelectedCareer(careerId);
    setIsOpen(true);
  };

  const handleFileChange = (file: File | null) => {
    setFormData({ ...formData, resume: file });
  };

  const handleSubmit = async () => {
    if (!selectedCareer || !formData.fullName || !formData.email || !formData.resume) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('career', String(selectedCareer));
    formDataToSend.append('full_name', formData.fullName);
    formDataToSend.append('email', formData.email);
    // Resume file handling needs additional implementation
    // formDataToSend.append('resume', formData.resume);

    try {
      const response = await axios.post(`${basAPI}/careers/apply-for-job/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Application submitted successfully!');
      setFormData({ fullName: '', email: '', resume: null });
      setIsOpen(false);
    } catch (error) {
      Alert.alert('Error submitting application. Please try again.');
    }
  };

  return (
    <ScrollView style={tailwind('bg-white')}>
      <View style={tailwind('p-4')}>
        <Text style={tailwind('text-xl font-bold')}>Carreiras</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          careers.map(career => (
            <View key={career.id} style={tailwind('p-4 border rounded')}>
              <Text style={tailwind('text-lg font-bold')}>{career.title}</Text>
              <Text style={tailwind('mb-4')}>{career.description}</Text>
              <Button title="Aplicar" onPress={() => handleApply(career.id)} />
            </View>
          ))
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsOpen(!isOpen);
        }}
      >
        <View style={tailwind('flex-1 justify-center items-center')}>
          <View style={tailwind('bg-white rounded-lg p-4')}>
            <TextInput
              style={tailwind('text-input mb-4')}
              placeholder="Full name"
              onChangeText={text => setFormData({...formData, fullName: text})}
              value={formData.fullName}
            />
            <TextInput
              style={tailwind('text-input mb-4')}
              placeholder="Email"
              onChangeText={text => setFormData({...formData, email: text})}
              value={formData.email}
            />
            {/* Implement file input */}
            <Button title="Submit Application" onPress={handleSubmit} />
            <Button title="Cancel" color="red" onPress={() => setIsOpen(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Careers;
