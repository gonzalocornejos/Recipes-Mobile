import { Text, StyleSheet, Pressable } from "react-native"

const SecondaryButton = ({onPress, value}) => {    
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{value}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0000',  
           
        width: '65.38%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',

        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#FF4B3A'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#FF4B3A'
    }
});

export default SecondaryButton;