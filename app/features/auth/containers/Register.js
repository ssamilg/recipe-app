// Bu dosyada kullanilacak elementler import edildi 
import React, { useState } from 'react';
import { View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { GpTextInput } from '~/components';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../redux/thunkActions';
import { setIsNewUser } from '~/features/main/redux/actions';
import styles from './styles';
import { margins } from '~/config/styles';
import { material } from 'react-native-typography';

export default function Register({ navigation }) {
  // Local degiskenler tanimlandi
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // Registerda kullanilacak form bilgileri bu degiskende tutulacak
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
  });
  const { ma2, my2, my1 } = margins;

  // Register methodu yazildi
  const register = () => {
    // Form bilgisi kontrol ediliyor
    if (!credentials.email || !credentials.password) {
      return setErrorMessage('Email ve sifre alanlari zorunludur');
    }

    // Register islemi icin loader degiskenini baslattik
    setLoading(true);

    // Dispatch kullanarak thunkActions dosyasinda tanimladigimiz method ile register islemi yaptik
    dispatch(registerThunk(credentials.email, credentials.password))
      .then(() => {
        // Yine dispatch kullanarak yeni kullaniciyi kaydedecek methodu calistirdik
        dispatch(setIsNewUser(true));
      })
      .catch(error => {
        // Hata durumlarini kontrol edip hataya gore mesaj yazdirdik
        if (error.code === 'auth/email-already-ın-use') {
          setErrorMessage('Email adresi zaten kullanılıyor');
        } else if (error.code === 'auth/invalid-email') {
          setErrorMessage('Email adresi yanlış !');
        } else if (error.code === 'auth/weak-password') {
          setErrorMessage('Şifre en az 6 karakter olmalı');
        } else {
          setErrorMessage(error.userInfo.message);
        }
      });

    // Register islemi icin loader degiskenini durdurduk
    setLoading(false);
  };

  return (
    // Register sayfasi tasarimi
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={[ma2, styles.container]}>
        <Card style={styles.cardWrapper}>
          <Image
            source={require('~/assets/chef-hat.png')}
            style={styles.cardHeaderImage}
          />
          <Card.Content>
            <View style={{ alignItems: 'center' }}>
              {/* <Text style={[my2, material.display1]}>Tariflerim</Text> */}
              <Text style={[material.body2, styles.errorText]}>
                {errorMessage}
              </Text>
            </View>

            <GpTextInput
              style={[my1]}
              mode="outlined"
              label="E-Mail"
              value={credentials.email}
              required
              onChangeText={email => setCredentials({ ...credentials, email })}
            />

            <GpTextInput
              style={[my1]}
              mode="outlined"
              label="Şifre"
              value={credentials.password}
              secureTextEntry
              required
              onChangeText={password =>
                setCredentials({ ...credentials, password })
              }
            />

            <GpTextInput
              style={[my1]}
              mode="outlined"
              label="İsim"
              value={userData.name}
              required
              onChangeText={name =>
                setUserData({ ...userData, name })
              }
            />

            <GpTextInput
              style={[my1]}
              mode="outlined"
              label="Soyisim"
              value={userData.surname}
              required
              onChangeText={surname =>
                setUserData({ ...userData, surname })
              }
            />

            <Button
              loading={loading}
              style={my1}
              mode="contained"
              disabled={loading}
              onPress={() => register()}>
              Kayıt Ol
            </Button>
            <Button style={my1} onPress={() => navigation.navigate('Login')}>
              Giriş Yap
            </Button>
          </Card.Content>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
