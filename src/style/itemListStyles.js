import { StyleSheet } from "react-native";
export const itemListStyles = StyleSheet.create({
    mainContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: "#F3E9E5",
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: "#F5F5F5",
      elevation: 3,
    },
    itemNameContainerStyle: {
      width: "32%",
      marginLeft: 5,
      marginRight: 5,
    },
    itemNameTextStyle: {
      fontWeight: "bold",
      fontSize: 20,
    },
    priceTextStyle: {
      color: "#C6C6C6",
    },
    boldVerticalLine: {
      borderLeftColor: "#F3E9E5",
      height: 25,
      width: 1,
      borderLeftWidth: 2,
      marginLeft: 5,
      marginRight: 5,
    },
    icons: {
      marginLeft: 10,
      marginRight: 10,
    },
    iconsDashboard: {
      marginLeft: 5,
      marginRight: 5,
    },
    iconsEdit: {
      marginLeft: 10,
      marginRight: 10,
      width: "7%",
    },
    iconsDelete: {
      marginLeft: 10,
      marginRight: 10,
      width: "7%",
    },
    priceTextAppendStyle: {
      width: "12%",
    },
  });