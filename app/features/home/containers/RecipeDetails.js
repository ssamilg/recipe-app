import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card, TextInput, Button, Title, Paragraph, Caption  } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
// import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RecipeComments from '../components/RecipeComments';
import NewComment from '../components/NewComment';

const RecipeDetails = ({ route }) => {
  const { recipe } = route.params;
  // const recipe = useSelector(state => state.mainReducer.recipe);
  const { py1, pa4, px2, pt10 } = paddings;
  const { ma4, my4, mt4, mr2, mt10 } = margins;

  return (
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

export default RecipeDetails;

const styles = StyleSheet.create({});
