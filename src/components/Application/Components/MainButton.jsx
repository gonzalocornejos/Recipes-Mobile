import { Text, StyleSheet, Pressable } from "react-native"

const MainButton = ({onPress, value, active}) => {    
    return (
        <Pressable onPress={onPress} style={active ? styles.containerInactive : styles.container}>
            <Text style={styles.text}>{value}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF4B3A',
        
        width: '65.38%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 30
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white'
    },
    containerInactive: {
        backgroundColor: '#F99F96',
        width: '65.38%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 30
    }
});

export default MainButton;