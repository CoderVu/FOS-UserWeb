// CategoryItems.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByIdCategory } from '../../components/Redux/Action/productActions';
import { FlatList, StyleSheet, Text } from "react-native";
import Card from "../Card/Card";

const CategoryItems = ({ categoryId }) => {
    const dispatch = useDispatch();
    const productsByCategory = useSelector((state) => state.product.productsByCategory);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        if (categoryId) {
            console.log("categoryId", categoryId);
            dispatch(fetchProductsByIdCategory(categoryId));
        }
    }, [categoryId, dispatch]);

    const categoryItems = productsByCategory[categoryId];
   // console.log("categoryItems", categoryItems);
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
            data={categoryItems}
            renderItem={({ item }) => item && <Card item={item} />}
            numColumns={2}
            keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
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