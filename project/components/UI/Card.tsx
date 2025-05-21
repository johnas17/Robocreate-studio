import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  bordered?: boolean;
}

export default function Card({
  children,
  style,
  elevation = 'medium',
  bordered = false,
}: CardProps) {
  const cardStyles = [
    styles.card,
    elevation !== 'none' && styles[`elevation${elevation.charAt(0).toUpperCase() + elevation.slice(1)}`],
    bordered && styles.bordered,
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginVertical: Layout.spacing.sm,
  },
  bordered: {
    borderWidth: 1,
    borderColor: Colors.greyLight,
  },
  elevationSmall: {
    ...Layout.shadows.sm,
  },
  elevationMedium: {
    ...Layout.shadows.md,
  },
  elevationLarge: {
    ...Layout.shadows.lg,
  },
});