import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import Screen from "../components/Screen/Screen";
import PromotionCard from "../components/PromotionCard/PromotionCard";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import TabView from "../components/TabView/TabView";
import SearchHeader from "../components/SearchHeader/SearchHeader";

const Home = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Details", {
      
      productId: 2,
    });
    console.log("Pressed");
  };

  return (
    <Screen>
      <SearchHeader />
      <View>
        <TouchableOpacity onPress={handlePress}>
          <PromotionCard
            backgroundImage={require("../../assets/images/food0.png")}
            promotionText="Super Offer Every Weekend from 9AM to 8PM"
       
            contact="035788687"
            website="www.fullstapp.com"
     
          />
        </TouchableOpacity>
        <View style={styles.categories}>
          <SectionTitle title="Categories" />
          <TabView />
        </View>
      </View>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  categories: {
    height: 500,
  },
});