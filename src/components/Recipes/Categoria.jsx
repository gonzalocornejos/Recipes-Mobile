import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, StyleSheet, ScrollView, ImageBackground} from 'react-native'
import {useState} from 'react'
import RNPickerSelect from "react-native-picker-select";
import {PanGestureHandler,GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {useAnimatedGestureHandler,useAnimatedStyle,useSharedValue} from 'react-native-reanimated'


const Categoria = ({element,index,onChange,onDelete}) => {
    const [cat,setCat] = useState(element.cat)
    const [number,setNumber] = useState(index)
    const [valido,setValido] = useState(element.valido)

    const updateCat = (newCat) => {
        setCat(newCat);
        verificarValidez();
        updateChanges();
    } 

    const updateChanges = () => {
        const updatedObject = {
            cat: cat,
            valido: valido
        }
        onChange(updatedObject,index)
    }

    const verificarValidez = () => {
        if (cat!==null) setValido(true);
    }

  	const CONTAINER_wIDTH = 345*widthFactor;
    const TRASHCAN_WIDTH = CONTAINER_wIDTH*0.2;

    const translateX = useSharedValue(0);

    const panGesture = useAnimatedGestureHandler({
        onActive: (event,context) => {
            translateX.value = context.startX + event.translationX;
        },
        onEnd: () => {
            translateX.value = -0.2*CONTAINER_wIDTH;
        },
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
             {
                translateX: translateX.value,
             },
            ],
        }
    });


      return (
        <View style={styles.containter}>
            <View style={{flexDirection:'column', alignItems:'center'}}>
                    <Text style={styles.categText}>Categoria</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <RNPickerSelect
                            value={cat}
                            style={pickerSelectStyles}
                            items={[
                            { label: "Pastas", value: "Pastas" },
                            { label: "Carnes", value: "Carnes" },
                            { label: "Salsas", value: "Salsas" },
                            { label: "Postres", value: "Postres" },
                            ]}
                            onValueChange={(cat) => updateCat(cat)}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {return <Image source={require('../../../assets/images/ui/dropDownArrow.png')}/>}}/>
                        <TouchableOpacity style={{alignItems:'flex-start', paddingLeft:40*widthFactor}}
                                            onPress={() => {onDelete(number)}}>
                            <Image source={require('../../../assets/images/ui/closeNoBack.png')}/>
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    )
}

const widthFactor = Dimensions.get('window').width/390;
const heightFactor = Dimensions.get('window').height/844;

/*Agregar estilos*/
const styles = StyleSheet.create({
    containter:{
        paddingBottom:25*heightFactor,
    },
    categText:{
        alignSelf:'baseline',
        width: 73*widthFactor,
        height: 14*heightFactor,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12*heightFactor,
        opacity:0.4,
    },
    input:{}
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 18,
      paddingVertical: 8,
      paddingHorizontal: 0,
      borderWidth: 0,
      borderBottomWidth: 0.5,
      borderBottomColor: 'red',
      color: 'black',
      paddingRight: 30,
    },
    inputAndroid: {
        width: 285*widthFactor,
        height: 24*heightFactor,
        borderWidth: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        color: 'black',
        paddingBottom: 0,
        textAlignVertical: 'bottom',
    },
  });

export default Categoria