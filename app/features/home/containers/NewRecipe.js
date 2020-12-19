import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card, TextInput, Button, Dialog, Portal } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { color } from 'react-native-reanimated';

const NewRecipe = ({ navigation }) => {
  const { pa3, pa4, px2, py3 } = paddings;
  const { ma4, my0, mt4, mt6, ma1 } = margins;
  const [photoLink, setPhotoLink] = React.useState('');
  const [recipeTitle, setRecipeTitle] = React.useState('');
  const [recipeCategory, setRecipeCategory] = React.useState({ id: -1, name: 'Tarif kategorisi seçiniz' });
  const [recipeDetails, setRecipeDetails] = React.useState('');
  const { email, uid } = auth().currentUser._user;
  const [visible, setVisible] = React.useState(false);
  const [recipeCategoryList, setRecipeCategoryList] = React.useState([
    {
      id: 0,
      name: 'Çorba',
    },
    {
      id: 1,
      name: 'Ana Yemek',
    },
    {
      id: 2,
      name: 'Yan Yemek',
    },
    {
      id: 3,
      name: 'Tatlı',
    },
  ]);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const selectCategory = (category) => {
    setRecipeCategory(category);
    setVisible(false)
  };

  const shareRecipe = () => {
    const newRecipe = {
      photoLink,
      recipeTitle,
      recipeDetails,
      recipeCategory,
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

  const recipeCategories = recipeCategoryList.map(category => 
    <View
      key={category.id}
    >
      <Text
        onPress={() => selectCategory(category)}
        style={[ pa3, ma1, {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#e0e0e0',
          borderBottomColor: '#BDBDBD',
        }]}
      >
        { category.name }
      </Text>
    </View>
  );

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

        <View>
          <Text
            onPress={showDialog}
            style={[ mt4, pa4, {
              color: 'gray',
              borderWidth: 1,
              borderStyle: 'solid',
              borderBottomWidth: 2,
              borderColor: '#e0e0e0',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              backgroundColor: '#e0e0e0',
              borderBottomColor: '#BDBDBD',
            }]}
          >
            {recipeCategory.name}
          </Text>

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Kategori seçiniz.</Dialog.Title>

              { recipeCategories }
              
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>

        <TextInput
          label="Tarif Detayı"
          value={recipeDetails}
          onChangeText={recipeDetails => setRecipeDetails(recipeDetails)}
          numberOfLines={10}
          multiline
          style={[mt4]}
        />

        <Button
          style={[mt4]}
          mode="contained"
          disabled={false}
          loading={false}
          dark
          color={'green'}
          onPress={() => shareRecipe()}
        >
          <Text>Tarifi Paylaş</Text>
        </Button>
      </Card>
    </ScrollView>
  );
};

export default NewRecipe;

const styles = StyleSheet.create({});
