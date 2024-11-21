import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Card from './Card';

const CardList = ({ items = [] }) => {
  // Check if there is only one item


  return (
    <FlatList
      key={items.length}
      data={items}
      renderItem={({ item }) => <Card item={item} />}
      keyExtractor={(item, index) => index.toString()}
      numColumns= {2} 
      columnWrapperStyle={styles.row}

    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between', 
  },
});

export default CardList;
