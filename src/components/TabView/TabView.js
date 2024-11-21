import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useState, useEffect } from "react";
import { TabView } from "react-native-tab-view";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCategories } from '../../components/Redux/Action/categoryActions';
import CategoryItems from "../CategoryItems/CategoryItems";
import TabBar from "../TabBar/TabBar";

const Tab = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { dataCategories, loading, error } = useSelector((state) => state.category);

  // Fetch category data on component mount
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (dataCategories.length > 0) {
      setRoutes(
        dataCategories
          .filter(category => category) 
          .map((category) => ({
            key: category.categoryId.toString(),
            title: category.categoryName,
          }))
      );
    }
  }, [dataCategories]);

  const renderScene = ({ route }) => {
    return <CategoryItems categoryId={route.key} />;
  };

  const handleIndexChange = (index) => {
    setIndex(index);
    const selectedRoute = routes[index];
    if (selectedRoute) {
      console.log("Selected Category ID ben tabview:", selectedRoute.key);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <TabView
      renderTabBar={(props) => <TabBar {...props} />}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: layout.width }}
      sceneContainerStyle={styles.sceneContainer}
    />
  );
};

export default Tab;

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
  
  },
});