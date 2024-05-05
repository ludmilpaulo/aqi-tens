import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tailwind from 'tailwind-rn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface HeaderData {
  born_date: string;
  phone: string;
  address: string;
  whatsapp: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  logo: string;
  backgroundImage: string;
}

const Footer: React.FC = () => {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const navigation = useNavigation();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${basAPI}/info/aboutus/`);
        const data = await response.json();
        setHeaderData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={[tailwind('w-full bg-gray-900'), styles.footer]}>
      <ImageBackground
        source={{ uri: headerData?.backgroundImage || undefined }}
        style={tailwind('w-full')}
        resizeMode="cover"
      >
        <View style={tailwind('px-6 py-12')}>
          <View style={tailwind('items-center')}>
            <Image
              source={{ uri: headerData?.logo || '/default-logo.png' }}
              style={{ width: 200, height: 50 }}
            />
          </View>
          <View style={tailwind('flex-row justify-between mt-8')}>
            <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
              <Text style={tailwind('text-white font-bold')}>Sobre nós</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Careers')}>
              <Text style={tailwind('text-white font-bold')}>Carreiras</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ContactPage')}>
              <Text style={tailwind('text-white font-bold')}>Contact Nos</Text>
            </TouchableOpacity>
          </View>
          <View style={tailwind('flex-row justify-between mt-12')}>
            <Text style={tailwind('text-white font-bold')}>
              &copy; {currentYear} Maindo. All Rights Reserved.
            </Text>
            <View style={tailwind('flex-row')}>
              {headerData?.facebook && (
                <FontAwesome name="facebook" size={24} color="#FFFFFF" style={tailwind('mr-2')} onPress={() => Linking.openURL(headerData.facebook)} />
              )}
              {headerData?.linkedin && (
                <FontAwesome name="linkedin" size={24} color="#FFFFFF" style={tailwind('mr-2')} onPress={() => Linking.openURL(headerData.linkedin)} />
              )}
              {headerData?.twitter && (
                <FontAwesome name="twitter" size={24} color="#FFFFFF" style={tailwind('mr-2')} onPress={() => Linking.openURL(headerData.twitter)} />
              )}
              {headerData?.instagram && (
                <FontAwesome name="instagram" size={24} color="#FFFFFF" onPress={() => Linking.openURL(headerData.instagram)} />
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    position: 'relative'
  }
});
