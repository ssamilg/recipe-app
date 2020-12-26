// Bu dosyada kullanilacak elementler import edildi 
import React, { useEffect, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Caption  } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RecipeComments from '../components/RecipeComments';
import NewComment from '../components/NewComment';
import firestore from '@react-native-firebase/firestore';

const RecipeDetails = ({ route }) => {
  // Local degiskenler tanimlandi
  const { recipe } = route.params;
  const { pa4, my2, px4 } = paddings;
  const { ma4, my4, mt4, mr2, mx4 } = margins;
  const [suggestedRecipe, setSuggestedRecipe] = React.useState([]);

  useEffect(() => {
    fetchSuggestedRecipe();
  }, [fetchSuggestedRecipe])

  const fetchSuggestedRecipe = useCallback(
    () => {
      firestore()
        .collection('Recipes')
        .where('recipeCategory.id', '==', recipe.recipeCategory.id + 1)
        .limit(5)
        .get()
        .then((querySnapshot) => {

          const tempArray = [];
  
          querySnapshot.forEach((documentSnapshot) => {
            const recipe = documentSnapshot.data();
            tempArray.push(recipe);
          });
          
          const randomIndex = Math.floor(Math.random() * tempArray.length);
          setSuggestedRecipe(tempArray[randomIndex]);
        });
    },
    [],
  );

  return (
    // Tarif detayi ekrani tasarimi
    <ScrollView>
      <Card
        style={[pa4, ma4]}
      >
        <Card.Cover
          source={{ uri: recipe.photoLink }}
        />

        <Card.Content
          style={[mt4]}
        >
          <Title>{ recipe.recipeTitle }</Title>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <CommunityIcon color="gray" name="account" size={16} style={[mr2]}/>
            <Caption>{recipe.user.email}</Caption>
          </View>

          <View style={[my4, { flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
            <CommunityIcon color="gray" name="file-document-edit" size={16} style={[mr2]}/>
            <Paragraph>{ recipe.recipeCategory.name }</Paragraph>
          </View>

          <Paragraph>{ recipe.recipeDetails }</Paragraph>
        </Card.Content>
      </Card>

      <Title style={[px4]}>Yanına Güzel Gider</Title>

      <Card style={[pa4, mx4, my2]}>
        <Card.Cover
          style={{ height: 100, width: '100%', resizeMode: 'contain' }}
          source={{ uri: suggestedRecipe.photoLink }}
        />
        <Card.Title title={suggestedRecipe.recipeTitle} subtitle="Tarif detayı için tıklayınız..."/>
      </Card>

      <View style={[my2]}>
        <RecipeComments recipe={recipe}/>

        <NewComment recipe={recipe}/>
      </View>

    </ScrollView>
  );
};

// Tarif detayi ekrani export ediliyor
export default RecipeDetails;
