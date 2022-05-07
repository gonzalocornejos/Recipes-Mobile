import { View, TextInput, StyleSheet } from "react-native"

const Input = ({value, setValue, placeholder, secureTextEntry}) => {  
    /* Falta modificarlo a como esta en el wireframe */  
    return (
        <View style={styles.container}>
            <TextInput 
             value={value}
             onChangeText={setValue}
             placeholder={placeholder}
             secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5
    },
});

export default Input;