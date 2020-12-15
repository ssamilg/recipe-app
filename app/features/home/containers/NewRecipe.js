import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const NewRecipe = ({ navigation }) => {
  const { py1, pa4, px2, py3 } = paddings;
  const { ma4, my0, mt4, mt6, mx1 } = margins;
  const [photoLink, setPhotoLink] = React.useState('');
  const [recipeTitle, setRecipeTitle] = React.useState('');
  const [recipeDetails, setRecipeDetails] = React.useState('');
  const { email, uid } = auth().currentUser._user;

  const shareRecipe = () => {
    const newRecipe = {
      recipeTitle,
      photoLink,
      recipeDetails,
      dateCreated: new Date(),
      user: { uid, email },
      comments: [],
      likes: 0,
      usersLiked: [],
    };

    firestore()
      .collection('Recipes')
      .add(newRecipe)
      .then(() => {
        console.log('Recipe added!');
        navigation.navigate('Home')
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <ScrollView>
      <Card
        style={[pa4, ma4]}
      >
        <Card.Title title="Yeni Tarif"/>

        <TextInput
          label="Tarif Başlığı"
          value={recipeTitle}
          onChangeText={recipeTitle => setRecipeTitle(recipeTitle)}
        />

        <TextInput
          label="Fotoğraf Linki"
          value={photoLink}
          onChangeText={photoLink => setPhotoLink(photoLink)}
          style={[mt4]}
        />

        <TextInput
          label="Tarif Detayı"
          value={recipeDetails}
          onChangeText={recipeDetails => setRecipeDetails(recipeDetails)}
          numberOfLines={12}
          multiline
          style={[mt4]}
        />

        <Button
          style={[mt4, { flexGrow: 1, justifyContent: 'center', alignItems: 'center' }]}
          mode="contained"
          disabled={false}
          loading={false}
          dark
          color={'green'}
          onPress={() => shareRecipe()}
        >
          <Text>Tarifi Paylaş</Text>
          {/* <CommunityIcon color="white" name="plus" size={20}/> */}
        </Button>
      </Card>
    </ScrollView>
  );
};

export default NewRecipe;

const styles = StyleSheet.create({});
