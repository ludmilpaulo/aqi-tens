import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust the import path as necessary
import { useForm } from 'react-hook-form';
import tailwind from 'tailwind-rn';
import { basAPI, Categoria, GetService } from '@/configs/variable';

// Assuming AddServiceModal and EditServiceModal are already converted to React Native
import AddServiceModal from '@/components/AddServiceModal';
import EditServiceModal from '@/components/EditServiceModal';
import ServiceTableContainer from '@/components/ServiceTableContainer'; // This needs to be adapted for React Native

const Services: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [services, setServices] = useState<GetService[] | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editingService, setEditingService] = useState<GetService | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<GetService>();

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${basAPI}/shops/services_categorias/`);
        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleUpdate = async (serviceId: number, updatedServiceData: GetService) => {
    try {
      const response = await fetch(`${basAPI}/shops/update-service/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedServiceData),
      });

      if (response.ok) {
        alert("Service updated successfully!");
      } else {
        alert("Failed to update service. Please try again.");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      alert("An error occurred while trying to update the service. Please try again.");
    }
  };

  return (
    <View style={tailwind('flex-1 px-4')}>
      <TouchableOpacity style={tailwind('bg-blue-500 p-2 rounded mb-4')}
        onPress={() => setIsAddModalOpen(true)}>
        <Text style={tailwind('text-white text-center')}>Add Service</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}>
        <AddServiceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          categorias={categorias}
          user={user}
        />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}>
        <EditServiceModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={(data) => handleUpdate(editingService?.id || 0, data)}
          register={register}
          errors={errors}
          editingService={editingService}
          categorias={categorias}
        />
      </Modal>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        serviceTable && <ServiceTableContainer />
      )}
    </View>
  );
};

export default Services;
