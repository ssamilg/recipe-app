import React, { useState, useRef } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { Button, Card, TextInput, useTheme } from 'react-native-paper';
import { material } from 'react-native-typography';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import * as mainActions from '~/features/main/redux/actions';
import { LatestOrders } from '../components';
import styles from './styles';
import { paddings, margins } from '~/config/styles';

const windowWidth = Dimensions.get('window').width;
const orders = [
  //
];

export default function Home() {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { py1, py2, px2, py3 } = paddings;
  const { ma1, my0, mt4, mt6, mx1 } = margins;
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [entries, setEntries] = useState([
    {
      illustration: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
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
      <View style={[ma1, { borderRadius: 15, overflow: 'hidden' }]}>
        <Image
          style={{ height: 200, width: '100%', resizeMode: 'stretch' }}
          source={{
            uri: item.illustration,
          }}
        />
      </View>
    );
  };

  return (
    <View>
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
            label="Search restaurant or food"
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

      <View style={[mt4]}>
        <Text style={[mx1, material.display1]}>Latest Orders</Text>
        <LatestOrders orders={orders} />
      </View>
      <Button
        loading={loading}
        icon="logout"
        mode="outlined"
        onPress={onLogout}>
        Logout
      </Button>
    </View>
  );
}
