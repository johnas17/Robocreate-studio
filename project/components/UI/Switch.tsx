import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
}

export default function Switch({
  value,
  onValueChange,
  style,
  disabled = false,
  activeColor = Colors.primary,
  inactiveColor = Colors.greyLight,
}: SwitchProps) {
  // Animation values
  const offset = useSharedValue(value ? 1 : 0);

  // Update animation when value changes
  useEffect(() => {
    offset.value = withSpring(value ? 1 : 0);
  }, [value, offset]);

  // Animated styles
  const trackAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      offset.value,
      [0, 1],
      [inactiveColor, activeColor]
    );

    return {
      backgroundColor,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 20, {
            damping: 15,
            stiffness: 180,
          }),
        },
      ],
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => !disabled && onValueChange(!value)}
      style={[styles.container, style, disabled && styles.disabled]}
      disabled={disabled}
    >
      <Animated.View style={[styles.track, trackAnimatedStyle]}>
        <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 28;
const THUMB_SIZE = 24;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: Colors.white,
    ...Layout.shadows.sm,
  },
  disabled: {
    opacity: 0.6,
  },
});