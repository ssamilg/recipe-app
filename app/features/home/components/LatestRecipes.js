import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
import { useDispatch, useSelector } from 'react-redux';
import { refreshRecipe } from '~/features/main/redux/actions';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const LatestRecipes = (props) => {
  const dispatch = useDispatch();
  const { pa4 } = paddings;
  const { mx4, my2, mr1 } = margins;
  let uid = '';
  if (auth().currentUser) {
    uid = auth().currentUser._user.uid;
  }

  const navigateToRecipeDetails = (recipe) => {
    dispatch(refreshRecipe(recipe));
    props.navigation.navigate('RecipeDetails', {
      recipe,
    });
  };

  const likeRecipe = useCallback(
    (recipe) => {
      if (!isLiked(recipe)) {      
        firestore()
        .collection('Recipes')
        .doc(recipe.id)
        .update({
          likes: firestore.FieldValue.increment(1),
          usersLiked: firestore.FieldValue.arrayUnion(uid)
        })
        .then(() => {
          console.log('Recipe liked!');
          recipe.likes += 1;
        })
        .catch((err) => {
          console.log(err);
        });
      } else if (isLiked(recipe)) {
        firestore()
        .collection('Recipes')
        .doc(recipe.id)
        .get()
          .then((querySnapshot) => {
            const tempArray = querySnapshot._data.usersLiked.filter(u => u !== uid);
    
            firestore()
            .collection('Recipes')
            .doc(recipe.id)
            .update({
              usersLiked: tempArray,
              likes: firestore.FieldValue.increment(-1),
            })
              .then(() => {
                recipe.likes -= 1;
              });
          })
      }
    },
    []
  );
  
  const isLiked = useCallback(
    (recipe) => {
    if (recipe.usersLiked.find(u => u === uid)) {
      return true;
    }

    return false;
  }, [latestRecipeList]);

  const latestRecipeList = props.latestRecipes.map((recipe) => 
    <View key={recipe.recipeTitle}>
      <Card
        style={[pa4, mx4, my2]}
        onPress={() => navigateToRecipeDetails(recipe)}
      >
        <Card.Cover
          style={{ height: 100, width: '100%', resizeMode: 'contain' }}
          source={{ uri: recipe.photoLink }}
        />
        <Card.Title title={recipe.recipeTitle} subtitle="Tarif detay?? i??in t??klay??n??z..."/>
        <View style={[mx4, { flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
          <CommunityIcon
            color="#E91E63"
            name={isLiked(recipe) ? "heart" : "heart-outline"}
            size={20}
            style={[mr1]}
            onPress={() => likeRecipe(recipe)}
          />
          <Text style={[mr1]}>{recipe.likes}</Text>
          <Text>Be??eni</Text>
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