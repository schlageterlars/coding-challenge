import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewBadge = () => {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>NEW</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#333',
    borderRadius: 10, 
    borderTopEndRadius: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFF', 
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default NewBadge;