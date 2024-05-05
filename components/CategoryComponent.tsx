import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Categoria } from '../configs/variable';

type Props = {
  category: Categoria;
};

const CategoryComponent: React.FC<Props> = ({ category }) => {
  return (
    <>
      {category && (
        <TouchableOpacity
          onPress={() => {
            // Handle navigation to ShopList with category_id as query parameter
          }}
          style={{
            // Apply Tailwind CSS-like styles here using React Native's StyleSheet API
            // Example: grid-option class can be represented as below
            borderWidth: 1,
            borderColor: '#000',
            padding: 10,
            borderRadius: 8,
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{category.name}</Text>
          {category.image && (
            <View style={{ height: 200, width: 200, marginVertical: 10 }}>
              <Image
                source={{ uri: category.image }} // Assuming category.image is a valid URI
                style={{ flex: 1, resizeMode: 'cover', borderRadius: 8 }}
              />
            </View>
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default CategoryComponent;
