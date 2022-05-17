import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity } from "react-native"

const CreateRecipeScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.titleText}>Informacion General</Text>
            <Text style={styles.imgText}>Foto principal</Text>
            <TouchableOpacity style={styles.imgBox}>
                <Image  style={styles.img}
                        source={require('../../../../assets/images/ui/img.png')} />
            </TouchableOpacity>
            <Text style={styles.nameText}>Nombre</Text>
            <TextInput style={styles.nameInput}/>
            <TextInput  style={styles.descInput}
                        placeholder='Descripcion'/>
            <View>
                <Text>Porciones</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleText:{
        position: 'absolute',
        width: 293,
        height: 38,
        left: 20,
        top: 53,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        color: '#FF4B3A',
        fontSize: 32,
    },
    imgText:{
        position: 'absolute',
        width: 111,
        height: 30,
        left: 20,
        top: 113,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 18,
    },
    imgBox: {
        position: 'absolute',
        width: 314,
        height: 155,
        left: 20,
        top: 149,
        backgroundColor: '#C4C4C480',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 82,
        height: 82,
    },
    nameText:{
        position: 'absolute',
        width: 62,
        height: 20,
        left: 20,
        top: 325,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 17,
        color: '#909090',
    },
    nameInput:{
        position: 'absolute',
        width: 314,
        height: 20,
        left: 20,
        top: 380,
        borderBottomColor: '#000000',
        borderBottomWidth: 0.5
    },
    descInput:{
        position: 'absolute',
        width: 314,
        height: 153,
        left: 20,
        top: 421,
        borderColor: '#3D3D3D',
        borderWidth: 1,
        borderRadius: 10,
        textAlign:'left',
        textAlignVertical:'top'
    
    }
});

export default CreateRecipeScreen;