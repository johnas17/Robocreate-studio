import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Animated, 
} from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';

interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface CategoryFilterProps {
  categories: Category[];
  onCategorySelect: (categoryId: string | null) => void;
  initialCategory?: string | null;
}

export default function CategoryFilter({
  categories,
  onCategorySelect,
  initialCategory = null,
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [animation] = useState(new Animated.Value(0));
  
  const handleSelect = (categoryId: string) => {
    // If already selected, deselect it
    const newCategory = activeCategory === categoryId ? null : categoryId;
    setActiveCategory(newCategory);
    onCategorySelect(newCategory);
    
    // Animate indicator
    Animated.spring(animation, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(0);
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Browse Categories</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity 
            key={category.id}
            style={[
              styles.category,
              activeCategory === category.id && styles.activeCategory,
            ]}
            onPress={() => handleSelect(category.id)}
            activeOpacity={0.7}
          >
            {category.icon}
            <Text 
              style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText,
              ]}
            >
              {category.name}
            </Text>
            
            {activeCategory === category.id && (
              <Animated.View 
                style={[
                  styles.indicator,
                  {
                    transform: [
                      {
                        scale: animation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1],
                        }),
                      },
                    ],
                  },
                ]}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.spacing.md,
  },
  label: {
    fontSize: Fonts.sizes.md,
    fontWeight: Fonts.weights.semibold,
    color: Colors.black,
    marginBottom: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.lg,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    marginRight: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.round,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.greyLight,
    position: 'relative',
  },
  activeCategory: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.grey,
    fontWeight: Fonts.weights.medium,
    marginLeft: Layout.spacing.xs,
  },
  activeCategoryText: {
    color: Colors.white,
  },
  indicator: {
    position: 'absolute',
    bottom: -2,
    left: '50%',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.white,
    marginLeft: -3,
  },
});