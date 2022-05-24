import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker';

const Paso = ({element}) => {
    const selectFile = async () => {       
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [6, 3],
            quality: 1,
          });  
 
       if (!result.cancelled) {
         //setImage(result.uri);
       }
     }

    return (
        <View>
            <View>
                <View>
                    <Text>{element.number}</Text>
                </View>
                <View>
                    <Text>Nombre</Text>
                    <TextInput value={element.title}></TextInput>
                </View>
            </View>
            <TextInput  style={styles.descInput}
                            placeholder='Descripcion'
                            value={element.descripcion}
                            multiline={true}
                            onChangeText={(descripcion) => setDescripcion(descripcion)}/>
            <View>
                {element.images.map((image) => (
                    <Image source={image}
                        style={{width: 82 * widthFactor, height: 87 * heightFactor}}/>
                ))} 
                <TouchableOpacity style={styles.imgBox}
                                    onPress={selectFile}>
                        <Image source={require('../../../assets/images/ui/img.png')}
                                style={{width: 82 * widthFactor, height: 87 * heightFactor}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const widthFactor = Dimensions.get('window').width/390;
    const heightFactor = Dimensions.get('window').height/844;

    const styles = StyleSheet.create({
        descInput:{},
        imgBox:{}
});

export default Paso