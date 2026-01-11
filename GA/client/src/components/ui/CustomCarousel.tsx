import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewStyle,
  StyleProp,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface CustomCarouselProps {
  data: any[];
  renderItem: ({ item, index }: { item: any; index: number }) => React.ReactElement;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  loop?: boolean;
}

const CustomCarousel: FC<CustomCarouselProps> = ({
  data,
  renderItem,
  autoPlay = false,
  autoPlayInterval = 3000,
  width = screenWidth,
  height,
  style,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoPlay && !isUserInteracting && data.length > 0) {
      interval = setInterval(() => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= data.length) {
          nextIndex = 0; // Loop back to start
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true, // or false if we want instant jump, but true is better for UI
          });
        } else {
            flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
            });
        }
        setCurrentIndex(nextIndex);
      }, autoPlayInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, autoPlay, autoPlayInterval, isUserInteracting, data.length]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Basic calculation of index based on offset
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const itemWidth = width; 
    const index = Math.round(scrollOffset / itemWidth);
    
    // Only update if index changed significantly to avoid potential jitter or loops if we added infinite scroll later
    if (index !== currentIndex && index >= 0 && index < data.length) {
        // We update this so the auto-play knows where to continue from
        setCurrentIndex(index);
    }
  };

  const onScrollBeginDrag = () => {
    setIsUserInteracting(true);
  };

  const onScrollEndDrag = () => {
    setIsUserInteracting(false);
  };
  
  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      onScroll(event);
      setIsUserInteracting(false);
  }

  return (
    <View style={[{ width, height }, style]}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item, index }) => (
          <View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
             {renderItem({ item, index })}
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        // Optimizations
        removeClippedSubviews={false} // Sometimes helps with white screens on android
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
      />
    </View>
  );
};

export default CustomCarousel;
