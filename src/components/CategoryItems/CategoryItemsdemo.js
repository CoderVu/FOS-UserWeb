import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByIdCategory } from "../../components/Redux/Action/productActions";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Card from "../Card/Card";

const CategoryItems = forwardRef(({ categoryId }, ref) => {
  const dispatch = useDispatch();
  const flatListRef = useRef(null);

  const productsByCategory = useSelector((state) => state.product.productsByCategory);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByIdCategory(categoryId));
    }
  }, [categoryId, dispatch]);

  const categoryItems = productsByCategory[categoryId] || [];

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    },
  }));

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <FlatList
      ref={flatListRef}
      data={categoryItems}
      renderItem={({ item }) => <Card item={item} />}
      keyExtractor={(item) => item.productId.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
    />
  );
});

export default CategoryItems;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
});
