import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, useTheme, Button } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';

const LatestRecipes = (props) => {
  const { py1, pa4, px2, py3 } = paddings;
  const { ma2, my0, mt4, mt6, mx1 } = margins;
  const { colors } = useTheme();

    const latestRecipeList = props.latestRecipes.map(recipe => 
      <View key={recipe.recipeTitle}>
        <Card
          style={[pa4, ma2]}
          onPress={() => { props.navigation.navigate('RecipeDetails', {
            recipe,
          }) }}
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
