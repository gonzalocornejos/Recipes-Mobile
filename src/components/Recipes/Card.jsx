import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import EmptyHearIcon from '../Application/Icons/EmptyHearIcon';
import HeartIcon from '../Application/Icons/HeartIcon';
import StarIcon from '../Application/Icons/StarIcon';


const Card = ({imageUri, recipeName = "[INDEFINIDO]", author = "[INDEFINIDO]", score = 0.0, isFavorite}) => {
    return ( 
    <View style={styles.card}>
        <ImageBackground 
            source={imageUri} 
            resizeMode="cover" 
            style={{width: '100%', height: '100%'}}
            imageStyle={{ borderRadius: 10}}>
            <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10}}>
                <View style={{position:'absolute', marginLeft: 310, marginTop: 10}}>
                    {isFavorite ? <HeartIcon/> : <EmptyHearIcon/>}
                </View> 
                <View style={styles.scoreDiv}>
                    <StarIcon />  
                    <Text style={styles.score}>{score}</Text>
                </View>          
                <View style={{width: '100%', marginTop: 95, position:'absolute'}}>
                    <Text style={styles.recipeName}>{recipeName}</Text>  
                    <Text style={styles.name}>{author}</Text>  
                </View>  
            </View>               
        </ImageBackground>
    </View> 
    );
}
 
const styles = StyleSheet.create({
    card: {
        display: 'flex',
        marginBottom: '5%',
        height: 160
    },
    name: {
        marginLeft: 10,
        fontSize: 18,
        color: 'white',
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
    },
    recipeName: {
        marginLeft: 10,
        fontSize: 25,
        color: 'white',
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold'
    },
    scoreDiv: {
        position:'absolute', 
        flexDirection:'row', 
        flexWrap:'wrap', 
        marginLeft: 270, 
        marginTop: 125, 
        alignItems: 'center'
    },
    score : {
        fontSize: 20,
        color: '#FFE600',
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        marginLeft: 10
    }
});

export default Card;