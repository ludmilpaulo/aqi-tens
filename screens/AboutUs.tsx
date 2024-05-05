import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Linking, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { AboutUsData, fetchAboutUsData, fetchTeamData, TeamData } from '@/configs/variable';
import TeamPage from '@/components/TeamPage';

const AboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState<AboutUsData | null>(null);
  const [team, setTeam] = useState<TeamData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAboutUsData();
      setAboutUsData(data);
    };

    const fetchTeam = async () => {
      const teamData = await fetchTeamData();
      setTeam(teamData);
    };

    fetchData();
    fetchTeam();
  }, []);

  return (
    <ScrollView style={tailwind('flex-1')}>
      {aboutUsData && (
        <ImageBackground
          source={{ uri: aboutUsData.backgroundApp }}
          style={tailwind('w-full')}
          imageStyle={{ resizeMode: 'cover' }}
        >
          <View style={tailwind('p-4 pt-6 md:p-6 lg:p-12')}>
            <Text style={tailwind('text-3xl font-bold mb-4 text-center')}>{aboutUsData.title}</Text>
            <Text style={tailwind('bg-white p-4')}>{aboutUsData.about}</Text>
            <Text>{aboutUsData.address}</Text>
            <Text>{aboutUsData.phone}</Text>
            <View style={tailwind('flex flex-row justify-center mt-4')}>
              {aboutUsData.facebook && (
                <FontAwesomeIcon icon={faFacebook} size={24} onPress={() => Linking.openURL(aboutUsData.facebook)} />
              )}
              {aboutUsData.instagram && (
                <FontAwesomeIcon icon={faInstagram} size={24} onPress={() => Linking.openURL(aboutUsData.instagram)} />
              )}
              {aboutUsData.linkedin && (
                <FontAwesomeIcon icon={faLinkedin} size={24} onPress={() => Linking.openURL(aboutUsData.linkedin)} />
              )}
              {aboutUsData.twitter && (
                <FontAwesomeIcon icon={faTwitter} size={24} onPress={() => Linking.openURL(aboutUsData.twitter)} />
              )}
            </View>
          </View>
        </ImageBackground>
      )}
      <Text style={tailwind('text-3xl font-bold mb-6 text-center text-white')}>Our Team</Text>
      <View style={tailwind('flex flex-row flex-wrap justify-center')}>
        {team.map((member) => (
          <View key={member.id} style={tailwind('w-64 mx-4 my-2')}>
            <TeamPage member={member} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AboutUs;
