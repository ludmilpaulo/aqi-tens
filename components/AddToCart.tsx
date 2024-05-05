import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateBasket, selectCartItems, Product } from '@/redux/slices/basketSlice';
import RemoveFromCart from './RemoveFromCart';
import tailwind from 'tailwind-rn';

interface AddToCartProps {
  product: Product;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  console.log("product for cart ", product);
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const howManyInCart = cart
    .filter((item) => item.id === product.id)
    .reduce((total, item) => total + item.quantity, 0);

  const handleAdd = () => {
    dispatch(updateBasket(product));
  };

  if (howManyInCart > 0) {
    return (
      <View style={tailwind('flex-row items-center space-x-5')}>
        <RemoveFromCart product={product} />
        <Text>{howManyInCart}</Text>
        <TouchableOpacity
          style={tailwind('bg-green-500 p-3 rounded-lg')}
          onPress={handleAdd}
        >
          <Text style={tailwind('text-white')}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={tailwind('bg-green-500 p-3 rounded-lg')}
      onPress={handleAdd}
    >
      <Text style={tailwind('text-white')}>Add to Cart</Text>
    </TouchableOpacity>
  );
};

export default AddToCart;
