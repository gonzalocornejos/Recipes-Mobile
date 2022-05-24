import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, StyleSheet, ScrollView} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react'

const Paso = ({element,index,onChange}) => {
    const [number,setNumber] = useState(index+1);
    const [title,setTitle] = useState(element.title);
    const [descripcion,setDescripcion] = useState(element.descripcion);
    const [images,setImages] = useState(element.images ? images : []);

    const selectFile = async () => {       
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [6, 3],
            quality: 1,
          });  
 
       if (!result.cancelled) {
         setImages([...images,result]);
         updateChanges();
       }
     }

    const updateTitle = (newTitle) => {
        setTitle(newTitle);
        updateChanges();
    }

    const updateDescripcion = (newDescripcion) => {
        setDescripcion(newDescripcion);
        updateChanges();
    }

    const updateChanges = () => {
        const updatedObject = {
            number: number,
            title: title,
            descripcion: descripcion,
            images: images
        }
        onChange(updatedObject,index)
    }

    return (
        <View style={styles.containter}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <View style={styles.numberContainer}>
                    <Text style={styles.numberText}>{number}</Text>
                </View>
                <View style={{paddingLeft:20*widthFactor}}>
                    <Text style={styles.titleText}>Nombre</Text>
                    <TextInput value={title} 
                                style={styles.titleInput}
                                onChangeText={(title) => updateTitle(title)}></TextInput>
                </View>
            </View>
            <TextInput  style={styles.descInput}
                            placeholder='Descripcion'
                            value={descripcion}
                            multiline={true}
                            onChangeText={(descripcion) => updateDescripcion(descripcion)}/>
            <ScrollView horizontal={true}>
                {images.map((image,index) => (
                    <Image source={{uri: image.uri}} key={index} style={styles.img}/>
                ))}
                <TouchableOpacity style={styles.imgBox}
                                    onPress={selectFile}>
                        <Image source={require('../../../assets/images/ui/img.png')}
                                style={{width: 38 * widthFactor, height: 40 * heightFactor}}/>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const widthFactor = Dimensions.get('window').width/390;
    const heightFactor = Dimensions.get('window').height/844;

    const styles = StyleSheet.create({
        containter:{
            marginTop: 10*heightFactor,
            width: 345*widthFactor,
            height: 224*heightFactor,
            borderRadius: 8,
            backgroundColor: '#FFFFFF',
            paddingTop: 7*heightFactor,
            paddingLeft: 15* widthFactor,
        },
        numberContainer:{
            width: 26*widthFactor,
            height: 26*heightFactor,
            backgroundColor: '#FF4B3A',
            borderRadius: 20,
            alignItems:'center',
            justifyContent:'center'
        },
        numberText:{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 16*heightFactor,
            color: '#FFFFFF'
        },
        titleText:{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 12*heightFactor,
            color:'#000000',
            opacity:0.4
        },
        titleInput:{
            borderBottomColor: '#000000',
            borderBottomWidth: 0.5,
            width: 257*widthFactor,
            height: 20*heightFactor,
            textAlignVertical: 'bottom',
            paddingBottom: 0
        },
        descInput:{
            width: 303*widthFactor,
            height: 66*heightFactor,
            borderColor: '#3D3D3D',
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 16*heightFactor,
            paddingTop: 7*heightFactor,
            paddingLeft: 8*widthFactor,
            textAlign:'left',
            textAlignVertical: 'top',
        },
        img: {
            width: 160.85*widthFactor,
            height: 70.63*heightFactor,
            borderRadius: 8,
            marginTop: 16*heightFactor,
            marginRight: 8*widthFactor
        },
        imgBox:{
            width: 160.85*widthFactor,
            height: 70.63*heightFactor,
            borderRadius: 8,
            backgroundColor: '#C4C4C480',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16*heightFactor,
        }
});

export default Paso