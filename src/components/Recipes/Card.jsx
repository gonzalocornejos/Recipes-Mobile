import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import environment from '../../constants/environment';
import EmptyHearIcon from '../Application/Icons/EmptyHearIcon';
import HeartIcon from '../Application/Icons/HeartIcon';
import StarIcon from '../Application/Icons/StarIcon';


const Card = ({id, imageUri, recipeName = "[INDEFINIDO]", author = "[INDEFINIDO]", score = 0.0, isFavorite, own = false, nickName}) => {

    const [isFavoriteState, setIsFavorite] = useState(isFavorite);
    const toggleFavorite = () => {
        axios.put(`${environment.API_URL}/recetas/favorito/${nickName}/${id}`)
            .then(_ => setIsFavorite(!isFavoriteState))
            .catch(error => Alert.alert("Ups!", "No se pudo cambiar de estado el favorito de esta receta"))
    }

    return ( 
    <View style={styles.card}>
        <ImageBackground 
            source={{uri: imageUri}} 
            resizeMode="cover" 
            style={{width: '100%', height: '100%'}}
            imageStyle={{ borderRadius: 10}}>
            <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10}}>
                <View style={{position:'absolute', marginLeft: 310, marginTop: 10}}>
                    <TouchableOpacity onPress={() => toggleFavorite()}>
                        {own ? <></> : isFavoriteState ? <HeartIcon/> : <EmptyHearIcon/>}
                    </TouchableOpacity>                  
                </View> 
                <View style={styles.scoreContainer}>
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
    scoreContainer: {
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

const mapStateToProps = state => ({
    nickName: state.authentication.userName
  });

export default connect(mapStateToProps)(Card);