import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native'
import {useState,useEffect} from 'react'
import RNPickerSelect from "react-native-picker-select";

const Categoria = ({element,index,onChange,onDelete,categorias,valid,id}) => {
    const [categoria,setCategoria] = useState(element)
    const [number,setNumber] = useState(index)
    const [valido,setValido] = useState(valid)
    const [categoriasList,setCategoriasList] = useState([]);

    useEffect(()=>{
        let data = [...categoriasList]
        categorias.forEach((categoria)=>{
            let newCategoria = {
                label: categoria.item,
                value: categoria.id
            }
            data.push(newCategoria);
        })
        setCategoriasList(data)
        console.log(categoria)
    },[])

    const updateCat = (newCat) => {
        let newRCat
        categorias.forEach((categoria) => {
            if (newCat !== null && newCat === categoria.id) {
                newRCat = categoria;
            }
        })
        setCategoria(newCat);
        verificarValidez();
        updateChanges(newRCat);
    } 

    const updateChanges = (newRCat) => {
        const updatedObject = {
            id: id,
            categoria: newRCat,
            valido: valido
        }
        onChange(updatedObject,index)
    }

    const verificarValidez = () => {
        if (categoria && typeof(categoria) !== 'object'){ 
            setValido(true);
        }
    }

      return (
        <View style={styles.containter}>
            <View style={{flexDirection:'column', alignItems:'center'}}>
                    <Text style={styles.categText}>Categoria</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <RNPickerSelect
                            value={categoria}
                            style={pickerSelectStyles}
                            items={categoriasList}
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