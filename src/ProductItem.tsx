import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Inventory } from './store/inventory';
import { Icon, IconButton } from 'react-native-paper';
import NewBadge from './NewBadge';

const ProductItem: React.FC<{ inventory: Inventory }> = ({ inventory }) => {
  const { createdTime, fields } = inventory;
  const [showBadges, setShowBadges] = useState(false);

  const [imageError, setImageError] = useState(!fields['Product Image']);
  const placeholderImage = 'https://www.movasis.com/wp-content/uploads/2017/01/image-placeholder-500x500.jpg';

  const newThresholdDays = 7;

  const isNewItem = () => {
    const date = new Date();
    date.setDate(date.getDate() - newThresholdDays);
    return new Date(createdTime) > date;
  };

  const ToggleBadgesButton = () => (
    <IconButton
      style={styles.iconButton}
      icon={showBadges ? 'chevron-up' : 'chevron-down'}
      size={28}
      onPress={() => setShowBadges(!showBadges)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageError ? placeholderImage : fields['Product Image'] }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={1}
              ellipsizeMode='tail' >{fields['Product Name']}</Text>
            <Text style={styles.createdTime}>{new Date(createdTime).toLocaleDateString('de-DE')}</Text>
          </View>
          {isNewItem() && <NewBadge />}
          <ToggleBadgesButton />
        </View>
        {showBadges && (
          <View style={styles.badgesContainer}>
            {fields['Product Categories'] && fields["Product Categories"].split(',').map(category => (
              <Text key={category} style={styles.badge}>
                {category.trim()}
              </Text>
            ))}
          </View>)}
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  iconButton: {
    margin: 0,
    padding: 0,
    justifyContent: 'flex-start',
  },
  container: {
    flexDirection: 'row',
    padding: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: "#1B2633",
    shadowOpacity: 0.25,
    backgroundColor: "#F8F9FC",
    borderRadius: 4
  },
  imageContainer: {
    marginRight: 12,
  },
  image: {
    width: 85,
    height: 112,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginBottom: 4,
  },
  createdTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4
  },
  badge: {
    backgroundColor: '#D4E5FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 48,
  },
});


export default ProductItem;
