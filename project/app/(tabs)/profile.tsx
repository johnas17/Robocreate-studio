import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, CreditCard, Bell, MapPin, FileSliders as Sliders, User, CircleHelp as HelpCircle, Info } from 'lucide-react-native';
import SettingsItem from '@/components/Profile/SettingsItem';
import SubscriptionCard from '@/components/Profile/SubscriptionCard';
import ReferralCard from '@/components/Profile/ReferralCard';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';
import { premiumBenefits, mockSettings } from '@/utils/mockData';

export default function ProfileScreen() {
  const [isPremium, setIsPremium] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  
  const handleSubscribe = () => {
    Alert.alert(
      'Subscribe to Premium',
      'This will unlock all premium features for $4.99/month.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Subscribe', 
          onPress: () => {
            setIsPremium(true);
            Alert.alert('Success', 'You are now a premium member!');
          }
        },
      ]
    );
  };
  
  const handleCopyCode = () => {
    Alert.alert('Code Copied', 'Your referral code has been copied to clipboard!');
  };
  
  const renderSettingIcon = (iconName: string) => {
    const iconSize = 20;
    const iconColor = Colors.primary;
    
    switch (iconName) {
      case 'bell':
        return <Bell size={iconSize} color={iconColor} />;
      case 'map-pin':
        return <MapPin size={iconSize} color={iconColor} />;
      case 'sliders':
        return <Sliders size={iconSize} color={iconColor} />;
      case 'user':
        return <User size={iconSize} color={iconColor} />;
      case 'credit-card':
        return <CreditCard size={iconSize} color={iconColor} />;
      case 'help-circle':
        return <HelpCircle size={iconSize} color={iconColor} />;
      case 'info':
        return <Info size={iconSize} color={iconColor} />;
      default:
        return <Settings size={iconSize} color={iconColor} />;
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={Colors.grey} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Jamie Wilson</Text>
            <Text style={styles.profileEmail}>jamie.wilson@example.com</Text>
            {isPremium && (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            )}
          </View>
        </View>
        
        <SubscriptionCard
          isPremium={isPremium}
          benefits={premiumBenefits}
          onSubscribe={handleSubscribe}
          onLearnMore={() => Alert.alert('Premium Features', 'Here you can learn about all the premium features.')}
        />
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingsCard}>
            {mockSettings.map((setting, index) => (
              <SettingsItem
                key={setting.id}
                icon={renderSettingIcon(setting.icon)}
                title={setting.title}
                subtitle={setting.subtitle}
                type={setting.type as any}
                value={
                  setting.id === 'notifications'
                    ? notificationsEnabled
                    : setting.id === 'location'
                    ? locationEnabled
                    : false
                }
                onToggle={
                  setting.id === 'notifications'
                    ? setNotificationsEnabled
                    : setting.id === 'location'
                    ? setLocationEnabled
                    : undefined
                }
                onPress={() => Alert.alert(setting.title, `Navigate to ${setting.title}`)}
                showDivider={index !== mockSettings.length - 1}
              />
            ))}
          </View>
        </View>
        
        <ReferralCard 
          referralCode="DATEBYTE25"
          pointsEarned={75}
          onCopyCode={handleCopyCode}
        />
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => Alert.alert('Log Out', 'Are you sure you want to log out?')}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.lg,
  },
  title: {
    fontSize: Fonts.sizes.title,
    fontWeight: Fonts.weights.bold,
    color: Colors.black,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Layout.shadows.sm,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xl,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: Layout.spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.black,
    marginBottom: Layout.spacing.xs / 2,
  },
  profileEmail: {
    fontSize: Fonts.sizes.sm,
    color: Colors.grey,
  },
  premiumBadge: {
    marginTop: Layout.spacing.sm,
    backgroundColor: Colors.accent,
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs / 2,
    borderRadius: Layout.borderRadius.round,
    alignSelf: 'flex-start',
  },
  premiumText: {
    color: Colors.white,
    fontSize: Fonts.sizes.xs,
    fontWeight: Fonts.weights.semibold,
  },
  settingsSection: {
    marginVertical: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.semibold,
    color: Colors.black,
    marginBottom: Layout.spacing.md,
  },
  settingsCard: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    ...Layout.shadows.md,
  },
  logoutButton: {
    paddingVertical: Layout.spacing.lg,
    marginTop: Layout.spacing.md,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: Fonts.sizes.md,
    color: Colors.error,
    fontWeight: Fonts.weights.medium,
  },
});