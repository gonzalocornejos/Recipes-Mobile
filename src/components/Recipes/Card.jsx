import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import environment from '../../constants/environment';
import EmptyHearIcon from '../Application/Icons/EmptyHearIcon';
import HeartIcon from '../Application/Icons/HeartIcon';
import StarIcon from '../Application/Icons/StarIcon';


const Card = ({navigation, id = undefined, imageUri, recipeName = "[INDEFINIDO]", author = "[INDEFINIDO]", score = 0.0, isFavorite, own = false, nickName, data = undefined}) => {

    const [isFavoriteState, setIsFavorite] = useState(isFavorite);
    const toggleFavorite = () => {
        axios.put(`${environment.API_URL}/recetas/favorito/${nickName}/${id}`)
            .then(_ => setIsFavorite(!isFavoriteState))
            .catch(error => Alert.alert("Ups!", "No se pudo cambiar de estado el favorito de esta receta"))
    }

    const pressCard = () => {
            navigation.navigate('ViewRecipe', {idRecipe: id, data})
    }

    return ( 
    <View style={styles.card}>
        <ImageBackground 
            source={{uri: imageUri}} 
            resizeMode="cover" 
            style={{width: '100%', height: '100%'}}
            imageStyle={{ borderRadius: 10}}>
            <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10}} >
                <View style={{position:'absolute', marginLeft: 310*widthFactor, marginTop: 10*heightFactor}}>
                    <TouchableOpacity onPress={() => toggleFavorite()}>
                        {own ? <></> : isFavoriteState ? <HeartIcon/> : <EmptyHearIcon/>}
                    </TouchableOpacity>                  
                </View> 
                <View style={styles.scoreContainer}>
                    <StarIcon isActive={true}/>  
                    <Text style={styles.score}>{score.toFixed(1)}</Text>
                </View>          
                <View style={{width: '100%', marginTop: 95, position:'absolute'}}>
                    <TouchableOpacity onPress={() => pressCard()}>
                        <Text style={styles.recipeName}>{recipeName}</Text>  
                        <Text style={styles.name}>{author}</Text>  
                    </TouchableOpacity>               
                </View>  
            </View>               
        </ImageBackground>
    </View> 
    );
}
 
const widthFactor = Dimensions.get('window').width/390;
const heightFactor = Dimensions.get('window').height/844;

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
        marginLeft: 250, 
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