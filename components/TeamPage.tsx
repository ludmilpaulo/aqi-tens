import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGithub, faLinkedin, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import tailwind from 'tailwind-rn';

interface TeamData {
  name: string;
  title: string;
  image: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

interface TeamPageProps {
  member: TeamData;
}

const TeamPage: React.FC<TeamPageProps> = ({ member }) => {
  const handleLinking = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <View style={[tailwind('bg-white shadow-lg rounded-lg overflow-hidden'), styles.card]}>
      <View style={{ height: 160, width: '100%' }}>
        <Image source={{ uri: member.image }} style={tailwind('h-full w-full')} resizeMode="cover" />
      </View>
      <View style={tailwind('p-4 text-center')}>
        <Text style={tailwind('text-lg font-semibold')}>{member.name}</Text>
        <Text style={tailwind('text-gray-600')}>{member.title}</Text>
     
        <View style={tailwind('flex justify-center mt-4')}>
          <View style={tailwind('flex-row items-center')}>
            {member.github && (
              <TouchableOpacity onPress={() => handleLinking(member.github)}>
                <FontAwesomeIcon icon={faGithub} size={24} style={tailwind('text-blue-600 mr-2')} />
              </TouchableOpacity>
            )}
            {member.linkedin && (
              <TouchableOpacity onPress={() => handleLinking(member.linkedin)}>
                <FontAwesomeIcon icon={faLinkedin} size={24} style={tailwind('text-blue-600 mr-2')} />
              </TouchableOpacity>
            )}
            {member.facebook && (
              <TouchableOpacity onPress={() => handleLinking(member.facebook)}>
                <FontAwesomeIcon icon={faFacebook} size={24} style={tailwind('text-blue-600 mr-2')} />
              </TouchableOpacity>
            )}
            {member.twitter && (
              <TouchableOpacity onPress={() => handleLinking(member.twitter)}>
                <FontAwesomeIcon icon={faTwitter} size={24} style={tailwind('text-blue-600 mr-2')} />
              </TouchableOpacity>
            )}
            {member.instagram && (
              <TouchableOpacity onPress={() => handleLinking(member.instagram)}>
                <FontAwesomeIcon icon={faInstagram} size={24} style={tailwind('text-blue-600')} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    transform: [{ scale: 1.05 }], // To emulate hover effect
  }
});

export default TeamPage;
