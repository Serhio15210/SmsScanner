import React, {useEffect} from 'react';
import {FlatList, ScrollView, Text, View} from "react-native";

const InfoScreen = () => {

    return (

        <ScrollView style={{
            flex:1,

        }}>
            <View style={{
                height:50,
                margin:20,
                marginBottom:70,
                top:30,
                flexDirection:"row"
            }}>
                <View style={{flexDirection:'column'}}>
                    <Text style={{fontSize:20,paddingRight:30,fontWeight:"bold", color: "black"}}>
                        Kundatænastan
                    </Text>
                    <Text style={{width:"70%", color: "black"}}>
                        Spurningar kunnu sendast til sms@sms.fo
                        Ella ring til 34 19 00
                    </Text>
                </View>

            </View>
            <View style={{
                flexDirection:'column',
                width:"100%",
                padding:20
            }}>
                 <Text style={{fontWeight:"bold",fontSize:15, color: "black"}}>
                     Marknaðardeildin
                 </Text>
                <Text style={{color: "black"}} >
                    SMS gávukortið verður umsitið av marknaðardeildini hjá SMS.
                    Deildin heldur til á ovastu hæddini, við síðuna av Fonn Flog.
                </Text>
            </View>
            <View style={{
                flexDirection:"row",
                justifyContent:'space-between',
                width:"100%",
                padding:20,
                height:150,

            }}>
                <View style={{width:200,flexDirection:'column'}}>
                    <Text style={{fontWeight:'bold',fontSize:15, color: "black"}}>Opið er:</Text>
                    <Text style={{color: "black"}}>Mánadag til fríggjadag frá kl. 10-16.
                        Leygardag er stongt.
                        Sunnudag er stongt.
                    </Text>
                </View>
                <View style={{width:120,flexDirection:'column',alignSelf:'flex-end'}}>
                    <Text style={{fontWeight:'bold',fontSize:15, color: "black"}}>SMS</Text>
                    <Text style={{ color: "black"}}>á Trapputrøðni{"\n"}100 Tórshavn{"\n"}Tlf.: 341900{"\n"}sms@sms.fo{"\n"}www.sms.fo</Text>
                </View>
            </View>
            <View style={{
                flexDirection:"row",
                justifyContent:'space-between',
                width:"100%",
                padding:20
            }}>
                <View style={{width:"100%",height:100,flexDirection:'column'}}>
                    <Text style={{fontWeight:'bold',fontSize:15, color: "black"}}>Treytir</Text>
                    <Text style={{fontSize:15, color: "black"}}>Gávukortið er galdandi í fimm ár frá útgávudegnum.
                        Kortið má goymast væl, tí burturmist kort verða ikki endurgoldin. Kortið kann ikki býtast um við reiðan pening.  Tænastan verður latin í samstarvi við PBS.</Text>

                </View>

            </View>

        </ScrollView>


    );
};

export default InfoScreen;
