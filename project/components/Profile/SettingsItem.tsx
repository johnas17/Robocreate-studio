import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';

type SettingsItemType = 'navigation' | 'toggle' | 'info';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  type: SettingsItemType;
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  showDivider?: boolean;
}

export default function SettingsItem({
  icon,
  title,
  subtitle,
  type,
  value = false,
  onPress,
  onToggle,
  showDivider = true,
}: SettingsItemProps) {
  const renderRightElement = () => {
    switch (type) {
      case 'navigation':
        return <ChevronRight size={20} color={Colors.grey} />;
      case 'toggle':
        return (
          <Switch
            value={value}
            onValueChange={onToggle}
            trackColor={{ false: Colors.greyLight, true: Colors.primary }}
            thumbColor={Colors.white}
          />
        );
      case 'info':
      default:
        return null;
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={type === 'toggle' ? undefined : onPress}
        disabled={type === 'info' || type === 'toggle'}
      >
        <View style={styles.leftContent}>
          <View style={styles.iconContainer}>{icon}</View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
        <View style={styles.rightContent}>{renderRightElement()}</View>
      </TouchableOpacity>
      {showDivider && <View style={styles.divider} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.md,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.greyLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: Fonts.sizes.md,
    fontWeight: Fonts.weights.medium,
    color: Colors.black,
    marginBottom: subtitle ? Layout.spacing.xs / 2 : 0,
  },
  subtitle: {
    fontSize: Fonts.sizes.sm,
    color: Colors.grey,
  },
  rightContent: {
    marginLeft: Layout.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.greyLight,
    marginLeft: Layout.spacing.md + 36 + Layout.spacing.md,
  },
});