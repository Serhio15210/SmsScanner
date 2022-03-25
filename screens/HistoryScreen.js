import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView} from "react-native";


import {useCardData} from "../provider/AppProvider";

const HistoryScreen = () => {
    const headerData=["Dato","Kortnummar","Upphædd"]
    // const {cardData,cardNumber} = useContext(AppContext)
    const {cardData,cardNumber} = useCardData()

    return (
        <View style={{
            flex:1,
            top:30,
        }}>
            <View style={{
                height:50,
                margin:20,
                marginBottom:30,
                top:30,
                flexDirection:"row"
            }}>
                <View style={{flexDirection:'column'}}>
                    <Text style={{fontSize:20,paddingRight:30,fontWeight:"bold", color: "black"}}>
                        Seinastu skanningar
                    </Text>
                </View>

            </View>
            <ScrollView style={{
                flexDirection: "column",
                width: "100%",
                padding: 10,
                marginBottom: 30,

            }}>
                <View
                    style={{ padding: 10, flexDirection: "row", width: "100%" ,justifyContent:'space-between',marginRight:10}}>
                    <Text style={{width:90,fontWeight:"bold", color: "black"}}>{headerData[0]}</Text>
                        <Text style={{width:170,fontWeight:"bold", color: "black"}} >{headerData[1]}</Text>
                        <Text style={{width:100,fontWeight:"bold", color: "black"}} >{headerData[2]}</Text>
                    </View>
                {cardData.transactions&&cardData?.transactions.map((item,index)=>{
                    return (
                        <View key={index} style={{
                            padding: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 5,justifyContent:'space-between'
                        }}>
                            <Text
                                style={{ width: 90, fontSize: 12, color: "black" }}>{item.operationDate || "null"}</Text>
                            <Text style={{width:170,fontSize: 12, color: "black"}} >{cardNumber||"null"}</Text>
                            <Text style={{
                                width: 100,
                                fontSize: 12,
                                color: "black",
                            }}>{item.currency}. {item.amount || "null"}</Text>

                        </View>
                    );
                })}

            </ScrollView>



        </View>
    );
};

export default HistoryScreen;
