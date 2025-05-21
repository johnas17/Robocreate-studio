import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { CircleCheck, Wifi } from 'lucide-react-native';
import Card from '@/components/UI/Card';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';

interface DataStatusProps {
  isGenerating: boolean;
  dataGenerated?: number; // in MB
}

export default function DataStatus({ 
  isGenerating, 
  dataGenerated = 0 
}: DataStatusProps) {
  const [progressWidth] = useState(new Animated.Value(0));
  const [currentData, setCurrentData] = useState(dataGenerated);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Simulate data generation when active
  useEffect(() => {
    if (isGenerating) {
      // Clear any existing interval first
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Set up new interval
      intervalRef.current = setInterval(() => {
        setCurrentData(prev => {
          const newValue = prev + (Math.random() * 0.5);
          return parseFloat(newValue.toFixed(2));
        });
      }, 5000);
      
      // Animate progress bar
      Animated.timing(progressWidth, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      // Clear interval when not generating
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Reset animation when not generating
      Animated.timing(progressWidth, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
    
    // Cleanup function to clear interval when component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isGenerating, progressWidth]);
  
  const progressBarWidth = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Data Status</Text>
        {isGenerating && (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Active</Text>
          </View>
        )}
      </View>
      
      <View style={styles.dataInfo}>
        <Wifi size={20} color={Colors.secondary} />
        <Text style={styles.dataText}>
          <Text style={styles.dataValue}>{currentData.toFixed(2)} MB</Text> generated
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <Animated.View 
          style={[
            styles.progressBar,
            { width: progressBarWidth },
          ]}
        />
      </View>
      
      {isGenerating ? (
        <Text style={styles.generatingText}>
          Actively generating data bundles. Keep the app open for maximum efficiency.
        </Text>
      ) : (
        <View style={styles.inactiveContainer}>
          <CircleCheck size={16} color={Colors.grey} />
          <Text style={styles.inactiveText}>
            Generator is currently inactive. Toggle to start.
          </Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  title: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.semibold,
    color: Colors.black,
  },
  statusBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs / 2,
    borderRadius: Layout.borderRadius.round,
  },
  statusText: {
    color: Colors.white,
    fontSize: Fonts.sizes.xs,
    fontWeight: Fonts.weights.medium,
  },
  dataInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  dataText: {
    marginLeft: Layout.spacing.sm,
    fontSize: Fonts.sizes.md,
    color: Colors.grey,
  },
  dataValue: {
    color: Colors.black,
    fontWeight: Fonts.weights.bold,
  },
  progressContainer: {
    height: 8,
    backgroundColor: Colors.greyLight,
    borderRadius: Layout.borderRadius.round,
    marginBottom: Layout.spacing.md,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: Layout.borderRadius.round,
  },
  generatingText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.primary,
    fontWeight: Fonts.weights.medium,
  },
  inactiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inactiveText: {
    marginLeft: Layout.spacing.xs,
    fontSize: Fonts.sizes.sm,
    color: Colors.grey,
  },
});