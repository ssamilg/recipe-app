// Bu dosyada kullanilacak elementler import edildi 
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Card, useTheme } from 'react-native-paper';
import { material } from 'react-native-typography';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import * as mainActions from '~/features/main/redux/actions';
import { LatestRecipes } from '../components';
import { paddings, margins } from '~/config/styles';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

export default function Home({ navigation }) {
  // Local degiskenler tanimlandi
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { pa2 } = paddings;
  const { ma2, mx2, mx1, my4, ml1 } = margins;
  const [loading, setLoading] = useState(false);
  const [isNewDay, setIsNewDay] = useState(false);
  const [latestRecipes, setLatestRecipe] = React.useState([]);
  const [todaysMenu, setTodaysMenu] = React.useState([]);

  useEffect(() => {
    createTodaysMenu();
    fetchLatestRecipes();
  }, [fetchLatestRecipes, createTodaysMenu])

  // Logout methodu yazildi
  const onLogout = () => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => {
        dispatch(mainActions.logout);
        setLoading(false);
      });
  };

  // Son tarifleri cektigimiz method yazildi
  const fetchLatestRecipes = useCallback(
    () => {
      firestore()
        .collection('Recipes')
        .limit(10)
        .orderBy('dateCreated', 'desc')
        .get()
        .then((querySnapshot ) => {
    
          const tempArray = [];
  
          querySnapshot.forEach(documentSnapshot => {
            const recipe = {
              id: documentSnapshot.id,
              ...documentSnapshot.data(),
            }
  
            tempArray.push(recipe);
          });
  
          setLatestRecipe(tempArray);
          
        });
    },
    [],
  );

  // Gunun menusunu olusturdugumuz method yazildi
  const createTodaysMenu = useCallback(
    () => {
      checkTheDay();
      if (isNewDay) {
        const todaysMenuTemplate = {
          soup: '',
          mainMeal: '',
          sideMeal: '',
          dessert: '',
          date: new Date(),
        };

        Object.keys(todaysMenuTemplate).forEach((key, index) => {        
          firestore()
            .collection('Recipes')
            .where('recipeCategory.id', '==', index)
            .limit(5)
            .get()
            .then((querySnapshot ) => {
        
              const tempArray = [];
      
              querySnapshot.forEach((documentSnapshot) => {
                const recipe = documentSnapshot.data().recipeTitle;
                tempArray.push(recipe);
              });
              
              const randomIndex = Math.floor(Math.random() * tempArray.length);
              todaysMenuTemplate[key] = tempArray[randomIndex];

              if (todaysMenuTemplate.dessert !== '') {
                setTodaysMenu(todaysMenuTemplate);
                updateTodaysMenu(todaysMenuTemplate);
              }
            });
        });
      }
    },
    [todaysMenu],
  );
  
  // Gunu kontrol icin method yazildi
  const checkTheDay = useCallback(
    () => {
      let lastMenu = {};

      firestore()
        .collection('Menus')
        .limit(1)
        .orderBy('date', 'desc')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            if (documentSnapshot.data()) {
              setTodaysMenu(documentSnapshot.data());
            }
            
            lastMenu = documentSnapshot.data();
          });
          setIsNewDay(new Date().getDay() > lastMenu.date.toDate().getDay());
        })
    },
    [],
  );

  // Gunun menusun guncellendigi method yazildi
  const updateTodaysMenu = useCallback(
    (todaysMenuTemplate) => {
      firestore()
        .collection('Menus')
        .add(todaysMenuTemplate)
        .then(() => {
          console.log('Menu updated');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [],
  );

  const props = {
    latestRecipes,
    navigation,
  };

  return (
    // Anasayfa tasarimi
    <ScrollView>
      <View>
        <Card style={[pa2, ma2, { borderWidth: 2, borderColor: '#F48FB1', borderStyle: 'solid' } ]}>
          <Card.Title title="Günün Menüsü" subtitle="Afiyet Olsun..."/>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <CommunityIcon color="black" name="food-variant" size={20}/>
              <Text style={[ml1]}>{ todaysMenu.soup }</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <CommunityIcon color="black" name="food" size={20}/>
              <Text style={[ml1]}>{ todaysMenu.mainMeal }</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <CommunityIcon color="black" name="food-apple" size={20}/>
              <Text style={[ml1]}>{ todaysMenu.sideMeal }</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <CommunityIcon color="black" name="food-croissant" size={20}/>
              <Text style={[ml1]}>{ todaysMenu.dessert }</Text>
            </View>
        </Card>
      </View>

      <Button
        style={[mx2]}
        onPress={() => { navigation.navigate('NewRecipe') }}
        mode="contained"
        disabled={false}
        loading={false}
        dark
        color={colors.notification}
      >
        <Text style={material.body2WhiteObject}>Tarif Paylaş </Text>
        <CommunityIcon color="white" name="plus" size={20}/>
      </Button>

      <View style={[my4]}>
        <View style={[mx1, { flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
          <Text style={[mx1, material.display1, { flexGrow: 1 }]}>Beğenilen Tarifler</Text>
          <CommunityIcon
            color="black"
            name="refresh"
            size={28}
            style={[mx1]}
            onPress={() => fetchLatestRecipes()}
          />
        </View>

        <View>
          <LatestRecipes {...props}/>
        </View>
      </View>

      <Button
        loading={loading}
        icon="logout"
        mode="outlined"
        onPress={onLogout}>
        Çıkış Yap
      </Button>
    </ScrollView>
  );
}
