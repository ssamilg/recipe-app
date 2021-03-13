// Bu dosyada kullanilacak elementler import edildi 
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Caption  } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RecipeComments from '../components/RecipeComments';
import NewComment from '../components/NewComment';

const RecipeDetails = ({ route }) => {
  // Local degiskenler tanimlandi
  const { recipe } = route.params;
  const { pa4 } = paddings;
  const { ma4, my4, mt4, mr2 } = margins;

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

      <View>
        <RecipeComments recipe={recipe}/>

        <NewComment recipe={recipe}/>
      </View>

    </ScrollView>
  );
};

// Tarif detayi ekrani export ediliyor
export default RecipeDetails;
