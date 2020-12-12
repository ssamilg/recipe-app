import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const NewComment = ({ recipe }) => {
  const { py1, pa4, px2, py3 } = paddings;
  const { ma4, my0, mt4, mt6, mx1 } = margins;
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
        console.log('1');
        this.props.callback();
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
          style={[mt4, { flexGrow: 1, justifyContent: 'center', alignItems: 'center' }]}
          mode="contained"
          disabled={false}
          loading={false}
          dark
          color={'green'}
          onPress={() => shareComment()}
        >
          <Text>Yorumla</Text>
          {/* <CommunityIcon color="white" name="plus" size={20}/> */}
        </Button>
      </Card>
    </View>
  );
};

export default NewComment;

const styles = StyleSheet.create({});
