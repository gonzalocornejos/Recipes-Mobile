import { Dimensions,TouchableOpacity, Text, StyleSheet } from "react-native";

const AddButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.botonAgregar} onPress={onPress}>
        <Text style={styles.agregarText}>+</Text>
    </TouchableOpacity>
  )
}

const widthFactor = Dimensions.get('window').width/390;
const heightFactor = Dimensions.get('window').height/844;

const styles = StyleSheet.create({
    botonAgregar:{
        marginTop:15*heightFactor,
        borderRadius:100,
        width: 58*widthFactor,
        height: 58*heightFactor,
        backgroundColor: '#FF4B3A',
        alignItems:'center'
    },
    agregarText:{
        fontSize: 42*heightFactor,
        color: '#FFFFFF',
        margin:0
    },
});

export default AddButton