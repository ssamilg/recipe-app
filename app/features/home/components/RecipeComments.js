import { func } from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, useTheme, Title, Caption } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';

const RecipeComments = ({ recipe }) => {
  const { py2, pt4, px4, py3 } = paddings;
  const { mt2, mt4, ml4, mx4, my1, mx1 } = margins;
  const { colors } = useTheme();
  const [recipeComments, setRecipeComments] = React.useState([]);
  getRecipeComments();

  async function getRecipeComments() {
    if (recipe.comments) {
      setRecipeComments(recipe.comments);
    } else {
      setRecipeComments([{
        id: 0,
        user: { email: '' },
        commentText: 'Henüz hiç yorum yok...' ,
        dateCreated: '',
      }]);
    }
  };

    const comments = recipeComments.map((comment) => 
      <View key={comment.id}>
        <Card
          style={[ my1, mx4]}
        >
          <View style={[mt4, ml4, { flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
            <Caption>{comment.user.email}</Caption>
            {/* <Caption>date</Caption> */}
          </View>
          <Card.Title title={comment.commentText} subtitle="{comment.dateCreated}"/>
        </Card>
      </View>
    );
    
    return (
      <View>
        <Title style={[px4]}>Yorumlar</Title>
        <View>{ comments }</View>
      </View>
    );
};

export default RecipeComments;

const styles = StyleSheet.create({});
