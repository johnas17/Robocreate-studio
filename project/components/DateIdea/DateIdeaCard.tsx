import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import { Heart, Clock, DollarSign, MapPin, Share2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';

const { width } = Dimensions.get('window');

interface DateIdeaProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  duration: string;
  price: 'Free' | '$' | '$$' | '$$$';
  location: string;
  distance?: string;
  isPremium?: boolean;
  onPress: () => void;
  onFavorite: () => void;
  onShare: () => void;
  isFavorite?: boolean;
}

export default function DateIdeaCard({
  title,
  description,
  imageUrl,
  category,
  duration,
  price,
  location,
  distance,
  isPremium = false,
  onPress,
  onFavorite,
  onShare,
  isFavorite = false,
}: DateIdeaProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
          resizeMode="cover" 
        />
        
        {isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={[
            styles.favoriteButton, 
            isFavorite && styles.favoriteButtonActive
          ]} 
          onPress={onFavorite}
          activeOpacity={0.8}
        >
          <Heart 
            size={18} 
            color={isFavorite ? Colors.white : Colors.primary} 
            fill={isFavorite ? Colors.primary : 'none'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.category}>{category}</Text>
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Share2 size={16} color={Colors.grey} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={14} color={Colors.grey} />
            <Text style={styles.metaText}>{duration}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <DollarSign size={14} color={Colors.grey} />
            <Text style={styles.metaText}>{price}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <MapPin size={14} color={Colors.grey} />
            <Text style={styles.metaText}>{distance || location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - (Layout.spacing.lg * 2),
    borderRadius: Layout.borderRadius.lg,
    backgroundColor: Colors.white,
    marginBottom: Layout.spacing.lg,
    ...Layout.shadows.md,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  premiumBadge: {
    position: 'absolute',
    top: Layout.spacing.sm,
    left: Layout.spacing.sm,
    backgroundColor: Colors.accent,
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs / 2,
    borderRadius: Layout.borderRadius.round,
    ...Layout.shadows.sm,
  },
  premiumText: {
    color: Colors.white,
    fontSize: Fonts.sizes.xs,
    fontWeight: Fonts.weights.semibold,
  },
  favoriteButton: {
    position: 'absolute',
    top: Layout.spacing.sm,
    right: Layout.spacing.sm,
    backgroundColor: Colors.white,
    padding: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.round,
    ...Layout.shadows.sm,
  },
  favoriteButtonActive: {
    backgroundColor: Colors.primary,
  },
  content: {
    padding: Layout.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  category: {
    fontSize: Fonts.sizes.xs,
    color: Colors.primary,
    fontWeight: Fonts.weights.semibold,
    textTransform: 'uppercase',
  },
  shareButton: {
    padding: Layout.spacing.xs,
  },
  title: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.black,
    marginBottom: Layout.spacing.xs,
  },
  description: {
    fontSize: Fonts.sizes.sm,
    color: Colors.grey,
    marginBottom: Layout.spacing.md,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: Layout.spacing.xs,
    fontSize: Fonts.sizes.xs,
    color: Colors.grey,
  },
});