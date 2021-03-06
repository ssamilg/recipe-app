import React, { useState } from 'react';
import { View, Image, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Card, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../redux/thunkActions';
import styles from './styles';
import { margins } from '~/config/styles';
import { material } from 'react-native-typography';

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [loginProcessing, setLoginProcessing] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { ma2, my2, my1 } = margins;

  const login = async () => {
    if (!credentials.email || !credentials.password) {
      return setErrorMessage('Email ve sifre alanlari zorunludur');
    }

    setLoginProcessing(true);

    dispatch(loginThunk(credentials.email, credentials.password))
      .then(() => {
        setLoginProcessing(false);
      })
      .catch(error => {
        console.log(error);
        if (error) {
          setErrorMessage('E-mail ya da şifre yanlış !');
          setLoginProcessing(false);
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.flex}>
      <View style={[ma2, styles.container]}>
        <Card style={styles.cardWrapper}>
          <Image
            source={require('~/assets/chef-hat.png')}
            style={styles.cardHeaderImage}
          />
          <Card.Content>
            <View style={{ alignItems: 'center' }}>
              <Text style={[my2, material.display1]}>Tariflerim</Text>
              <Text style={[material.body2, styles.errorText]}>
                {errorMessage}
              </Text>
            </View>

            <TextInput
              style={[my1, { flexDrection: 'row' }]}
              mode="outlined"
              label="E-Mail"
              value={credentials.email}
              onChangeText={email => setCredentials({ ...credentials, email })}
            />

            <TextInput
              style={[my1, { flexDrection: 'row' }]}
              mode="outlined"
              label="Şifre"
              value={credentials.password}
              secureTextEntry
              onChangeText={password =>
                setCredentials({ ...credentials, password })
              }
            />

            <Button
              loading={loginProcessing}
              disabled={loginProcessing}
              style={my1}
              mode="contained"
              onPress={() => login()}>
              Giriş Yap
            </Button>

            <Button style={my1} onPress={() => navigation.navigate('Register')}>
              Kayıt Ol
            </Button>
          </Card.Content>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
