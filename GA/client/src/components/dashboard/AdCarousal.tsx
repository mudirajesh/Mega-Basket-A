import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import CustomCarousel from '@components/ui/CustomCarousel';
import {screenWidth} from '@utils/Scaling';
import ScalePress from '@components/ui/ScalePress';

const AdCarousal: FC<{adData: any}> = ({adData}) => {
  const width = screenWidth;
  const height = screenWidth * 0.5;

  return (
    <View style={{left: -20, marginVertical: 20}}>
      <CustomCarousel
        data={adData}
        renderItem={({item}: any) => {
          return (
            <ScalePress style={styles.imageContainer}>
              <Image source={item} style={styles.img} />
            </ScalePress>
          );
        }}
        autoPlay
        autoPlayInterval={3000}
        width={width}
        height={height}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});
export default AdCarousal;
