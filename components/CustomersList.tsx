import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // Make sure to define your RootState type accordingly
import { basAPI } from '@/configs/variable';
import tailwind from 'tailwind-rn';

interface Customer {
  id: number;
  username: string;
  avatar: string;
  phone: string;
  address: string;
}

const CustomersList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const user = useSelector((state: RootState) => state.auth.user); // Adjust according to your actual Redux state structure

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${basAPI}/report/shop/customers/${user.user_id}/`);
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchData();
  }, [user.user_id]); // Ensure dependency array is correct for your use case

  return (
    <View style={tailwind('h-full w-full')}>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={tailwind('flex-row justify-between px-4 py-2 border-b border-gray-200')}>
            <View style={tailwind('flex-row items-center')}>
              <Image
                source={{ uri: `${basAPI}${item.avatar}` }}
                style={tailwind('w-10 h-10 rounded-full')}
              />
              <Text style={tailwind('ml-3 font-normal')}>{item.username}</Text>
            </View>
            <Text style={tailwind('font-normal')}>{item.phone}</Text>
            <Text style={tailwind('font-normal')}>{item.address}</Text>
          </View>
        )}
        contentContainerStyle={tailwind('bg-white')}
      />
    </View>
  );
};

export default CustomersList;
