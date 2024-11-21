import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import AppText from "../AppText/AppText";
import { colors } from "../../theme/colors";

// Initialize the Geocoder with your API key
const API_KEY = '5b3ce3597851110001cf624888c86f18453143d7892cff533a74a371';

const Card = ({ item }) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState("Loading...");
  // Giới hạn độ dài của mô tả (10 ký tự) và địa chỉ (5 ký tự)
  const descriptionText = item.description.length > 30 ? item.description.slice(0, 30) + '...' : item.description;
  const locationText = location.length > 5 ? location.slice(0, 5) + '...' : location;

  useEffect(() => {
    console.log('Starting geocoding request...');
    if (item?.stores && item.stores.length > 0) {
      const store = item.stores[0];
      const { latitude, longitude } = store;
      console.log('Location:', latitude, longitude);
      if (latitude && longitude) {
        fetch(`https://api.openrouteservice.org/geocode/reverse?point.lat=${latitude}&point.lon=${longitude}&api_key=${API_KEY}`)
          .then(response => response.json())
          .then(data => {
            if (data?.features?.length > 0) {
              const address = data.features[0].properties.county;
              setLocation(address);
            } else {
              setLocation("Loading...");
            }
          })
          .catch(error => {
            console.warn("Geocoding error: ", error);
            setLocation("Error retrieving address");
          });
      }
    }
  }, [item]);

  const handlePress = () => {
    console.log("Navigating to Details for productId:", item.id);
    navigation.navigate("Details", {
      productId: item.id,
    });
  };

  return (
    <TouchableOpacity style={[styles.container, { alignSelf: 'flex-start' }]} onPress={handlePress}>
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: `data:image/png;base64,${item.image}` }}
          style={styles.image}
        />
      </View>
      <View style={styles.cardBody}>
        {/* Product Name and Rating in Row */}
        <View style={styles.nameRatingContainer}>
          <AppText text={item.productName} customStyles={styles.textBold} />
          <View style={styles.iconTextContainer}>
            <Ionicons name="star" size={13} color={colors.yellow} />
            <AppText text={`(${item.averageRate}.0)`} customStyles={styles.textMedium} />
          </View>
        </View>
        <AppText text={descriptionText} customStyles={styles.textMedium} />
        <View style={[styles.directionRow, styles.cardFooter]}>
          {/* Price */}
          <AppText
            text={`đ${item.price}`}
            customStyles={[styles.priceText, { marginRight: 10 }]} 
          />
          
          {/* Address */}
          <View style={styles.iconTextContainer}>
            <Ionicons name="location" size={13} color={colors.primary} />
            <AppText text={location} customStyles={styles.textMedium} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: "48%", // Adjust width for better spacing between items
    marginBottom: 15, // Add space between rows
    alignItems: "center",
    justifyContent: "center",
  },
  cardImageContainer: {
    width: "100%",
    height: 120, // Keep the height consistent
    borderRadius: 20,
  },
  priceText: {
    color: colors.primary,
    fontSize: 12,
    fontFamily: "Lato-Bold",
    padding: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  cardBody: {
    marginTop: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  nameRatingContainer: {
    flexDirection: "row", // Align product name and rating horizontally
    alignItems: "center", // Vertically align items
    justifyContent: "space-between", // Space out product name and rating
    width: "100%",
  },
  cardFooter: {
    marginTop: 5,
    marginBottom: 5, 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    flexWrap: "wrap", // Allow wrapping to avoid overflow
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5, // Reduce margin for items to be closer together
    marginLeft: 5,  // Reduce margin for items to be closer together
  },
  textMedium: {
    color: colors.medium,
    fontFamily: "Lato-Bold",
    fontSize: 12,
    marginLeft: 2,
    padding: 1,
  },
  textBold: {
    fontFamily: "Lato-Black",
    color: colors.dark,
    marginLeft: 4,
  },
});
