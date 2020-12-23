// Bu dosyada kullanilacak elementler import edildi 
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, TextInput, Button, Dialog, Portal } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const NewRecipe = ({ navigation }) => {
  // Local degiskenler tanimlandi
  const { pa3, pa4 } = paddings;
  const { ma4, mt4, ma1 } = margins;
  const [photoLink, setPhotoLink] = React.useState('');
  const [recipeTitle, setRecipeTitle] = React.useState('');
  const [recipeCategory, setRecipeCategory] = React.useState({ id: -1, name: 'Tarif kategorisi seçiniz' });
  const [recipeDetails, setRecipeDetails] = React.useState('');
  const { email, uid } = auth().currentUser._user;
  const [visible, setVisible] = React.useState(false);
  // Tarif categorisi listesi local olarak tanimlandi
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

  // Kategori secimi icin dialog methodlari
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // Kategori secimi yaptigimiz method
  const selectCategory = (category) => {
    setRecipeCategory(category);
    setVisible(false)
  };

  // Bilgisi girilen tarifi db'ye kaydeden method
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
    // Kategori secimi ekranindaki kategori listesi tasarimi
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
    // Yeni tarif ekrani tasarimi
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

// Yeni tarif ekrani export ediliyor
export default NewRecipe;
