import { View, Text, Image, TextInput, Dimensions, StyleSheet, Pressable} from 'react-native'
import {useState,useEffect} from 'react'
import RNPickerSelect from "react-native-picker-select";

const Ingrediente = ({element,index,onChange,onDelete,unidades}) => {
    const [nombre,setNombre] = useState(element.nombre);
    const [cantidad,setCantidad] = useState(element.cantidad);
    const [unidad,setUnidad] = useState(element.unidad);
    const [descripcion,setDescripcion] = useState(element.descripcion);
    const [valido,setValido] = useState(element.valido);
    const [unidadesList,setUnidadesList] = useState([]);

    useEffect(()=>{
        let data = [...unidadesList]
        unidades.forEach((unidad)=>{
            let newUnidad = {
                label: unidad.item,
                value: unidad.item
            }
            data.push(newUnidad);
        })
        setUnidadesList(data)
    },[])

    const updateName = (newName) => {
        setNombre(newName);
        verificarValidez();
        updateChanges();
    } 

    const updateCant = (newCant) => {
        setCantidad(newCant);
        verificarValidez();
        updateChanges();
    }

    const updateUnit = (newUnit) => {
        let newRUnit
        unidades.forEach((unidad) => {
            if (newUnit !== null && newUnit.value === unidad.id) {newRUnit = unidad;}
        })
        setUnidad(newRUnit);
        verificarValidez();
        updateChanges();
    }
    const updateDesc = (newDesc) => {
        setDescripcion(newDesc);
        updateChanges();
    }

    const updateChanges = () => {
        const updatedObject = {
            nombre: nombre,
            cantidad: cantidad,
            unidad: unidad,
            descripcion: descripcion,
            valido: valido
        }
        if(!isViewMode){
            onChange(updatedObject,index)
        }
    }

    const verificarValidez = () => {
        if (nombre!==null && cantidad!==null && unidad!== null) setValido(true);
    }

    return (
        <Pressable onLongPress={() => {onDelete(index)}} style={styles.containter}>
            <View style={{flexDirection:'row', alignItems:'center', width: 70*widthFactor,height: 42*heightFactor}}>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>Nombre</Text>
                    <TextInput value={nombre} 
                                style={styles.nameInput}
                                onChangeText={(name) => updateName(name)}
                                editable={!isViewMode}/>
                </View>
                <View style={{paddingLeft:24*widthFactor, flexDirection:'column'}}>
                    <Text style={styles.cantText}>Cantidad</Text>
                    <TextInput value={cantidad} 
                                style={styles.CantInput}
                                onChangeText={(cant) => updateCant(cant)}/>
                </View>
                <View style={{paddingLeft:24*widthFactor, flexDirection:'column'}}>
                    <Text style={styles.unidadText}>Unidad</Text>
                    <RNPickerSelect
                        value={unidad}
                        style={pickerSelectStyles}
                        items={unidadesList}
                        onValueChange={(unit) => updateUnit(unit)}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {return <Image source={require('../../../assets/images/ui/dropDownArrow.png')}/>}}/>
                </View>
            </View>
            <TextInput  style={styles.descInput}
                            placeholder='Descripcion'
                            value={descripcion}
                            multiline={true}
                            onChangeText={(desc) => updateDesc(desc)}
                            editable={!isViewMode}/>
                : <></>}
            
        </Pressable>
        
    )
}

const widthFactor = Dimensions.get('window').width/390;
const heightFactor = Dimensions.get('window').height/844;

const styles = StyleSheet.create({
        containter:{
            marginTop: 10*heightFactor,
            width: 345*widthFactor,
            height: 'auto',
            borderRadius: 8,
            backgroundColor: '#FFFFFF',
            paddingTop: 7*heightFactor,
            paddingLeft: 15* widthFactor,
            paddingBottom: 15* widthFactor
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
            paddingBottom: 0,
            color: 'black'
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
            color: 'black'
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