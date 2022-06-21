import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ToastAndroid,
  Text,
  View,
  TouchableOpacity,
  Icon,
  Modal,
  Dimensions,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles,formStyles, itemListStyles, FinalItemListScreenStyles,modalStyles } from "../../style/FinalItemListScreenStyles";
import FinalItemList from "./FinalItemList";

export default function({ route, navigation })  {
    const { itemList } = route.params;
    return (
      <View style={FinalItemListScreenStyles.container}>
        <ScrollView>
          {itemList.map((value, index, array) => (
            <FinalItemList
              key={index}
              item={{ name: value.name, price: value.price }}
            />
          ))}
        </ScrollView>
      </View>
    );
  };