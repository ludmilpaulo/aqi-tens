import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // Adjust the import path as necessary
import { basAPI, Categoria } from '@/configs/variable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Ensure FontAwesome is properly setup in your project
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

type Product = {
  id: number;
  title: string;
  price: number;
  categoryId: number;
};

type ProductsProps = {
  products?: Product[];
};

const Products: React.FC<ProductsProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Product>();

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${basAPI}/shops/categorias/`);
        const data = await response.json();
        setCategorias(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleUpdate = async (updatedProductData: Product) => {
    try {
      const response = await fetch(`${basAPI}/shops/update-product/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProductData),
      });

      if (response.ok) {
        alert('Product updated successfully!');
        setIsEditModalOpen(false);
      } else {
        alert('Failed to update product. Please try again.');
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while trying to update the product. Please try again.");
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <View style={tailwind('flex-1 px-4')}>
      <TouchableOpacity onPress={() => setIsAddModalOpen(true)} style={tailwind('bg-blue-500 p-3 rounded')}>
        <Text style={tailwind('text-white text-center')}>Add Product</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isAddModalOpen}
            onRequestClose={() => setIsAddModalOpen(false)}
          >
            <View style={tailwind('flex-1 justify-center items-center')}>
              <View style={tailwind('bg-white p-4 rounded')}>
                <Text>Add a new product</Text>
                {/* Form inputs and submit button */}
                <TouchableOpacity onPress={() => setIsAddModalOpen(false)} style={tailwind('bg-red-500 mt-4 p-2 rounded')}>
                  <Text style={tailwind('text-white text-center')}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
          >
            <View style={tailwind('flex-1 justify-center items-center')}>
              <View style={tailwind('bg-white p-4 rounded')}>
                <Text>Edit Product</Text>
                {/* Form inputs and submit button */}
                <TouchableOpacity onPress={() => setIsEditModalOpen(false)} style={tailwind('bg-red-500 mt-4 p-2 rounded')}>
                  <Text style={tailwind('text-white text-center')}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onLongPress={() => openEditModal(item)} style={tailwind('border p-3')}>
                <Text>{item.title}</Text>
                <Text>{item.price}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

export default Products;
