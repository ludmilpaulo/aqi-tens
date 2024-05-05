import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ImageBackground, Image, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { selectCartItems } from '@/redux/slices/basketSlice';
import { useNavigation } from '@react-navigation/native';
import { SearchIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tailwind from 'tailwind-rn';

interface HeaderData {
  born_date: string;
  phone: string;
  address: string;
  whatsapp: string;
  facebook: string;
  twitter: string;
  instagram: string;
  logo: string;
  backgroundImage: string;
}

interface SearchResult {
  id: number;
  name: string;
  description: string;
  image: string;
}

const HeaderTopArea: React.FC = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${basAPI}/info/aboutus/`);
        const data = await response.json();
        setHeaderData(data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      Alert.alert("Search Error", "Please enter a search term.");
      return;
    }

    try {
      const response = await fetch(`${basAPI}/search/?query=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      if (response.ok) {
        setSearchResults(data);
      } else {
        throw new Error(data.message || "Unable to fetch search results.");
      }
    } catch (error: any) {
      Alert.alert("Search Error", error.message || "Failed to search.");
    }
  };

  return (
    <View style={tailwind('flex-1')}>
      <ImageBackground
        source={{ uri: headerData?.backgroundImage || undefined }}
        style={tailwind('flex-1 justify-center items-center')}
        resizeMode="cover"
      >
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={{ uri: headerData?.logo || '/default-logo.png' }}
            style={tailwind('w-20 h-20')}
          />
        </TouchableOpacity>

        <View style={tailwind('flex-row items-center')}>
          <TextInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Pesquise tudo..."
            style={tailwind('bg-white rounded-full px-4 flex-1')}
          />
          <TouchableOpacity onPress={handleSearch}>
            <SearchIcon color="yellow" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={tailwind('p-2 bg-white mt-2 rounded')}>
              <Text style={tailwind('text-lg font-bold')}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
      </ImageBackground>
    </View>
  );
};

export default HeaderTopArea;
