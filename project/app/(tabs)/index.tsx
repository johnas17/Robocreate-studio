import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  FlatList,
  Share,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bell } from 'lucide-react-native';
import DateIdeaCard from '@/components/DateIdea/DateIdeaCard';
import CategoryFilter from '@/components/DateIdea/CategoryFilter';
import Button from '@/components/UI/Button';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';
import { dateIdeas, categories } from '@/utils/mockData';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState<string | null>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const handleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };
  
  const handleShare = async (idea: typeof dateIdeas[0]) => {
    try {
      await Share.share({
        message: `Check out this date idea on DateByte: ${idea.title} - ${idea.description}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  const filteredIdeas = activeCategory === 'all' 
    ? dateIdeas 
    : dateIdeas.filter(idea => idea.category.toLowerCase().includes(activeCategory!));
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good afternoon,</Text>
          <Text style={styles.title}>Discover Date Ideas</Text>
        </View>
        <View style={styles.headerActions}>
          <Button
            title=""
            variant="ghost"
            style={styles.iconButton}
            icon={<Search size={24} color={Colors.grey} />}
            onPress={() => {/* TODO: Implement search */}}
          />
          <Button
            title=""
            variant="ghost"
            style={styles.iconButton}
            icon={<Bell size={24} color={Colors.grey} />}
            onPress={() => {/* TODO: Implement notifications */}}
          />
        </View>
      </View>
      
      <CategoryFilter 
        categories={categories}
        onCategorySelect={setActiveCategory}
        initialCategory="all"
      />
      
      <FlatList
        data={filteredIdeas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DateIdeaCard
            {...item}
            isFavorite={favorites.includes(item.id)}
            onFavorite={() => handleFavorite(item.id)}
            onShare={() => handleShare(item)}
            onPress={() => Alert.alert('Date Idea', `You selected ${item.title}`)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No date ideas found. Try a different category.
            </Text>
          </View>
        }
      />
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
    paddingTop: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
  },
  greeting: {
    fontSize: Fonts.sizes.md,
    color: Colors.grey,
    marginBottom: Layout.spacing.xs,
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
    marginLeft: Layout.spacing.sm,
  },
  listContent: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xl,
  },
  emptyState: {
    padding: Layout.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: Fonts.sizes.md,
    color: Colors.grey,
    textAlign: 'center',
  },
});