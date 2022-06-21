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
  
    const [statusBarColor, setStatusBarColor] = useState("#fff");
    const [itemList, setItemList] = useState([]);
    const [itemListTemp, setItemListTemp] = useState([]);
    const [modalOpen, setmodalOpen] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemInfo, setItemInfo] = useState("");
    const [inputItemName, setInputItemName] = useState("");
    const [inputItemInfo, setInputItemInfo] = useState("");
    const [needToUpdateItem, setNeedToUpdateItem] = useState(false);
    const [updateAtIndex, setUpdateAtIndex] = useState(0);
    const [inputSearchItemValue, setInputSearchItemValue] = useState("");
    const [searchOn, setSearchOn] = useState(false);
  
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

    useEffect(()=>{
      modalOpen ? setStatusBarColor("rgba(0,0,0,.3)") : setStatusBarColor("#fff");
    },[modalOpen])

    useEffect(()=>{
      if(inputSearchItemValue==""){
        setItemListTemp(itemList);
        setSearchOn(false);
      } else{
        setSearchOn(true);
        // setItemListTemp(itemList);
        setItemListTemp(itemList.filter(item=>item.name.toLowerCase().includes(inputSearchItemValue.toLowerCase())));
      }
    },[inputSearchItemValue])
  
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
      console.log("item and info : ", itemName, itemInfo);
      if (itemName != null) {
        if (itemName != "") {
          if (needToUpdateItem) {
            let arr = [...itemList];
            arr[updateAtIndex] = { name: itemName, info: itemInfo };
            setItemList([...arr]);
          } else {
            setItemList([{ name: itemName, info: itemInfo }, ...itemList]);
          }
          setItemName("");
          setItemInfo("");
          setInputItemName("");
          setInputItemInfo("");
          setNeedToUpdateItem(false);
          setUpdateAtIndex(-1);
          setmodalOpen(false);
          toast("Item added successfully");
        } else {
          toast("Empty value");
        }
      } else {
        toast("Something went wrong");
      }
    };
  
    const deleteItem = (index) => {
      console.log("Hey : ", index);
      console.log("array : ", itemList[index].name, itemList[index].info);
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
      setInputItemInfo(itemList[index].info);
      setItemName(itemList[index].name);
      setItemInfo(itemList[index].info);
      setNeedToUpdateItem(true);
      setUpdateAtIndex(index);
    };
  
    const itemObject = [
      {
        name: "mango",
        info: "30",
      },
      {
        name: "banana",
        info: "40",
      },
      {
        name: "mango",
        info: "30",
      },
    ];
  
    return (<>
        <StatusBar style="auto" backgroundColor={statusBarColor} translucent={false} />

      <View style={styles.container}>
        {/* Heading */}
        {/* <View style={styles.heading}>
          <Text style={styles.headingText}>{HEADING_TEXT}</Text>
        </View> */}
        {/* <View style={styles.marginFix}></View> */}
        <View style={styles.topSearchHeaderParentContainer}>
        <View style={styles.topSearchHeader}>
          <View style={styles.serchBoxContainer}>
          <TextInput
                      style={styles.serchBoxTextInput}
                      value={inputSearchItemValue}
                      placeholder={"Search items..."}
                      onChangeText={(value) => {
                        console.log("hey")
                        setInputSearchItemValue(value);
                      }}
                    />
          </View>
          <View style={styles.addItemToListBox}>
          <TouchableOpacity onPress={() => setmodalOpen(true)}><Ionicons name="add-circle" size={40} color="black" /></TouchableOpacity>
</View>
        </View>
  
        {/*Bold Horizontal Line */}
        
        <View style={styles.boldHorizontalLine}></View>
        </View>
  
        {/* Item list Items */}
        <View style={styles.itemItemsContainer}>

        {itemList.length > 0 && (
            <ScrollView>
              {/* {itemList.map((value, index, array) => (
                <FinalItemList
                  key={index}
                  item={{ name: value.name, info: value.info }}
                />
              ))} */}
  
              {searchOn ? itemListTemp.map((value, index, array) => (
                <ItemList
                  key={index}
                  item={{ name: value.name, info: value.info }}
                  deleteItem={deleteItem}
                  editItem={editItem}
                  index={index}
                />
              )) : itemList.map((value, index, array) => (
                <ItemList
                  key={index}
                  item={{ name: value.name, info: value.info }}
                  deleteItem={deleteItem}
                  editItem={editItem}
                  index={index}
                />
              ))}
            </ScrollView>
        )}
  
        {/* Dotted Horizontal Line */}
        <View style={styles.dottedHorizontalLine}></View>
        </View>

  
        {/* Add Item Item */}
        {/* <TouchableOpacity onPress={() => setmodalOpen(true)}>
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
        </TouchableOpacity> */}
  
        {/* Final Item List Button */}
  
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
  
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
  
            <View style={modalStyles.placeHolderContainer}><TouchableOpacity onPress={()=>setmodalOpen(false)}><View style={modalStyles.placeHolderContainerSubContainer}></View></TouchableOpacity></View>
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

                    {/* Add Item Info */}
  
                    {/* <Text style={[styles.smallText, formStyles.formText]}>
                      {"Item Info"}
                    </Text>
                    <TextInput
                      keyboardType="numeric"
                      value={inputItemInfo}
                      style={formStyles.textInput}
                      onChangeText={(value) => {
                        setItemInfo(value);
                        setInputItemInfo(value);
                      }}
                    /> */}
  
  
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
  
      </View>
      </>
    );
  };