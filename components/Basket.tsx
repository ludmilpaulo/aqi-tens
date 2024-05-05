import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import AddToCart from './AddToCart';
import tailwind from 'tailwind-rn';
import { Product } from '@/redux/slices/basketSlice';
import { useNavigation } from '@react-navigation/native';

const Basket: React.FC = () => {
  const cart = useSelector((state: RootState) => state.basket.items);
  const navigation = useNavigation();

  // Grouping products by shopName and shopId
  const groupedCart: { [key: string]: Product[] } = {};
  cart.forEach((item) => {
    const key = `${item.shopName}_${item.shopId}`;
    if (!groupedCart[key]) {
      groupedCart[key] = [];
    }
    groupedCart[key].push(item);
  });

  // Render empty cart message if cart is empty
  if (cart.length === 0) {
    return <Text>Your cart is empty.</Text>;
  }

  return (
    <FlatList
      data={Object.entries(groupedCart)}
      keyExtractor={([key]) => key}
      renderItem={({ item: [groupKey, items] }) => (
        <View style={tailwind('bg-white border rounded-lg overflow-hidden shadow-md m-2 p-4')}>
          <Text style={tailwind('text-xl font-semibold mb-2')}>{items[0].shopName}</Text>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={tailwind('flex-row items-center justify-between')}>
                <View style={tailwind('flex-row space-x-4')}>
                  {item.image_urls?.length > 0 && (
                    <Image
                      source={{ uri: item.image_urls[0] }}
                      style={tailwind('w-16 h-16 rounded-md')}
                      resizeMode="cover"
                    />
                  )}
                  <Text style={tailwind('font-semibold')}>{item.title}</Text>
                </View>
                <View style={tailwind('flex-row items-center')}>
                  <AddToCart product={item} />
                  <Text style={tailwind('font-semibold ml-2')}>{item.quantity}</Text>
                  <Text style={tailwind('font-semibold ml-2')}>{item.quantity * item.price} Kz</Text>
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            style={tailwind('bg-green-500 mt-4 p-2 rounded-md items-center')}
            onPress={() => navigation.navigate('CheckoutScreen', { cart: JSON.stringify(items) })}
          >
            <Text style={tailwind('text-white font-semibold')}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={tailwind('max-w-7xl mx-auto')}
    />
  );
};

export default Basket;
