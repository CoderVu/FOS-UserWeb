import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import Screen from "../components/Screen/Screen";
import PromotionCard from "../components/PromotionCard/PromotionCard";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import TabView from "../components/TabView/TabView";
import SearchHeader from "../components/SearchHeader/SearchHeader";
import { fetchProductBySearch } from "../components/Redux/Action/productActions";
import CardList from "../components/Card/CardList";

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const searchResults = useSelector((state) => state.product.allProductsBySearchQuery);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm
  const [results, setResults] = useState([]); // Trạng thái kết quả tìm kiếm

  const slides = [
    {
      backgroundImage: require("../../assets/images/baner1.png"),
      promotionText: "Discount 50% on all items!",
      contact: "123-456-7890",
      website: "www.example1.com",
    },
    {
      backgroundImage: require("../../assets/images/baner2.png"),
      promotionText: "Buy 1 Get 1 Free!",
      contact: "987-654-3210",
      website: "www.example2.com",
    },
    {
      backgroundImage: require("../../assets/images/paner3.png"),
      promotionText: "Limited Time Offer!",
      contact: "555-555-5555",
      website: "www.example3.com",
    },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query); // Cập nhật searchQuery
    if (query.length > 0) {
      dispatch(fetchProductBySearch(query)); // Fetch kết quả tìm kiếm nếu query không trống
    } else {
      setResults([]); // Nếu query trống, xóa kết quả tìm kiếm
      console.log("Search query length is now 0");
    }
  };
  

  useEffect(() => {
    console.log("Query length:", searchQuery.length); // In độ dài của searchQuery
    if (searchQuery.trim() === "") {
      setResults([]); // Nếu searchQuery rỗng, đặt results thành mảng rỗng
    } else {
      setResults(searchResults); // Nếu có searchQuery, cập nhật kết quả tìm kiếm
    }
  }, [searchQuery, searchResults]);
  
  return (
    <Screen>
      <SearchHeader onSearch={handleSearch} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.promotionContainer}>
          <PromotionCard slides={slides} />
        </View>

        {!searchQuery || (searchQuery && results.length === 0) ? (
          <View style={styles.categories}>
            <SectionTitle title="Danh mục sản phẩm" popular />
            <TabView />
          </View>
        ) : null}

        {searchQuery && results.length > 0 && (
          <View style={styles.searchResults}>
            <CardList items={results} />
          </View>
        )}

        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error}</Text>}
      </ScrollView>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  promotionContainer: {
    marginBottom: 20,
  },
  categories: {
    paddingHorizontal: 10,
    flex: 1,
  },
  searchResults: {
    padding: 20,
  },
});
