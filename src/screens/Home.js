import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import Screen from "../components/Screen/Screen";
import PromotionCard from "../components/PromotionCard/PromotionCard";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import TabView from "../components/TabView/TabView";
import SearchHeader from "../components/SearchHeader/SearchHeader";

const Home = () => {
  const navigation = useNavigation();
  const slides = [
    {
      backgroundImage:  require("../../assets/images/baner1.png") ,
      promotionText: "Discount 50% on all items!",
      contact: "123-456-7890",
      website: "www.example1.com",
    },
    {
      backgroundImage: require("../../assets/images/baner2.png") ,
      promotionText: "Buy 1 Get 1 Free!",
      contact: "987-654-3210",
      website: "www.example2.com",
    },
    {
      backgroundImage: require("../../assets/images/paner3.png") ,
      promotionText: "Limited Time Offer!",
      contact: "555-555-5555",
      website: "www.example3.com",
    },
  ];

  return (
    
    <Screen>
      <SearchHeader />
     
        <View style={styles.promotionContainer}>
          <PromotionCard slides={slides} />
        </View>
        <View style={styles.categories}>
        <SectionTitle title="Danh mục sản phẩm" popular />
          <TabView />
         
        </View>
  

    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  promotionContainer: {
    marginBottom: 20,
  },
  categories: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
  },
});
