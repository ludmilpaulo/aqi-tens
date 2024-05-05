import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust the import path as necessary
import { basAPI } from '@/configs/variable';
import tailwind from 'tailwind-rn';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Ensure FontAwesome is properly setup in your project

type CustomerData = {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  address: string;
};

type RestaurantData = {
  id: number;
  name: string;
  phone: string;
  address: string;
};

type MealData = {
  id: number;
  title: string;
  price: number;
};

type OrderDetailsData = {
  id: number;
  product: MealData;
  quantity: number;
  sub_total: number;
};

type DriverData = {
  id: number;
  name?: string;
  avatar: string;
  phone: string;
  address: string;
};

type OrderHistoryItem = {
  id: number;
  customer: CustomerData;
  restaurant: RestaurantData;
  driver: DriverData;
  order_details: OrderDetailsData[];
  total: number;
  status: string;
  address: string;
};

const OrderHistory: React.FC = () => {
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);

  const fetchOrderHistory = useCallback(async () => {
    try {
      let response = await fetch(`${basAPI}/orders/customer/order/history/`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: user.token }),
      });

      let responseJson = await response.json();
      setOrderHistory(responseJson.order_history);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  }, [user.token]);

  useEffect(() => {
    fetchOrderHistory();
  }, [fetchOrderHistory]);

  return (
    <View style={tailwind('flex-1')}>
      <View style={tailwind('flex-row items-center justify-between p-5')}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="times-circle" size={30} color="#004AAD" />
        </TouchableOpacity>
        <Text style={tailwind('text-lg font-light text-white')}>Ajuda</Text>
      </View>
      <FlatList
        data={orderHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={tailwind('mb-4 border border-gray-300 p-4 rounded')}>
            {item.driver && (
              <View style={tailwind('flex-row items-center mb-2')}>
                <Image
                  source={{ uri: item.driver.avatar }}
                  style={tailwind('w-12 h-12 rounded-full mr-2')}
                  resizeMode="cover"
                />
                <Text style={tailwind('font-bold')}>{item.driver.name}</Text>
                <Text>{item.driver.phone}</Text>
              </View>
            )}
            <Text style={tailwind('font-bold text-green-500')}>{item.status}</Text>
            {item.order_details.map((detail, index) => (
              <View key={index} style={tailwind('mb-2')}>
                <Text>{detail.product.title}</Text>
                <Text>Quantidade: {detail.quantity}</Text>
                <Text>Subtotal: {detail.sub_total}</Text>
              </View>
            ))}
            <Text style={tailwind('font-bold text-lg mb-2')}>Total: {item.total}</Text>
            <Text style={tailwind('text-gray-500')}>Address: {item.address}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default OrderHistory;
