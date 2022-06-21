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

export default function (props){
    return (
      <>
        <View>
          <Text>{"{"}</Text>
          <Text>
            {'name: "'}
            {props.item.name}
          </Text>
          <Text>
            {'price: "'}
            {props.item.price}
          </Text>
          <Text>{"},"}</Text>
        </View>
      </>
    );
  };