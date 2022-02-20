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
  const dispatch = useDispatch();
  const { pa4 } = paddings;
  const { ma4, mt4 } = margins;
  const [commentText, setCommentText] = React.useState('');
  const { email, uid } = auth().currentUser._user;

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
        dispatch(refreshRecipeById(recipe.id))
          .then((recipe) => {
            dispatch(refreshRecipe(recipe._data));
          });
      });
  }

  return (
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

export default NewComment;
