import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Star } from 'lucide-react-native';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';

const { width } = Dimensions.get('window');

const FEATURED_EXPERIENCES = [
  {
    id: '1',
    title: 'Sunset Kayaking',
    location: 'Beach Bay',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1430673/pexels-photo-1430673.jpeg',
    isPremium: true,
  },
  {
    id: '2',
    title: 'Cooking Class',
    location: 'Downtown',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg',
    isPremium: false,
  },
  {
    id: '3',
    title: 'Wine Tasting',
    location: 'Vineyard Hills',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg',
    isPremium: true,
  },
];

const POPULAR_LOCATIONS = [
  {
    id: '1',
    name: 'Downtown',
    image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg',
    count: 24,
  },
  {
    id: '2',
    name: 'Beach Front',
    image: 'https://images.pexels.com/photos/1531660/pexels-photo-1531660.jpeg',
    count: 18,
  },
  {
    id: '3',
    name: 'Mountain View',
    image: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg',
    count: 12,
  },
];

const CATEGORIES = [
  { id: '1', name: 'Romantic', icon: '❤️' },
  { id: '2', name: 'Adventure', icon: '🏔️' },
  { id: '3', name: 'Dining', icon: '🍽️' },
  { id: '4', name: 'Cultural', icon: '🎭' },
  { id: '5', name: 'Virtual', icon: '💻' },
  { id: '6', name: 'Budget', icon: '💰' },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color={Colors.grey} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Filter size={24} color={Colors.grey} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Search size={20} color={Colors.grey} />
            <Text style={styles.searchPlaceholder}>Search experiences, locations...</Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {CATEGORIES.map(category => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Experiences</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScroll}
          >
            {FEATURED_EXPERIENCES.map(item => (
              <TouchableOpacity key={item.id} style={styles.featuredCard}>
                <Image source={{ uri: item.image }} style={styles.featuredImage} />
                {item.isPremium && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumText}>Premium</Text>
                  </View>
                )}
                <View style={styles.featuredContent}>
                  <Text style={styles.featuredTitle}>{item.title}</Text>
                  <View style={styles.featuredMeta}>
                    <View style={styles.locationContainer}>
                      <MapPin size={14} color={Colors.grey} />
                      <Text style={styles.locationText}>{item.location}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                      <Star size={14} color={Colors.warning} fill={Colors.warning} />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.locationsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Locations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.locationsGrid}>
            {POPULAR_LOCATIONS.map(location => (
              <TouchableOpacity key={location.id} style={styles.locationCard}>
                <Image source={{ uri: location.image }} style={styles.locationImage} />
                <View style={styles.locationContent}>
                  <Text style={styles.locationName}>{location.name}</Text>
                  <Text style={styles.locationCount}>{location.count} experiences</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Card style={styles.specialCard}>
          <Text style={styles.specialTitle}>Weekend Special</Text>
          <Text style={styles.specialDescription}>
            Exclusive premium experiences at 20% off this weekend only!
          </Text>
          <Button 
            title="View Offers" 
            variant="primary" 
            style={styles.specialButton} 
            onPress={() => {/* TODO: Implement */}}
          />
        </Card>
        
        <View style={styles.spacer} />
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
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.sm,
    ...Layout.shadows.sm,
  },
  searchContainer: {
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    ...Layout.shadows.sm,
  },
  searchPlaceholder: {
    marginLeft: Layout.spacing.sm,
    color: Colors.grey,
    fontSize: Fonts.sizes.md,
  },
  categoriesContainer: {
    marginBottom: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.semibold,
    color: Colors.black,
    marginBottom: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
  },
  categoriesScroll: {
    paddingHorizontal: Layout.spacing.lg,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: Layout.spacing.lg,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: Layout.spacing.xs,
  },
  categoryName: {
    fontSize: Fonts.sizes.sm,
    color: Colors.grey,
  },
  featuredSection: {
    marginBottom: Layout.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  seeAllText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.primary,
    fontWeight: Fonts.weights.medium,
  },
  featuredScroll: {
    paddingHorizontal: Layout.spacing.lg,
    paddingRight: Layout.spacing.lg + Layout.spacing.md,
  },
  featuredCard: {
    width: 280,
    borderRadius: Layout.borderRadius.lg,
    backgroundColor: Colors.white,
    marginRight: Layout.spacing.lg,
    overflow: 'hidden',
    ...Layout.shadows.md,
  },
  featuredImage: {
    width: '100%',
    height: 160,
  },
  premiumBadge: {
    position: 'absolute',
    top: Layout.spacing.sm,
    left: Layout.spacing.sm,
    backgroundColor: Colors.accent,
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs / 2,
    borderRadius: Layout.borderRadius.round,
  },
  premiumText: {
    color: Colors.white,
    fontSize: Fonts.sizes.xs,
    fontWeight: Fonts.weights.semibold,
  },
  featuredContent: {
    padding: Layout.spacing.md,
  },
  featuredTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.semibold,
    color: Colors.black,
    marginBottom: Layout.spacing.sm,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: Layout.spacing.xs,
    fontSize: Fonts.sizes.sm,
    color: Colors.grey,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: Layout.spacing.xs,
    fontSize: Fonts.sizes.sm,
    color: Colors.black,
    fontWeight: Fonts.weights.medium,
  },
  locationsSection: {
    marginBottom: Layout.spacing.xl,
  },
  locationsGrid: {
    paddingHorizontal: Layout.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  locationCard: {
    width: (width - Layout.spacing.lg * 2 - Layout.spacing.md) / 2,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Layout.spacing.md,
    backgroundColor: Colors.white,
    ...Layout.shadows.md,
  },
  locationImage: {
    width: '100%',
    height: 100,
  },
  locationContent: {
    padding: Layout.spacing.md,
  },
  locationName: {
    fontSize: Fonts.sizes.md,
    fontWeight: Fonts.weights.semibold,
    color: Colors.black,
    marginBottom: Layout.spacing.xs,
  },
  locationCount: {
    fontSize: Fonts.sizes.xs,
    color: Colors.grey,
  },
  specialCard: {
    margin: Layout.spacing.lg,
    padding: Layout.spacing.lg,
    backgroundColor: Colors.primaryLight,
    borderRadius: Layout.borderRadius.lg,
  },
  specialTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.white,
    marginBottom: Layout.spacing.sm,
  },
  specialDescription: {
    fontSize: Fonts.sizes.md,
    color: Colors.white,
    marginBottom: Layout.spacing.lg,
  },
  specialButton: {
    backgroundColor: Colors.white,
  },
  spacer: {
    height: 100,
  },
});