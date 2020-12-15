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

const windowWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { py1, pt2, pa2 } = paddings;
  const { ma1, ma2, my0, mt4, mt6, mx1, my4 } = margins;
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [entries, setEntries] = React.useState([]);
  const [latestRecipes, setLatestRecipe] = React.useState([]);
  const [todaysRecipe, setTodaysRecipe] = React.useState([]);
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

  const RenderItem = ({ item }) => {
    return (
      <>
        <View style={[ma1, { borderRadius: 15, overflow: 'hidden' }]}>
          <Image
            style={{ height: 200, width: '100%', resizeMode: 'stretch' }}
            source={{
              uri: item.photoLink,
            }}
          />
        </View>

        <View style={[ma1, { flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
          <Text style={[ material.title ]}>
            { item.recipeTitle }
          </Text>
        </View>
      </>
    );
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
        // const slider = tempArray.map((item) => {
        //   const newItem = {
        //     title: item.recipeTitle,
        //     photo: item.photoLink,
        //   }

        //   return newItem;
        // });

        // setEntries(slider);
      })
      .finally(() => {
        fetchTodaysRecipe();
      });
  };

  async function fetchTodaysRecipe() {
    firestore()
      .collection('Recipes')
      .limit(1)
      .orderBy('likes', 'desc')
      .get()
      .then((querySnapshot ) => {
        querySnapshot.forEach(documentSnapshot => {
          const recipe = {
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          }

          setTodaysRecipe(recipe);
        });
      })
  };
  
  const props = {
    latestRecipes,
    navigation,
  };

  return (
    <ScrollView>
      <LinearGradient colors={['#BDBDBD', '#FFF']} style={[pt2]}>
        <Carousel
          ref={carouselRef}
          data={latestRecipes}
          renderItem={RenderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth - 64}
          onSnapToItem={index => setActiveIndex(index)}
        />
        <Pagination
          dotsLength={latestRecipes.length}
          activeDotIndex={activeIndex}
          containerStyle={[py1, my0]}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
            backgroundColor: '#212121',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </LinearGradient>

      <View style={[mt6]}>
        <Card style={[pa2, ma2, { borderWidth: 2, borderColor: '#F48FB1', borderStyle: 'solid' } ]}>
          <Card.Title title="Günün Tarifi" subtitle={todaysRecipe.recipeTitle}/>
          <Card.Cover
            style={{ height: 100, width: '100%', resizeMode: 'contain' }}
            source={{ uri: todaysRecipe.photoLink }}
          />
        </Card>
      </View>

      <View
        style={
            [mt4], {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#ff0000',
            borderStyle:'solid'
          }}>
        <Button
          style={[mx1, { flexGrow: 1, justifyContent: 'center', alignItems: 'center' }]}
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
      </View>

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
