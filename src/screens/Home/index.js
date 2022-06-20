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
import { styles,foodListStyles, FinalFoodListScreenStyles } from "../../style/styles";
import { modalStyles } from "../../style/modalStyles";
import { formStyles } from "../../style/formStyles";
import FinalFoodList from "../FinalFoodListScreen/FinalFoodList";
import { toast } from "../../../App";
import FoodList from "./FoodList";

export default function(props){
    const HEADING_TEXT = "Food List";
    const ADD_FOOD_ITEM_TEXT = "Add Food Item";
    const ICON = "Entypo";
    const DASHBOARDICON = "AntDesign";
    const EDIT_ICON = "edit";
    const DELETE_ICON = "delete";
    const ADD_FOOD_TEXT_MODAL = "Add Food";
    const ADD_FOOD_SUBMIT_BUTTON_TEXT = "Add Food Item";
    const FINAL_FOOD_LIST_BUTTON_TEXT = "Final Food List";
    const FOODLIST_IN_ASYNC = "foodList";
    const UPDATE_FOOD_BUTTON_TEXT = "Update Food";
  
    const [foodList, setFoodList] = useState([]);
    const [modalOpen, setmodalOpen] = useState(false);
    const [foodName, setFoodName] = useState("");
    const [foodPrice, setFoodPrice] = useState("");
    const [inputFoodName, setInputFoodName] = useState("");
    const [inputFoodPrice, setInputFoodPrice] = useState("");
    const [needToUpdateFood, setNeedToUpdateFood] = useState(false);
    const [updateAtIndex, setUpdateAtIndex] = useState(0);
  
    useEffect(() => {
      AsyncStorage.getItem(FOODLIST_IN_ASYNC).then((value) => {
        if (value != null) {
          const foodListAsync = JSON.parse(value);
          setFoodList(foodListAsync);
        }
      });
    }, []);
  
    useEffect(() => {
      console.log("Food list : ", foodList);
      setObjectToAsync(foodList);
    }, [foodList]);
  
    const setObjectToAsync = (object) => {
      AsyncStorage.setItem(FOODLIST_IN_ASYNC, JSON.stringify(object), (err) => {
        if (err) {
          console.log("an error");
          throw err;
        }
        console.log("success");
      }).catch((err) => {
        console.log("error is: " + err);
      });
    };
  
    const checkFoodItem = () => {
      console.log("food and price : ", foodName, foodPrice);
      if (foodName != null && foodPrice != null) {
        if (foodName != "" && foodPrice != "") {
          if (needToUpdateFood) {
            let arr = [...foodList];
            arr[updateAtIndex] = { name: foodName, price: foodPrice };
            setFoodList([...arr]);
          } else {
            setFoodList([{ name: foodName, price: foodPrice }, ...foodList]);
          }
          setFoodName("");
          setFoodPrice("");
          setInputFoodName("");
          setInputFoodPrice("");
          setNeedToUpdateFood(false);
          setUpdateAtIndex(-1);
          setmodalOpen(false);
          toast("Food added successfully");
        } else {
          toast("Empty values");
        }
      } else {
        toast("Something went wrong");
      }
    };
  
    const deleteFood = (index) => {
      console.log("Hey : ", index);
      console.log("array : ", foodList[index].name, foodList[index].price);
      if (index > -1) {
        let arr = [...foodList];
        arr.splice(index, 1);
        setFoodList([...arr]);
        toast("Item deleted successfully");
      }
    };
  
    const editFood = (index) => {
      setmodalOpen(true);
      setInputFoodName(foodList[index].name);
      setInputFoodPrice(foodList[index].price);
      setFoodName(foodList[index].name);
      setFoodPrice(foodList[index].price);
      setNeedToUpdateFood(true);
      setUpdateAtIndex(index);
    };
  
    const foodObject = [
      {
        name: "mango",
        price: "30",
      },
      {
        name: "banana",
        price: "40",
      },
      {
        name: "mango",
        price: "30",
      },
    ];
  
    return (
      <View style={styles.container}>
        {/* Heading */}
        <View style={styles.heading}>
          <Text style={styles.headingText}>{HEADING_TEXT}</Text>
        </View>
  
        {/*Bold Horizontal Line */}
        <View style={styles.boldHorizontalLine}></View>
  
        {/* Food list Items */}
        {foodList.length > 0 && (
          <View style={styles.foodItemsContainer}>
            <ScrollView>
              {/* {foodList.map((value, index, array) => (
                <FinalFoodList
                  key={index}
                  food={{ name: value.name, price: value.price }}
                />
              ))} */}
  
              {foodList.map((value, index, array) => (
                <FoodList
                  key={index}
                  food={{ name: value.name, price: value.price }}
                  deleteFood={deleteFood}
                  editFood={editFood}
                  index={index}
                />
              ))}
            </ScrollView>
          </View>
        )}
  
        {/* Dotted Horizontal Line */}
        <View style={styles.dottedHorizontalLine}></View>
  
        {/* Add Food Item */}
        <TouchableOpacity onPress={() => setmodalOpen(true)}>
          <View style={styles.addFoodItemContainer}>
            <View style={styles.icons}>
              <Ionicons name="add" size={30} color="black" />
            </View>
            <View>
              <Text style={styles.addFoodItemTextStyle}>
                {ADD_FOOD_ITEM_TEXT}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
  
        {/* Final Food List Button */}
  
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("FinalFoodListScreen", {
              foodList: foodList,
            });
          }}
        >
          <View style={styles.finalFoodListContainerButton}>
            <Text style={styles.finalFoodListContainerButtonText}>
              {FINAL_FOOD_LIST_BUTTON_TEXT}
            </Text>
          </View>
        </TouchableOpacity>
  
        {/* Add Food Items Pop Up Modal*/}
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalOpen}
          onRequestClose={() => {
            setmodalOpen(false);
          }}
        >
          <View style={modalStyles.fullContainer}>
            {/* Half screen */}
  
            <View style={modalStyles.placeHolderContainer}></View>
            <View style={modalStyles.mainContainer}>
              {/* smallHorizontalBar */}
              <View style={modalStyles.smallHorizontalBarContainer}>
                <View style={modalStyles.smallHorizontalBar}></View>
              </View>
  
              {/* Padding Wrapper Container */}
  
              <View style={modalStyles.paddingWrapperContainer}>
                {/* Model Header Content */}
                <View style={modalStyles.modalHeader}>
                  {/* Add Food */}
                  <View style={modalStyles.addFoodTextContainer}>
                    <View style={modalStyles.addFoodTextSubContainer}>
                      <Text style={styles.mediumBoldText}>
                        {needToUpdateFood
                          ? UPDATE_FOOD_BUTTON_TEXT
                          : ADD_FOOD_TEXT_MODAL}
                      </Text>
                    </View>
                  </View>
  
                  {/* Close Button */}
                  <View style={modalStyles.close}>
                    <View style={modalStyles.closeSubContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          setmodalOpen(false);
                        }}
                      >
                        <Entypo name="cross" size={30} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={modalStyles.scrollviewContainer}>
                  <ScrollView>
                    {/* Food Form */}
  
                    {/* Add food Name */}
  
                    <Text style={[styles.smallText, formStyles.formText]}>
                      {"Food Name"}
                    </Text>
                    <TextInput
                      style={formStyles.textInput}
                      value={inputFoodName}
                      onChangeText={(value) => {
                        setFoodName(value);
                        setInputFoodName(value);
                      }}
                    />
  
                    <Text style={[styles.smallText, formStyles.formText]}>
                      {"Food Price"}
                    </Text>
                    <TextInput
                      keyboardType="numeric"
                      value={inputFoodPrice}
                      style={formStyles.textInput}
                      onChangeText={(value) => {
                        setFoodPrice(value);
                        setInputFoodPrice(value);
                      }}
                    />
  
                    {/* Add Food Price */}
  
                    {/*Add/Update Food Submit Button */}
  
                    <TouchableOpacity
                      onPress={() => {
                        checkFoodItem();
                        // setmodalOpen(false);
                      }}
                    >
                      <View style={formStyles.addFoodItemSubmitButton}>
                        <Text style={formStyles.addFoodItemSubmitButtonText}>
                          {needToUpdateFood
                            ? UPDATE_FOOD_BUTTON_TEXT
                            : ADD_FOOD_SUBMIT_BUTTON_TEXT}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </Modal>
  
        <StatusBar style="auto" />
      </View>
    );
  };