import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tailwind from 'tailwind-rn';

type ShopCardProps = {
  shopData: Shop[];
};

type Shop = {
  id: number;
  name: string;
  phone: string;
  address: string;
  logo_url: string;
};

const ShopCard: React.FC<ShopCardProps> = ({ shopData }) => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={tailwind('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4')}>
      {shopData.map((shop: Shop) => (
        <View
          key={shop.id}
          style={[tailwind('flex bg-white flex-col shadow-lg rounded-xl'), styles.shopCard]}
        >
          <Image
            style={tailwind('w-full h-full mb-4 self-center')}
            source={{ uri: shop.logo_url }}
            resizeMode="cover"
          />
          <View style={tailwind('flex flex-col items-center flex-grow')}>
            <Text style={tailwind('text-xl font-medium text-black')}>{shop.name}</Text>
            <Text style={tailwind('text-gray-500')}>{shop.address}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductList', {
              shopName: shop.name,
              shopId: shop.id,
              phone: shop.phone,
              shopImage_url: shop.logo_url,
              address: shop.address,
            })}
            style={tailwind('mt-auto w-full bg-black text-white font-bold py-2 px-4 rounded')}
          >
            <Text style={tailwind('text-center')}>Ver produtos de {shop.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shopCard: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
  },
});

export default ShopCard;
