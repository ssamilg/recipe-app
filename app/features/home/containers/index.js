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
const orders = [
  //
];

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { py1, py2, px2, py3 } = paddings;
  const { ma1, mb4, my0, mt4, mt6, mx1, my4 } = margins;
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [entries, setEntries] = useState([
    {
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
      illustration: 'https://yemekchefs.com/wp-content/uploads/2020/02/%C4%B0SKENDEER.jpg',
      title: 'Evde İskender Tarifi'
    },
    {
      illustration: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
      illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
    {
      illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
    {
      illustration: 'https://i.imgur.com/lceHsT6l.jpg',
    },
  ]);
  const [latestRecipes, setLatestRecipe] = React.useState([]);

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
    console.log();
    return (
      <>
        <View style={[ma1, { borderRadius: 15, overflow: 'hidden' }]}>
          <Image
            style={{ height: 200, width: '100%', resizeMode: 'stretch' }}
            source={{
              uri: item.illustration,
            }}
          />
        </View>
        <Text style={[ material.title ]}>
          { item.title }
        </Text>
      </>
    );
  };

  const fetchLatestRecipes = async () => {
    firestore()
      .collection('Recipes')
      .limit(5)
      .orderBy('dateCreated', 'desc')
      .get()
      .then((documentSnapshot) => {
        setLatestRecipe(documentSnapshot.docs.map(doc => doc._data));
      })
    };

  return (
    <ScrollView>
      <LinearGradient colors={['#BDBDBD', '#FFF']} style={[py2]}>
        <Carousel
          ref={carouselRef}
          data={entries}
          renderItem={RenderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth - 64}
          onSnapToItem={index => setActiveIndex(index)}
        />
        <Pagination
          dotsLength={entries.length}
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
        <Card style={[px2, py3]} theme={{ roundness: 0 }}>
          <TextInput
            label="Tariflerde ara..."
            right={
              <TextInput.Icon
                name="magnify"
                color={colors.primary}
                forceTextInputFocus={false}
              />
            }
            theme={{
              colors: { underlineColor: 'transparent' },
            }}
            style={{
              backgroundColor: 'white',
              borderBottomColor: 'white',
              viewStyle: {
                borderWidth: 0,
              },
              underlineColor: 'transparent',
            }}
            selectionColor="transparent"
            underlineColor="transparent"
            underlineColorAndroid={'rgba(0,0,0,0)'}
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
          <LatestRecipes latestRecipes={latestRecipes}/>
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
