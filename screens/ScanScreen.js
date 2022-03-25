import React, { Component, useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text, FlatList, Button, ActivityIndicator, Dimensions, ScrollView,
} from "react-native";

import GetCreditData from "../Api/GetCreditData";
import { useCardData } from "../provider/AppProvider";


import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from "react-native-camera";

const CAM_VIEW_HEIGHT = Dimensions.get('screen').width * 1.5;
const CAM_VIEW_WIDTH = Dimensions.get('screen').width;

const leftMargin = 200;
const topMargin = 30;
const frameWidth = 300;
const frameHeight = 150;

const scanAreaX = leftMargin / CAM_VIEW_HEIGHT;
const scanAreaY = topMargin / CAM_VIEW_WIDTH;
const scanAreaWidth = frameWidth / CAM_VIEW_HEIGHT;
const scanAreaHeight = frameHeight / CAM_VIEW_WIDTH;
const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isBorder, setIsBorder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { setCardNumber, cardData, setCardData } = useCardData();
  const headerData = ["Dato", "Slag", "Upphædd", "Handil"];
  const [border, setBorder] = useState({ height: 100, width: 300, x: 0, y: 0 });

    const [scannerButton, setScannerButton] = useState(false);

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
    const skipCamera=()=>{
        setScanned(true)
        setScannerButton(false)
    }
  const handleBarCodeScanned = async ({ type, data, bounds }) => {

      setScannerButton(true)
       await getCreditData(data)

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


        <View style={{flex:1}}>
        <RNCamera style={StyleSheet.absoluteFillObject}


            rectOfInterest={{
                x: 0.3,
                y: 0.3,
                width: 0.6,
                height: 0.5,
            }}
            cameraViewDimensions={{
                width: CAM_VIEW_WIDTH,
                height: CAM_VIEW_HEIGHT,
            }}
                  onBarCodeRead={handleBarCodeScanned}
        >
            <View style={{flexDirection:'column'}}>
            <View
                style={{
                    position: 'absolute',
                    top: leftMargin,
                    right: topMargin,
                    width: frameWidth,
                    height: frameHeight,
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius:30

                }}
            />
                {scannerButton&&

                    <TouchableOpacity onPress={skipCamera}  style={{width:100,height:100,borderWidth:2,borderColor:'white' ,borderRadius: 50,alignSelf:'center',top: CAM_VIEW_HEIGHT-50}}>

                    </TouchableOpacity>}
            </View>
        </RNCamera>

        </View>

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
