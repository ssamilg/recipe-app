// Bu dosyada kullanilacak elementler import edildi 
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
import { useDispatch, useSelector } from 'react-redux';
import { refreshRecipe } from '~/features/main/redux/actions';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const LatestRecipes = (props) => {
  // Local degiskenler tanimlandi
  const dispatch = useDispatch();
  const { pa4 } = paddings;
  const { mx4, my2, mr1 } = margins;
  // Giris yapilan kullanici id'si cekildi
  let uid = '';
  if (auth().currentUser) {
    uid = auth().currentUser._user.uid;
  }

  // Tarif detayina gitmemizi saglayan navigasyon methodu
  const navigateToRecipeDetails = (recipe) => {
    dispatch(refreshRecipe(recipe));
    // Tarif detayi sayfasina secilen tarif objesini yolluyoruz
    props.navigation.navigate('RecipeDetails', {
      recipe,
    });
  };

  // Begenilen tarifi database'de guncelliyoruz.
  const likeRecipe = useCallback(
    (recipe) => {
      if (!isLiked(recipe)) {      
        firestore()
        .collection('Recipes')
        .doc(recipe.id)
        .update({
          // Begeni sayisini 1 artırıyor ve mevcut kullanici id'sini begenenler dizisine ekliyoruz
          likes: firestore.FieldValue.increment(1),
          usersLiked: firestore.FieldValue.arrayUnion(uid)
        })
        .then(() => {
          console.log('Recipe liked!');
          // Lokal degiskende de begenilenler sayisini 1 artırıyor
          recipe.likes += 1;
        })
        // Hata durumunu yakalamak icin yazdigimiz kod blogu
        .catch((err) => {
          console.log(err);
        });
      // Eger tarif begenildiyse begenmeyi kaldirmak icin yukaridaki islemlerin tersi yapiliyor
      } else if (isLiked(recipe)) {
        firestore()
        .collection('Recipes')
        .doc(recipe.id)
        .get()
          .then((querySnapshot) => {
            const tempArray = querySnapshot._data.usersLiked.filter(u => u !== uid);
    
            firestore()
            .collection('Recipes')
            .doc(recipe.id)
            .update({
              // Begeni sayisini 1 azaltiliyor ve mevcut kullanici id'si begenenler dizisinden kaldiriliyor
              usersLiked: tempArray,
              likes: firestore.FieldValue.increment(-1),
            })
              .then(() => {
                recipe.likes -= 1;
              });
          })
      }
    },
    []
  );
  
  // Tarifin begeniğ begenilmedigini kontrol ediyoruz
  const isLiked = useCallback(
    (recipe) => {
    if (recipe.usersLiked.find(u => u === uid)) {
      return true;
    }

    return false;
  }, [latestRecipeList]);

  // Son tarifler listesini dongu ile render ediyoruz
  const latestRecipeList = props.latestRecipes.map((recipe) => 
    // Tarif karti tasarimi
    <View key={recipe.recipeTitle}>
      <Card
        style={[pa4, mx4, my2]}
        onPress={() => navigateToRecipeDetails(recipe)}
      >
        <Card.Cover
          style={{ height: 100, width: '100%', resizeMode: 'contain' }}
          source={{ uri: recipe.photoLink }}
        />
        <Card.Title title={recipe.recipeTitle} subtitle="Tarif detayı için tıklayınız..."/>
        <View style={[mx4, { flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
          <CommunityIcon
            color="#E91E63"
            name={isLiked(recipe) ? "heart" : "heart-outline"}
            size={20}
            style={[mr1]}
            onPress={() => likeRecipe(recipe)}
          />
          <Text style={[mr1]}>{recipe.likes}</Text>
          <Text>Beğeni</Text>
        </View>
      </Card>
    </View>
  );
    
  return (
    // Son tarifler listesi render ediliyor
    <View>
      <View>{ latestRecipeList }</View>
    </View>
  );
};

// Component export ediliyor
export default LatestRecipes;