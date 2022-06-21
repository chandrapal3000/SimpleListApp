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
import { styles,itemListStyles, FinalItemListScreenStyles } from "../../style/styles";
import { modalStyles } from "../../style/modalStyles";
import { formStyles } from "../../style/formStyles";
import FinalItemList from "../FinalItemListScreen/FinalItemList";
import { toast } from "../../../App";
import ItemList from "./ItemList";

export default function(props){
    const HEADING_TEXT = "Item List";
    const ADD_FOOD_ITEM_TEXT = "Add Item Item";
    const ICON = "Entypo";
    const DASHBOARDICON = "AntDesign";
    const EDIT_ICON = "edit";
    const DELETE_ICON = "delete";
    const ADD_FOOD_TEXT_MODAL = "Add Item";
    const ADD_FOOD_SUBMIT_BUTTON_TEXT = "Add Item Item";
    const FINAL_FOOD_LIST_BUTTON_TEXT = "Final Item List";
    const FOODLIST_IN_ASYNC = "itemList";
    const UPDATE_FOOD_BUTTON_TEXT = "Update Item";
  
    const [itemList, setItemList] = useState([]);
    const [modalOpen, setmodalOpen] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [inputItemName, setInputItemName] = useState("");
    const [inputItemPrice, setInputItemPrice] = useState("");
    const [needToUpdateItem, setNeedToUpdateItem] = useState(false);
    const [updateAtIndex, setUpdateAtIndex] = useState(0);
  
    useEffect(() => {
      AsyncStorage.getItem(FOODLIST_IN_ASYNC).then((value) => {
        if (value != null) {
          const itemListAsync = JSON.parse(value);
          setItemList(itemListAsync);
        }
      });
    }, []);
  
    useEffect(() => {
      console.log("Item list : ", itemList);
      setObjectToAsync(itemList);
    }, [itemList]);
  
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
  
    const checkItemItem = () => {
      console.log("item and price : ", itemName, itemPrice);
      if (itemName != null && itemPrice != null) {
        if (itemName != "" && itemPrice != "") {
          if (needToUpdateItem) {
            let arr = [...itemList];
            arr[updateAtIndex] = { name: itemName, price: itemPrice };
            setItemList([...arr]);
          } else {
            setItemList([{ name: itemName, price: itemPrice }, ...itemList]);
          }
          setItemName("");
          setItemPrice("");
          setInputItemName("");
          setInputItemPrice("");
          setNeedToUpdateItem(false);
          setUpdateAtIndex(-1);
          setmodalOpen(false);
          toast("Item added successfully");
        } else {
          toast("Empty values");
        }
      } else {
        toast("Something went wrong");
      }
    };
  
    const deleteItem = (index) => {
      console.log("Hey : ", index);
      console.log("array : ", itemList[index].name, itemList[index].price);
      if (index > -1) {
        let arr = [...itemList];
        arr.splice(index, 1);
        setItemList([...arr]);
        toast("Item deleted successfully");
      }
    };
  
    const editItem = (index) => {
      setmodalOpen(true);
      setInputItemName(itemList[index].name);
      setInputItemPrice(itemList[index].price);
      setItemName(itemList[index].name);
      setItemPrice(itemList[index].price);
      setNeedToUpdateItem(true);
      setUpdateAtIndex(index);
    };
  
    const itemObject = [
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
  
        {/* Item list Items */}
        {itemList.length > 0 && (
          <View style={styles.itemItemsContainer}>
            <ScrollView>
              {/* {itemList.map((value, index, array) => (
                <FinalItemList
                  key={index}
                  item={{ name: value.name, price: value.price }}
                />
              ))} */}
  
              {itemList.map((value, index, array) => (
                <ItemList
                  key={index}
                  item={{ name: value.name, price: value.price }}
                  deleteItem={deleteItem}
                  editItem={editItem}
                  index={index}
                />
              ))}
            </ScrollView>
          </View>
        )}
  
        {/* Dotted Horizontal Line */}
        <View style={styles.dottedHorizontalLine}></View>
  
        {/* Add Item Item */}
        <TouchableOpacity onPress={() => setmodalOpen(true)}>
          <View style={styles.addItemItemContainer}>
            <View style={styles.icons}>
              <Ionicons name="add" size={30} color="black" />
            </View>
            <View>
              <Text style={styles.addItemItemTextStyle}>
                {ADD_FOOD_ITEM_TEXT}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
  
        {/* Final Item List Button */}
  
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("FinalItemListScreen", {
              itemList: itemList,
            });
          }}
        >
          <View style={styles.finalItemListContainerButton}>
            <Text style={styles.finalItemListContainerButtonText}>
              {FINAL_FOOD_LIST_BUTTON_TEXT}
            </Text>
          </View>
        </TouchableOpacity>
  
        {/* Add Item Items Pop Up Modal*/}
  
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
                  {/* Add Item */}
                  <View style={modalStyles.addItemTextContainer}>
                    <View style={modalStyles.addItemTextSubContainer}>
                      <Text style={styles.mediumBoldText}>
                        {needToUpdateItem
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
                    {/* Item Form */}
  
                    {/* Add item Name */}
  
                    <Text style={[styles.smallText, formStyles.formText]}>
                      {"Item Name"}
                    </Text>
                    <TextInput
                      style={formStyles.textInput}
                      value={inputItemName}
                      onChangeText={(value) => {
                        setItemName(value);
                        setInputItemName(value);
                      }}
                    />
  
                    <Text style={[styles.smallText, formStyles.formText]}>
                      {"Item Price"}
                    </Text>
                    <TextInput
                      keyboardType="numeric"
                      value={inputItemPrice}
                      style={formStyles.textInput}
                      onChangeText={(value) => {
                        setItemPrice(value);
                        setInputItemPrice(value);
                      }}
                    />
  
                    {/* Add Item Price */}
  
                    {/*Add/Update Item Submit Button */}
  
                    <TouchableOpacity
                      onPress={() => {
                        checkItemItem();
                        // setmodalOpen(false);
                      }}
                    >
                      <View style={formStyles.addItemItemSubmitButton}>
                        <Text style={formStyles.addItemItemSubmitButtonText}>
                          {needToUpdateItem
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