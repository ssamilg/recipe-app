import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';

const NewRecipe = () => {
  const { py1, pa4, px2, py3 } = paddings;
  const { ma4, my0, mt4, mt6, mx1 } = margins;
  const [recipe, setRecipe] = React.useState('');
  const [photoLink, setPhotoLink] = React.useState('');
  const [recipeTitle, setRecipeTitle] = React.useState('');

  const shareRecipe = () => {
    console.log(recipe);
    console.log(photoLink);
    console.log(recipeTitle);
  }

  return (
    <View>
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
            value={recipe}
            onChangeText={recipe => setRecipe(recipe)}
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
    </View>
  );
};

export default NewRecipe;

const styles = StyleSheet.create({});
