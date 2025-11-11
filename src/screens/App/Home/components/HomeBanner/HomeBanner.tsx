import { Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { RFValue } from 'react-native-responsive-fontsize';
import { blackColor, whiteColor } from 'constants/colors';
import { useSharedValue } from 'react-native-reanimated';

const defaultDataWith6Colors = [
  '#B0604D',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
];

const HomeBanner = () => {
  const { width } = useWindowDimensions();
  const scrollOffsetValue = useSharedValue<number>(0);
  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <View
        key={index}
        style={{
          flex: 1,
          borderRadius: RFValue(16),
          backgroundColor: item,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: blackColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 5,
        }}
      >
        <Text
          style={{
            color: whiteColor,
            fontSize: RFValue(20),
            fontWeight: 'bold',
          }}
        >
          Slide {index + 1}
        </Text>
      </View>
    );
  };
  return (
    <View id="carousel-component">
      <Carousel
        loop
        width={width - RFValue(24)}
        height={200}
        snapEnabled
        pagingEnabled
        autoPlay
        autoPlayInterval={2500}
        data={defaultDataWith6Colors}
        defaultScrollOffsetValue={scrollOffsetValue}
        style={{ width: '100%' }}
        onSnapToItem={(index: number) => {}}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeBanner;
