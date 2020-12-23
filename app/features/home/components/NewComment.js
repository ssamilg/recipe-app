// Bu dosyada kullanilacak elementler import edildi 
import React from 'react';
import { View, Text } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { refreshRecipe } from '~/features/main/redux/actions';
import { refreshRecipeById } from '../../main/redux/thunkActions';

const NewComment = ({ recipe }) => {
  // Local degiskenler tanimlandi
  const dispatch = useDispatch();
  const { pa4 } = paddings;
  const { ma4, mt4 } = margins;
  const [commentText, setCommentText] = React.useState('');
  // Giris yapilan kullanici bilgisi cekildi
  const { email, uid } = auth().currentUser._user;

  // Yapilan yorumu db'ye ekleyen method
  const shareComment = () => {
    const newComment = {
      id: `${uid}${recipe.id}${new Date().toString()}`,
      commentText,
      dateCreated: new Date(),
      user: { uid, email },
      recipeId: recipe.id,
    };
    
    firestore()
      .collection('Recipes')
      .doc(recipe.id)
      .update({
        comments: firestore.FieldValue.arrayUnion(newComment)
      })
      .then(() => {
        console.log('Comment added!');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setCommentText('');
        // Dispatch araciligiyla id ile yorum yapilan tarif bilgisi guncelleniyor
        dispatch(refreshRecipeById(recipe.id))
          .then((recipe) => {
            dispatch(refreshRecipe(recipe._data));
          });
      });
  }

  return (
    // Yeni yorum componenti tasarimi
    <View>
      <Card
        style={[pa4, ma4]}
      >
        <Card.Title title="Yeni Yorum"/>

        <TextInput
          label="Yorumunuz"
          value={commentText}
          onChangeText={commentText => setCommentText(commentText)}
        />

        <Button
          style={[mt4]}
          mode="contained"
          disabled={false}
          loading={false}
          dark
          color={'green'}
          onPress={() => shareComment()}
        >
          <Text>Yorumla</Text>
        </Button>
      </Card>
    </View>
  );
};

// Yeni yorum componenti export edildi
export default NewComment;
