import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Crown, Check } from 'lucide-react-native';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';

interface BenefitItem {
  id: string;
  text: string;
}

interface SubscriptionCardProps {
  isPremium: boolean;
  benefits: BenefitItem[];
  onSubscribe: () => void;
  onLearnMore: () => void;
}

export default function SubscriptionCard({
  isPremium,
  benefits,
  onSubscribe,
  onLearnMore,
}: SubscriptionCardProps) {
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Crown size={24} color={Colors.white} />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>
            {isPremium ? 'Premium Member' : 'Upgrade to Premium'}
          </Text>
          <Text style={styles.subtitle}>
            {isPremium 
              ? 'Enjoy your exclusive benefits' 
              : 'Unlock exclusive date ideas and features'}
          </Text>
        </View>
      </View>
      
      <View style={styles.benefitsContainer}>
        {benefits.map(benefit => (
          <View key={benefit.id} style={styles.benefitItem}>
            <Check size={16} color={Colors.success} />
            <Text style={styles.benefitText}>{benefit.text}</Text>
          </View>
        ))}
      </View>
      
      {isPremium ? (
        <TouchableOpacity style={styles.learnMoreButton} onPress={onLearnMore}>
          <Text style={styles.learnMoreText}>Manage Subscription</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.actionContainer}>
          <Button
            title="Subscribe Now"
            size="medium"
            style={styles.subscribeButton}
            onPress={onSubscribe}
          />
          <TouchableOpacity style={styles.learnMoreButton} onPress={onLearnMore}>
            <Text style={styles.learnMoreText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    marginVertical: Layout.spacing.md,
    backgroundColor: '#FAFBFF',
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.black,
    marginBottom: Layout.spacing.xs / 2,
  },
  subtitle: {
    fontSize: Fonts.sizes.sm,
    color: Colors.grey,
  },
  benefitsContainer: {
    marginVertical: Layout.spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  benefitText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.black,
    marginLeft: Layout.spacing.sm,
  },
  actionContainer: {
    alignItems: 'center',
  },
  subscribeButton: {
    width: '100%',
    marginBottom: Layout.spacing.sm,
  },
  learnMoreButton: {
    paddingVertical: Layout.spacing.xs,
  },
  learnMoreText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.primary,
    fontWeight: Fonts.weights.medium,
    textDecorationLine: 'underline',
  },
});