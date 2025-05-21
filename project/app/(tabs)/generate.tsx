import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Animated,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';
import GeneratorToggle from '@/components/DataGenerator/GeneratorToggle';
import DataStatus from '@/components/DataGenerator/DataStatus';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';

export default function GenerateScreen() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [dataGenerated, setDataGenerated] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  
  useEffect(() => {
    // Fade in animation when component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  
  const handleToggle = (active: boolean) => {
    setIsGenerating(active);
    
    if (!active) {
      // If turning off, show alert with summary
      Alert.alert(
        'Generator Paused',
        `You've generated ${dataGenerated.toFixed(2)} MB of data during this session.`,
        [{ text: 'OK' }]
      );
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Data Generator</Text>
          <Text style={styles.subtitle}>
            Generate free data bundles to use for your social media and online activities
          </Text>
        </View>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <GeneratorToggle 
            onToggle={handleToggle}
            initialValue={isGenerating}
          />
          
          <DataStatus 
            isGenerating={isGenerating}
            dataGenerated={dataGenerated}
          />
          
          <Card style={styles.infoCard}>
            <Text style={styles.infoTitle}>How it works</Text>
            <Text style={styles.infoText}>
              The data generator uses advanced network optimization and promotional partnerships to
              provide you with free data bundles. Keep the app open and the generator active to
              maximize your data generation.
            </Text>
            <View style={styles.bulletPoints}>
              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>Uses network optimization techniques</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>Leverages promotional partner offers</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>Accumulates data over time</Text>
              </View>
            </View>
            <Button
              title="Learn More"
              variant="outline"
              style={styles.learnButton}
              onPress={() => {/* TODO: Implement learn more */}}
            />
          </Card>
          
          <Card style={styles.statsCard}>
            <Text style={styles.statsTitle}>Your Data Stats</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{dataGenerated.toFixed(2)}</Text>
                <Text style={styles.statLabel}>MB Generated</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>MB Used</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{dataGenerated.toFixed(2)}</Text>
                <Text style={styles.statLabel}>MB Available</Text>
              </View>
            </View>
          </Card>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.lg,
  },
  header: {
    paddingVertical: Layout.spacing.lg,
  },
  title: {
    fontSize: Fonts.sizes.title,
    fontWeight: Fonts.weights.bold,
    color: Colors.black,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    fontSize: Fonts.sizes.md,
    color: Colors.grey,
  },
  scrollContent: {
    paddingBottom: Layout.spacing.xl,
  },
  infoCard: {
    marginVertical: Layout.spacing.md,
  },
  infoTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.semibold,
    color: Colors.black,
    marginBottom: Layout.spacing.md,
  },
  infoText: {
    fontSize: Fonts.sizes.md,
    color: Colors.grey,
    lineHeight: 24,
    marginBottom: Layout.spacing.md,
  },
  bulletPoints: {
    marginBottom: Layout.spacing.lg,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginRight: Layout.spacing.sm,
  },
  bulletText: {
    fontSize: Fonts.sizes.md,
    color: Colors.black,
  },
  learnButton: {
    alignSelf: 'flex-start',
  },
  statsCard: {
    marginVertical: Layout.spacing.md,
  },
  statsTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.semibold,
    color: Colors.black,
    marginBottom: Layout.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.primary,
    marginBottom: Layout.spacing.xs,
  },
  statLabel: {
    fontSize: Fonts.sizes.sm,
    color: Colors.grey,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.greyLight,
  },
});