import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, useTheme, Button } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
import { useDispatch } from 'react-redux';
import { refreshRecipe } from '~/features/main/redux/actions';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const LatestRecipes = (props) => {
  const dispatch = useDispatch();
  const { py1, pa4, px2, py3 } = paddings;
  const { mx4, my2, mr1, mt6, mx1 } = margins;
  const { colors } = useTheme();
  const { uid } = auth().currentUser._user;

  const navigateToRecipeDetails = (recipe) => {
    dispatch(refreshRecipe(recipe));
    props.navigation.navigate('RecipeDetails', {
      recipe,
    });
  };

  const likeRecipe = (recipe) => {
    if (!isLiked(recipe)) {      
      firestore()
      .collection('Recipes')
      .doc(recipe.id)
      .update({
        likes: firestore.FieldValue.increment(1)
      })
      .then(() => {
        console.log('Recipe liked!');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        recipe.likes += 1;
  
        firestore()
          .collection('Recipes')
          .doc(recipe.id)
          .update({
            usersLiked: firestore.FieldValue.arrayUnion(uid)
          });
      });
    }
  };

  const isLiked = (recipe) => {
    if (recipe.usersLiked.find(u => u === uid)) {
      return true;
    }

    return false;
  };

  const latestRecipeList = props.latestRecipes.map(recipe => 
    <View key={recipe.recipeTitle}>
      <Card
        style={[pa4, mx4, my2]}
        onPress={() => navigateToRecipeDetails(recipe)}
      >
        <Card.Cover
          style={{ height: 100, width: '100%', resizeMode: 'contain' }}
          source={{ uri: recipe.photoLink }}
        />
        <Card.Title title={recipe.recipeTitle} subtitle="Tarif detayı için tıklayınız..."/>
        <View style={[mx4, { flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
          <CommunityIcon
            color="#E91E63"
            name={isLiked(recipe) ? "heart" : "heart-outline"}
            size={20}
            style={[mr1]}
            onPress={() => likeRecipe(recipe)}
          />
          <Text style={[mr1]}>{recipe.likes}</Text>
          <Text>Beğeni</Text>
        </View>
      </Card>
    </View>
  );
    
  return (
    <View>
      <View>{ latestRecipeList }</View>
    </View>
  );
};

export default LatestRecipes;

const styles = StyleSheet.create({});
