import { Image, StyleSheet , Text, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";


const Page = ()=>{
    return(
        <>
        <Stack.Screen 
        options ={{
            headerTransparent: true,
            headerTitle :"",
            headerLeft: ()=>(
                <TouchableOpacity onPress={()=>{}} style={{marginLeft:20}}>
                <Image 
                source ={{
                    uri :"https://xsgames.co/randomusers/avatar.php?g=male"

                }}
                style = {{width:40 , height :40, borderRadius :10}}
                />
                </TouchableOpacity>
               
            )


            
        }}
        
        />


        <View style = {styles.container}>
            <Text>Page</Text>
        </View>
        </>
    );
}

export default Page

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})