// CategoryItems.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByIdCategory } from '../../components/Redux/Action/productActions';
import { FlatList, StyleSheet, Text } from "react-native";
import CardList from "../Card/CardList";

const CategoryItems = ({ categoryId }) => {
    const dispatch = useDispatch();
    const productsByCategory = useSelector((state) => state.product.productsByCategory);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchProductsByIdCategory(categoryId));
        }
    }, [categoryId, dispatch]);

    const categoryItems = productsByCategory[categoryId];
    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        data={[{ key: 'list', items: categoryItems }]} 
        renderItem={({ item }) => <CardList items={item.items} />} 
        keyExtractor={(item) => item.key}
      />
    );
};

export default CategoryItems;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    contentContainerStyle: {
        alignItems: "center",
        justifyContent: "center",
    },
});