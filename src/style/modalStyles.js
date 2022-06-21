import { StyleSheet,Dimensions } from "react-native";
export const modalStyles = StyleSheet.create({
    fullContainer: {
      flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
      backgroundColor: "rgba(0,0,0,.3)",
    },
    placeHolderContainer: {
      // display: "flex",
      // alignItems: "center",
      // justifyContent: 'center',
      // marginTop: 200,
      width: "100%",
      height: Dimensions.get("screen").height * 0.4,
      // borderTopLeftRadius: 30,
      // borderTopRightRadius: 30,
      // backgroundColor: "white",
      // borderColor : 'black',
      // borderWidth : 1,
    },
    placeHolderContainerSubContainer : {
      width : '100%',
      height : Dimensions.get("screen").height * 0.4,
      // borderColor : 'black',
      // borderWidth : 1,
    },
    mainContainer: {
      display: "flex",
      // alignItems: "center",
      // justifyContent: 'center',
      // marginTop: 200,
      width: "100%",
      height: Dimensions.get("screen").height * 0.6,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: "white",
    },
    smallHorizontalBarContainer: {
      display: "flex",
      alignItems: "center",
      // justifyContent: 'center',
      // width : '100%',
    },
    smallHorizontalBar: {
      padding: 4,
      width: 50,
      borderRadius: 10,
      margin: 10,
      backgroundColor: "#ddd",
      elevation: 5,
    },
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      // justifyContent: "fl",
    },
    addItemTextContainer: {
      width: "50%",
      marginBottom: 20,
    },
    addItemTextSubContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      // marginLeft: 20,
      // marginRight: 20,
    },
    close: {
      width: "50%",
    },
    closeSubContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      // marginLeft: 20,
      // marginRight: 20,
      // borderWidth : 1,
    },
    paddingWrapperContainer: {
      paddingTop: 10,
      paddingRight: 20,
      paddingLeft: 20,
    },
    scrollviewContainer : {
      height : '70%',
    }
  });