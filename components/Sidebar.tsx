import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import tailwind from 'tailwind-rn';

import { selectUser, logoutUser } from '@/redux/slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLaptop, faContacts, faBarChart, faTableBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import Services from './Services';
import Products from './Products';
import Order from './Order';
import Report from './Report';
import CustomersList from './CustomersList';
import DriverList from './DriverList';

const Sidebar = ({ onNavClick }) => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [activeSection, setActiveSection] = useState('');

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate('LoginScreen');
  };

  useEffect(() => {
    // Assume fetch to get background image or other data
    // fetchData();
  }, []);

  return (
    <View style={tailwind('flex-row h-full')}>
      <View style={[tailwind('w-64 bg-blue-800 p-4'), styles.sidebar]}>
        <ScrollView>
          <TouchableOpacity style={tailwind('mb-4')} onPress={() => setActiveSection('products')}>
            <FontAwesomeIcon icon={faContacts} size={20} style={tailwind('text-white')} />
            <Text style={tailwind('text-white')}>Products</Text>
          </TouchableOpacity>
          {/* Other navigation items */}
          <TouchableOpacity onPress={handleLogout} style={tailwind('mt-4 p-2 rounded hover:bg-red-500')}>
            <FontAwesomeIcon icon={faSignOutAlt} size={20} style={tailwind('text-red-400')} />
            <Text style={tailwind('text-red-400')}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={tailwind('flex-1 bg-gray-100')}>
        {activeSection === 'services' && <Services />}
        {activeSection === 'products' && <Products />}
        {activeSection === 'orders' && <Order />}
        {activeSection === 'report' && <Report />}
        {activeSection === 'customers' && <CustomersList />}
        {activeSection === 'drivers' && <DriverList />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default Sidebar;
