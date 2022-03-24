import React, { Component, useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text, FlatList, Button, ActivityIndicator, Dimensions,
} from "react-native";

import GetCreditData from "../Api/GetCreditData";
import { useCardData } from "../provider/AppProvider";

import { RNCamera, FaceDetector } from "react-native-camera";

import BarcodeMask, { LayoutChangeEvent } from "react-native-barcode-mask";

const ScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isBorder, setIsBorder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { setCardNumber, cardData, setCardData } = useCardData();
  const headerData = ["Dato", "Slag", "Upphædd", "Handil"];
  const [border, setBorder] = useState({ height: 100, width: 300, x: 0, y: 0 });
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const viewMinX = (width - border.width) / 2;
  const viewMinY = (height - border.height) / 2;
  const onLayoutMeasuredHandler = (e: LayoutChangeEvent) => {
    setBorder({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
      x: e.nativeEvent.layout.x,
      y: e.nativeEvent.layout.y,
    });
    alert(JSON.stringify({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
      x: e.nativeEvent.layout.x,
      y: e.nativeEvent.layout.y,
    }));
  };

  const getCreditData = (number) => {
    try {


      const response = GetCreditData.getCreditDataByNumber(number).then((response) => {

        setCardData(response.data);
        setCardNumber(number);
        setIsLoading(false);

      });

    } catch (error) {
      alert(error);
    }
  };

  const handleBarCodeScanned = async ({ type, data, bounds }) => {

    const { x, y } = bounds.origin[0];
    const { height, width } = bounds;

    // setBorder({height: height,width: width,x:border.x ,y:border.y })
    alert(JSON.stringify(bounds));

    if (Math.abs(x - border.x) <= 150 && Math.abs(y - border.y) <= 100) {
      alert(JSON.stringify({ height: height, width: width, x: x, y: y }));
      setBorder({
        height: (viewMinY + border.height / 2),
        width: (viewMinX + border.width / 2),
        x: (viewMinX + border.width / 2),
        y: (viewMinY + border.height / 2),
      });
      setScanned(true);
      // await getCreditData(data)
    }

  };


  return (
    scanned ?
      isLoading ?
        <View style={{
          flex: 1,
          justifyContent: "center",
        }}>
          <ActivityIndicator size="large" color="black" />
        </View> :
        <View style={{
          flex: 1,
          top: 30,
        }}>

          <View style={{
            height: 50,
            margin: 20,
            marginBottom: 40,
            top: 30,
            flexDirection: "row",

          }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, paddingRight: 30, fontWeight: "bold", color: "black" }}>
                Støða: Virkið
              </Text>
              <Text style={{ color: "black" }}>
                Útgongur: {new Date().getDate()}-{new Date().getFullYear()}
              </Text>
            </View>

            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
              Upphædd:{cardData.balance}
            </Text>
          </View>
         <ScrollView style={{
            flexDirection: "column",
            width: "100%",
            padding: 10,
            marginBottom: 30,

          }}>
            <View
              style={{ padding: 10, flexDirection: "row", width: "100%" ,justifyContent:'space-between',marginRight:10}}>
              <Text style={{ width: 80, fontWeight: "bold", color: "black" }}>{headerData[0]}</Text>
              <Text style={{ width: 100, fontWeight: "bold", color: "black" }}>{headerData[1]}</Text>
              <Text style={{ width: 80, fontWeight: "bold", color: "black" }}>{headerData[2]}</Text>
              <Text
                style={{ width: 100, fontWeight: "bold", color: "black" }}>{headerData[3]}</Text></View>
            {cardData.transactions&&cardData?.transactions.map((item,index)=>{
              return (
                <View key={index} style={{
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,justifyContent:'space-between'
                }}>
                  <Text
                    style={{ width: 80, fontSize: 12, color: "black" }}>{item.operationDate || "null"}</Text>
                  <Text style={{
                    width: 100,
                    fontSize: 12,
                    color: "black",
                  }}>{item.transactionType || "null"}</Text>
                  <Text style={{
                    width: 80,
                    fontSize: 12,
                    color: "black",
                  }}>{item.currency}. {item.amount || "null"}</Text>
                  <Text style={{ width: 100, fontSize: 12, color: "black" }}>{item.storeName || "null"}</Text>

                </View>
              );
            })}



          </ScrollView>

        </View> :
      <RNCamera style={StyleSheet.absoluteFill}
                // cameraViewDimensions={{ width: 1.0, height: 1.0 }}
                // rectOfInterest={{ x : 0 ,  y : 0, width: 1.0, height: 1.0 }}
                onBarCodeRead={handleBarCodeScanned}
      >
        <BarcodeMask width={300} height={100} showAnimatedLine={false} edgeRadius={30}
                     onLayoutMeasured={onLayoutMeasuredHandler} />

      </RNCamera>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: 350,
    overflow: "hidden",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "black",
  },
});

export default ScanScreen;
