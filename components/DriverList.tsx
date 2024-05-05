import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // Ensure your store path is correct
import { basAPI } from '@/configs/variable';
import tailwind from 'tailwind-rn';

interface Driver {
  id: number;
  username: string;
  avatar: string;
  phone: string;
  address: string;
}

const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const user = useSelector((state: RootState) => state.auth.user); // Adjust based on your store setup

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${basAPI}/report/shop/drivers/${user.user_id}/`);
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchData();
  }, [user.user_id]); // Ensure the correct dependency in the dependency array

  return (
    <View style={tailwind('h-full w-full')}>
      <FlatList
        data={drivers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={tailwind('px-4 py-2 border-b border-gray-200')}>
            <View style={tailwind('flex-row items-center')}>
              <Image
                source={{ uri: `${basAPI}${item.avatar}` }}
                style={tailwind('w-10 h-10 rounded-full')}
                resizeMode='cover'
              />
              <View style={tailwind('ml-3')}>
                <Text style={tailwind('font-normal')}>{item.username}</Text>
                <Text style={tailwind('font-normal')}>{item.phone}</Text>
                <Text style={tailwind('font-normal')}>{item.address}</Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={tailwind('bg-white')}
      />
    </View>
  );
};

export default DriverList;
