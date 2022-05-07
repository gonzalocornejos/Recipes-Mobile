import { Text, StyleSheet, Pressable } from "react-native"

const MainButton = ({onPress, value}) => {    
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{value}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF4B3A',
        
        width: '90%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 30
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white'
    }
});

export default MainButton;