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
import { styles,formStyles, itemListStyles, FinalItemListScreenStyles,modalStyles } from "../../../style/itemListStyles";


export default function(props) {
    const item = props.item;
    return (
      <View style={itemListStyles.mainContainer}>
        {/* Dashboard Sign Container*/}
        <View style={itemListStyles.iconsDashboard}>
          <TouchableOpacity>
            <Ionicons name="apps" size={23} color="#CFCFCF" />
          </TouchableOpacity>
        </View>
        {/* Item Name Container */}
        <View style={itemListStyles.itemNameContainerStyle}>
          <Text style={itemListStyles.itemNameTextStyle}>{props.item.name}</Text>
        </View>
        {/* Info Container */}
        {/* <View>
          <Text style={itemListStyles.infoTextStyle}>{"Info : ₹ "}</Text>
        </View>
        <View style={itemListStyles.infoTextAppendStyle}>
          <Text>{props.item.info}</Text>
        </View> */}
        {/* Vertical Line Container */}
        <View style={itemListStyles.rightSideViewContainer}>
        <View>
          <View style={itemListStyles.boldVerticalLine}></View>
        </View>
        {/* Edit Icon Container */}
  
        <View style={itemListStyles.iconsEdit}>
          <TouchableOpacity onPress={() => props.editItem(props.index)}>
            <Ionicons name="pencil" size={23} color="#000" />
          </TouchableOpacity>
        </View>
  
        {/* Delete Icon Container */}
        <View style={itemListStyles.iconsDelete}>
          <TouchableOpacity
            onPress={() => {
              props.deleteItem(props.index);
            }}
          >
            <Ionicons name="ios-trash-bin-sharp" size={23} color="#000" />
          </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  };