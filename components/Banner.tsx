import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import tailwind from 'tailwind-rn';

type Shop = {
  id: number;
  name: string;
  phone: string;
  address: string;
  logo_url: string;
};

type ShopCardProps = {
  shopData: Shop[];
};

const Banner: React.FC<ShopCardProps> = ({ shopData }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch image URLs from shopData and update images state
    const imageUrls = shopData.map((item) => item.logo_url);
    setImages(imageUrls);
  }, [shopData]);

  useEffect(() => {
    // Function to change current slide
    const changeSlide = () => {
      setCurrentSlide((prevSlide) =>
        prevSlide === images.length - 1 ? 0 : prevSlide + 1,
      );
    };

    // Interval to change slide every 6 seconds
    const slideInterval = setInterval(changeSlide, 6000);

    // Clean up interval on component unmount
    return () => clearInterval(slideInterval);
  }, [images]);

  return (
    <View style={tailwind('relative')}>
      {images.length > 0 && (
        <Image
          source={{ uri: images[currentSlide] }}
          style={{
            width: Dimensions.get('window').width,
            height: 400, // fixed height, you can adjust it based on your requirement
            resizeMode: 'cover',
          }}
          // `key` prop added to force re-render on image change
          key={currentSlide}
        />
      )}
    </View>
  );
};

export default Banner;
