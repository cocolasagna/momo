import { StyleSheet , Text, View } from "react-native";

const WordPage = ()=>{
    return(
        <View style = {styles.container}>
            <Text>Word Matching</Text>
        </View>
    );
}

export default WordPage

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})