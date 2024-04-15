import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import CategoryComponent from '@/components/CategoryComponent'; // Assuming you have a CategoryComponent in your components folder
import HeaderTopArea from '@/components/HeaderTopArea';
import Footer from '@/components/Footer';
import { Category, basAPI } from '@/configs/variable';

function ShopsCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${basAPI}/shops/shop-categories/`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HeaderTopArea />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {categories.map((category) => (
          <CategoryComponent key={category.id} category={category} />
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
}

export default ShopsCategories;
