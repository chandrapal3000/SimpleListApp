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
import { styles,formStyles, foodListStyles, FinalFoodListScreenStyles,modalStyles } from "../../../style/foodListStyles";


export default function(props) {
    const food = props.food;
    return (
      <View style={foodListStyles.mainContainer}>
        {/* Dashboard Sign Container*/}
        <View style={foodListStyles.iconsDashboard}>
          <TouchableOpacity>
            <Ionicons name="apps" size={23} color="#CFCFCF" />
          </TouchableOpacity>
        </View>
        {/* Food Name Container */}
        <View style={foodListStyles.foodNameContainerStyle}>
          <Text style={foodListStyles.foodNameTextStyle}>{props.food.name}</Text>
        </View>
        {/* Price Container */}
        <View>
          <Text style={foodListStyles.priceTextStyle}>{"Price : ₹ "}</Text>
        </View>
        <View style={foodListStyles.priceTextAppendStyle}>
          <Text>{props.food.price}</Text>
        </View>
        {/* Vertical Line Container */}
        <View>
          <View style={foodListStyles.boldVerticalLine}></View>
        </View>
        {/* Edit Icon Container */}
  
        <View style={foodListStyles.iconsEdit}>
          <TouchableOpacity onPress={() => props.editFood(props.index)}>
            <Ionicons name="pencil" size={23} color="#000" />
          </TouchableOpacity>
        </View>
  
        {/* Delete Icon Container */}
        <View style={foodListStyles.iconsDelete}>
          <TouchableOpacity
            onPress={() => {
              props.deleteFood(props.index);
            }}
          >
            <Ionicons name="ios-trash-bin-sharp" size={23} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };