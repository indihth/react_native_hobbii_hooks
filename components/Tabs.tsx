import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type TabsProps = {
  tabTitles: string[]; // dynamic define tabs
  defaultTab?: string; // optional defning of default tab
  onTabChange: (tab: string) => void;
};

const Tabs = ({ tabTitles, defaultTab = tabTitles[0], onTabChange }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab); // default to first string in tabTitles

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <View style={styles.container}>
      {tabTitles.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => handleTabPress(tab)}>
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: 12,
  },
  tabText: {
    color: Colors.border,
  },
  activeTabText: {
    color: 'black',
    fontWeight: 'bold',
  },

  activeTab: {
    borderBottomColor: 'black',
  },
});

export default Tabs;