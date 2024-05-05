import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeOrderedItems, selectCartItems, Product } from '@/redux/slices/basketSlice';
import { selectUser } from '@/redux/slices/authSlice';
import axios from 'axios';
import { basAPI } from '@/configs/variable';
import UserProfile from '@/components/UserProfile';
import { useNavigation } from '@react-navigation/native';
import tailwind from 'tailwind-rn';

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const itemsInCart = useSelector(selectCartItems);
  const user = useSelector(selectUser);

  const [cartData, setCartData] = useState<Product[]>(itemsInCart);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showUserProfilePopup, setShowUserProfilePopup] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.post(`${basAPI}/accounts/customer/profile/`, {
        user_id: user?.user_id,
      });

      if (response.status === 200) {
        if (!response.data.customer_details.avatar ||
            !response.data.customer_details.phone ||
            !response.data.customer_details.address) {
          setShowUserProfilePopup(true);
        }
      } else {
        console.error("Failed to fetch user profile:", response.data.error);
      }
    } catch (error) {
      console.error("Error occurred while fetching user profile:", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const shopId = cartData.length > 0 ? cartData[0].shopId : null;
      const response = await axios.post(`${basAPI}/orders/customer/add_order/`, {
        access_token: user?.token,
        address,
        shop_id: shopId,
        order_details: cartData.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      });

      if (response.status === 200) {
        console.log("Order placed successfully:", response.data);
        dispatch(removeOrderedItems(cartData.map(item => item.id)));
        navigation.navigate('SuccessScreen');
      } else {
        console.error("Failed to place order:", response.data.error);
      }
    } catch (error) {
      console.error("Error occurred while placing order:", error);
    }
    setLoading(false);
  };

  return (
    <View style={tailwind('flex-1 justify-center items-center')}>
      {showUserProfilePopup && <UserProfile />}
      <Text style={tailwind('text-lg font-bold')}>Checkout</Text>
      <TextInput
        style={tailwind('border p-2 m-2')}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={tailwind('border p-2 m-2')}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Submit Order" onPress={handleSubmit} disabled={loading} />
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default CheckoutScreen;
