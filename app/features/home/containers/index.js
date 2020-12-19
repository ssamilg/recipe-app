import React, { useState, useRef } from 'react';
import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import { Button, Card, TextInput, useTheme } from 'react-native-paper';
import { material } from 'react-native-typography';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import * as mainActions from '~/features/main/redux/actions';
import { LatestRecipes } from '../components';
import styles from './styles';
import { paddings, margins } from '~/config/styles';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { py1, pt2, pa2 } = paddings;
  const { ma1, ma2, my0, mx2, mt6, mx1, my4, ml1 } = margins;
  const [loading, setLoading] = useState(false);
  const [latestRecipes, setLatestRecipe] = React.useState([]);
  fetchLatestRecipes();

  const onLogout = () => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => {
        dispatch(mainActions.logout);
        setLoading(false);
      });
  };

  async function fetchLatestRecipes() {
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
        
      })
      .finally(() => {
        // fetchTodaysRecipe();
      });
      

  };

  const props = {
    latestRecipes,
    navigation,
  };

  return (
    <ScrollView>
      <View>
        <Card style={[pa2, ma2, { borderWidth: 2, borderColor: '#F48FB1', borderStyle: 'solid' } ]}>
          <Card.Title title="Günün Menüsü" subtitle="Afiyet Olsun..."/>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <CommunityIcon color="black" name="label" size={20}/>
              <Text style={[ml1]}>lul</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <CommunityIcon color="black" name="label" size={20}/>
              <Text style={[ml1]}>lel</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <CommunityIcon color="black" name="label" size={20}/>
              <Text style={[ml1]}>lol</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <CommunityIcon color="black" name="label" size={20}/>
              <Text style={[ml1]}>lil</Text>
            </View>
          {/* <Card.Cover
            style={{ height: 100, width: '100%', resizeMode: 'contain' }}
            source={{ uri: todaysRecipe.photoLink }}
          /> */}
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
        Logout
      </Button>
    </ScrollView>
  );
}
