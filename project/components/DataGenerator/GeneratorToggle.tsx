import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Zap } from 'lucide-react-native';
import Switch from '@/components/UI/Switch';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';

interface GeneratorToggleProps {
  onToggle: (isActive: boolean) => void;
  initialValue?: boolean;
}

export default function GeneratorToggle({ 
  onToggle, 
  initialValue = false 
}: GeneratorToggleProps) {
  const [isActive, setIsActive] = useState(initialValue);
  const [pulseAnim] = useState(new Animated.Value(1));
  
  const handleToggle = (value: boolean) => {
    setIsActive(value);
    onToggle(value);
    
    if (value) {
      // Start pulsing animation when activated
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Stop animation when deactivated
      pulseAnim.setValue(1);
      Animated.timing(pulseAnim).stop();
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Animated.View
          style={[
            styles.iconBackground,
            isActive && styles.activeIconBackground,
            {
              transform: [{ scale: isActive ? pulseAnim : 1 }],
            },
          ]}
        >
          <Zap 
            size={28} 
            color={isActive ? Colors.white : Colors.grey} 
            strokeWidth={2.5}
          />
        </Animated.View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Data Generator</Text>
        <Text style={styles.subtitle}>
          {isActive 
            ? 'Actively generating free data bundles' 
            : 'Tap to start generating free data'}
        </Text>
      </View>
      
      <Switch 
        value={isActive} 
        onValueChange={handleToggle}
        activeColor={Colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    marginVertical: Layout.spacing.md,
    ...Layout.shadows.md,
  },
  iconContainer: {
    marginRight: Layout.spacing.md,
  },
  iconBackground: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.greyLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconBackground: {
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    marginRight: Layout.spacing.md,
  },
  title: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.semibold,
    color: Colors.black,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    fontSize: Fonts.sizes.sm,
    color: Colors.grey,
  },
});