import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { paddings, margins } from '~/config/styles';
import firestore from '@react-native-firebase/firestore';

const LatestOrders = () => {
  const { py1, pa4, px2, py3 } = paddings;
  const { ma4, my0, mt4, mt6, mx1 } = margins;

  const fetchLatestRecipes = async () => {
    // const latestRecipes = await firestore()
    //   .collection('Recipes')
    //   .get();

    firestore()
      .collection('Recipes')
      .limit(5)
      .get()
      .then((documentSnapshot) => {
        console.log(documentSnapshot );
      });

  };

  return (
    <View>
      <Card
        style={[pa4, ma4]}
        onPress={() => fetchLatestRecipes()}
      >
        <Card.Cover
          style={{ height: 100, width: '100%', resizeMode: 'contain' }}
          source={{ uri: 'https://yemekchefs.com/wp-content/uploads/2020/02/%C4%B0SKENDEER.jpg' }}
        />
        <Card.Title title="Evde İskender" subtitle="Tarif detayı için tıklayınız..."/>
      </Card>
    </View>
  );
};

export default LatestOrders;

const styles = StyleSheet.create({});
