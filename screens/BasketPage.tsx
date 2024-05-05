import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons as an example, you may use any suitable icon set
import tailwind from 'tailwind-rn';

import Basket from '@/components/Basket'; // Make sure this is adapted to React Native

const BasketPage: React.FC = () => {
  return (
    <View style={tailwind('w-full px-10 max-w-7xl mx-auto')}>
      <View style={tailwind('flex-row items-center space-x-2')}>
        <Ionicons name="cart" size={40} color="black" style={tailwind('w-10 h-10')} />
        <Text style={tailwind('text-3xl font-bold')}>Seu carrinho</Text>
      </View>
      <Text style={tailwind('mt-2 mb-5')}>
        Revise os itens em seu carrinho e finalize a compra quando estiver pronto!
      </Text>

      <Basket />
    </View>
  );
};

export default BasketPage;
