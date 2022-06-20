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
import { styles,formStyles, foodListStyles, FinalFoodListScreenStyles,modalStyles } from "../../style/FinalFoodListScreenStyles";
import FinalFoodList from "./FinalFoodList";

export default function({ route, navigation })  {
    const { foodList } = route.params;
    return (
      <View style={FinalFoodListScreenStyles.container}>
        <ScrollView>
          {foodList.map((value, index, array) => (
            <FinalFoodList
              key={index}
              food={{ name: value.name, price: value.price }}
            />
          ))}
        </ScrollView>
      </View>
    );
  };