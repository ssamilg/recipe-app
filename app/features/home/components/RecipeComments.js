// Bu dosyada kullanilacak elementler import edildi 
import React from 'react';
import { View } from 'react-native';
import { Card, Title, Caption } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
import { useSelector } from 'react-redux';

const RecipeComments = () => {
  // Local degiskenler tanimlandi
  const {  px4 } = paddings;
  const { mt4, ml4, mx4, my1 } = margins;
  // Tarif yorumlari statede bulunan tariften cekiliyor
  const recipeComments = useSelector(state => state.mainReducer.recipe.comments); 

  // Tarif yorumlari dongu ile render ediliyor
  const comments = recipeComments.map((comment) => 
      // Yorum karti tasarimi
      <View key={comment.id}>
        <Card
          style={[ my1, mx4]}
        >
          <View style={[mt4, ml4, { flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
            <Caption>{comment.user.email}</Caption>
          </View>
          <Card.Title title={comment.commentText} subtitle={comment.dateCreated.toDate().toString().substr(0, 24)}/>
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

// Yorumlar component export edildi
export default RecipeComments;
