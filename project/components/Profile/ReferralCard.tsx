import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { UserPlus } from 'lucide-react-native';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';

interface ReferralCardProps {
  referralCode: string;
  pointsEarned: number;
  onCopyCode: () => void;
}

export default function ReferralCard({
  referralCode,
  pointsEarned,
  onCopyCode,
}: ReferralCardProps) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on DateByte! Use my referral code ${referralCode} to get started and we'll both earn bonus points.`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <UserPlus size={24} color={Colors.white} />
        </View>
        <Text style={styles.title}>Invite Friends</Text>
      </View>
      
      <Text style={styles.description}>
        Share your code with friends and earn points for each referral
      </Text>
      
      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>Your Referral Code:</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>{referralCode}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={onCopyCode}>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsLabel}>Points Earned</Text>
        <Text style={styles.statsValue}>{pointsEarned}</Text>
      </View>
      
      <Button
        title="Invite Friends"
        variant="primary"
        style={styles.inviteButton}
        icon={<UserPlus size={16} color={Colors.white} style={styles.buttonIcon} />}
        iconPosition="left"
        onPress={handleShare}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.lg,
    marginVertical: Layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  title: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.black,
  },
  description: {
    fontSize: Fonts.sizes.sm,
    color: Colors.grey,
    marginBottom: Layout.spacing.lg,
  },
  codeContainer: {
    marginBottom: Layout.spacing.lg,
  },
  codeLabel: {
    fontSize: Fonts.sizes.sm,
    color: Colors.grey,
    marginBottom: Layout.spacing.xs,
  },
  codeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.greyLight,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
  },
  code: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.black,
    letterSpacing: 1,
  },
  copyButton: {
    backgroundColor: Colors.white,
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.sm,
    ...Layout.shadows.sm,
  },
  copyText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: Colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  statsLabel: {
    fontSize: Fonts.sizes.md,
    color: Colors.grey,
  },
  statsValue: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.accent,
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: Layout.spacing.xs,
  },
});