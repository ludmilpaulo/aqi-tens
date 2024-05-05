import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // Update path as needed
import { OrderTypes, basAPI } from '@/configs/variable';
import tailwind from 'tailwind-rn';

const Order: React.FC = () => {
  const [orders, setOrders] = useState<OrderTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleStatus = async (orderId: number) => {
    const user_id = user?.user_id;

    if (!user_id) {
      Alert.alert("Error", "User ID not provided.");
      return;
    }

    if (Alert.alert(
      "Confirm Action",
      "Are you sure you want to call the driver?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => callDriver(user_id, orderId) }
      ]
    ));
  };

  const callDriver = async (userId: number, orderId: number) => {
    try {
      const response = await fetch(`${basAPI}/orders/shop/status/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, id: orderId }),
      });

      if (response.ok) {
        Alert.alert("Success", "Product deleted successfully!");
      } else {
        Alert.alert("Error", "Failed to delete product. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Alert.alert(
        "Error",
        "An error occurred while trying to delete the product. Please try again.",
      );
    }
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(true);

      if (user?.user_id) {
        try {
          const response = await fetch(`${basAPI}/orders/shop/orders/?user_id=${user.user_id}`);
          if (response.ok) {
            const data = await response.json();
            console.log("Order ==>", data);
            setOrders(data);
          } else {
            console.error("Failed to fetch product data");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
        setLoading(false);
      }
    };

    fetchOrderData();
    const intervalId = setInterval(fetchOrderData, 5000);
    return () => clearInterval(intervalId);
  }, [user.user_id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={tailwind('flex-1')}>
      <View style={tailwind('w-full')}>
        {orders.map((order) => (
          <View key={order.id} style={tailwind('border p-4 mb-2')}>
            <Text style={tailwind('font-bold')}>Order #{order.id}</Text>
            {order.order_details.map((od, index) => (
              <Text key={od.id}>
                {od.product.title} {od.product.price} x {od.quantity} = {od.sub_total}kz
                {index < order.order_details.length - 1 ? '\n' : null}
              </Text>
            ))}
            <Text>Customer: {order.customer.name}</Text>
            <Text>Driver: {order.driver?.name}</Text>
            <Text>Total: {order.total}</Text>
            <Text>Status: {order.status}</Text>
            {order.status === "Cozinhando" && (
              <TouchableOpacity
                onPress={() => handleStatus(order.id)}
                style={tailwind('bg-blue-500 mt-2 p-2 rounded')}>
                <Text style={tailwind('text-white text-center')}>Chamar Motorista</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Order;
