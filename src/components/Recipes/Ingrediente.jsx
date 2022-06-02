import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, StyleSheet, Pressable} from 'react-native'
import {useState} from 'react'
import RNPickerSelect from "react-native-picker-select";
import {PanGestureHandler,GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {useAnimatedGestureHandler,useAnimatedStyle,useSharedValue} from 'react-native-reanimated'
import BackArrow from '../../components/Application/Icons/BackArrow';

const Ingrediente = ({element,index,onChange,onDelete}) => {
    const [name,setName] = useState(element.name);
    const [cant,setCant] = useState(element.cant);
    const [unit,setUnidad] = useState(element.unit);
    const [desc,setDesc] = useState(element.desc);
    const [valido,setValido] = useState(element.valido);

    const updateName = (newName) => {
        setName(newName);
        verificarValidez();
        updateChanges();
    } 

    const updateCant = (newCant) => {
        setCant(newCant);
        verificarValidez();
        updateChanges();
    }

    const updateUnit = (newUnit) => {
        setUnidad(newUnit);
        verificarValidez();
        updateChanges();
    }
    const updateDesc = (newDesc) => {
        setDesc(newDesc);
        updateChanges();
    }

    

    const updateChanges = () => {
        const updatedObject = {
            name: name,
            cant: cant,
            unit: unit,
            desc: desc,
            valido: valido
        }
        onChange(updatedObject,index)
    }

    const verificarValidez = () => {
        if (name!==null && cant!==null && unit!== "") setValido(true);
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
        <Pressable onLongPress={() => {onDelete(index)}} style={styles.containter}>
            <View style={{flexDirection:'row', alignItems:'center', width: 70*widthFactor,height: 42*heightFactor}}>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>Nombre</Text>
                    <TextInput value={name} 
                                style={styles.nameInput}
                                onChangeText={(name) => updateName(name)}/>
                </View>
                <View style={{paddingLeft:24*widthFactor, flexDirection:'column'}}>
                    <Text style={styles.cantText}>Cantidad</Text>
                    <TextInput value={cant} 
                                style={styles.CantInput}
                                onChangeText={(cant) => updateCant(cant)}/>
                </View>
                <View style={{paddingLeft:24*widthFactor, flexDirection:'column'}}>
                    <Text style={styles.unidadText}>Unidad</Text>
                    <RNPickerSelect
                        value={unit}
                        style={pickerSelectStyles}
                        items={[
                        { label: "Kg", value: "Kg" },
                        { label: "g", value: "g" },
                        { label: "lt", value: "lt" },
                        { label: "ml", value: "ml" },
                        ]}
                        onValueChange={(unit) => updateUnit(unit)}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {return <Image source={require('../../../assets/images/ui/dropDownArrow.png')}/>}}/>
                </View>
            </View>
            <TextInput  style={styles.descInput}
                            placeholder='Descripcion'
                            value={desc}
                            multiline={true}
                            onChangeText={(desc) => updateDesc(desc)}/>
            
        </Pressable>
        
    )
}

const widthFactor = Dimensions.get('window').width/390;
const heightFactor = Dimensions.get('window').height/844;

const styles = StyleSheet.create({
        containter:{
            marginTop: 10*heightFactor,
            width: 345*widthFactor,
            height: 154*heightFactor,
            borderRadius: 8,
            backgroundColor: '#FFFFFF',
            paddingTop: 7*heightFactor,
            paddingLeft: 15* widthFactor,
        },
        ingrediente:{
            width:'100%',
            height:'100%'
        },
        nameContainer:{
            flexDirection: 'column',
        },
        nameText:{
            width: 53.81*widthFactor,
            height: 14*heightFactor,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 12*heightFactor,
            color: '#000000',
            opacity:0.4
        },
        nameInput:{
            width:115*widthFactor,
            height:24*heightFactor,
            borderBottomWidth: 0.5*heightFactor,
            borderBottomColor: '#000000',
            borderStyle: 'solid',
            textAlignVertical: 'bottom',
            paddingBottom: 0
        },
        cantText:{
            width: 53.81*widthFactor,
            height: 14*heightFactor,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 12*heightFactor,
            color:'#000000',
            opacity:0.4
        },
        CantInput:{
            width: 58*widthFactor,
            height: 24*heightFactor,
            borderBottomColor: '#000000',
            borderBottomWidth: 0.5*heightFactor,
            textAlignVertical: 'bottom',
            borderStyle: 'solid',
            paddingBottom: 0
        },
        descInput:{
            width: 316*widthFactor,
            height: 74*heightFactor,
            borderColor: '#3D3D3D',
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 16*heightFactor,
            paddingTop: 7*heightFactor,
            paddingLeft: 8*widthFactor,
            textAlign:'left',
            textAlignVertical: 'top',
        },
        unidadText:{
            width: 53.81*widthFactor,
            height: 14*heightFactor,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 12*heightFactor,
            color: '#000000',
            opacity:0.4
        },
        input:{
                height:24*heightFactor,
                width: 96*widthFactor,
                borderBottomWidth: 0.5*heightFactor,
                borderBottomColor: '#000000',
                borderStyle: 'solid',
        },
        cross: {
            width: 37*widthFactor,
            height: 38*heightFactor,
            alignSelf: 'flex-end'
        },
});

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
        width: 92*widthFactor,
        height: 24*heightFactor,
        borderWidth: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        color: 'black',
        paddingBottom: 0,
        textAlignVertical: 'bottom',
    },
  });

export default Ingrediente