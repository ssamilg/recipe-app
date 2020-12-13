import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, useTheme, Button } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
import { useDispatch } from 'react-redux';
import { refreshRecipe } from '~/features/main/redux/actions';

const LatestRecipes = (props) => {
  const dispatch = useDispatch();
  const { py1, pa4, px2, py3 } = paddings;
  const { mx4, my2, mt4, mt6, mx1 } = margins;
  const { colors } = useTheme();

  const navigateToRecipeDetails = (recipe) => {
    dispatch(refreshRecipe(recipe));
    props.navigation.navigate('RecipeDetails', {
      recipe,
    });
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
