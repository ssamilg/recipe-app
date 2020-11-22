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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { ma2, my2, my1 } = margins;

  const register = () => {
    if (!credentials.email || !credentials.password) {
      return setErrorMessage('Email and password fields are required');
    }

    setLoading(true);

    dispatch(registerThunk(credentials.email, credentials.password))
      .then(() => {
        dispatch(setIsNewUser(true));
      })
      .catch(error => {
        if (error.code === 'auth/email-already-ın-use') {
          setErrorMessage('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          setErrorMessage('That email address is invalid!');
        } else if (error.code === 'auth/weak-password') {
          setErrorMessage('Password should be at least 6 characters');
        } else {
          setErrorMessage(error.userInfo.message);
        }
      });

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={[ma2, styles.container]}>
        <Card style={styles.cardWrapper}>
          <Image
            source={require('~/assets/fast-food.png')}
            style={styles.cardHeaderImage}
          />
          <Card.Content>
            <View style={{ alignItems: 'center' }}>
              <Text style={[my2, material.display1]}>Order Man</Text>
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
              label="Password"
              value={credentials.password}
              secureTextEntry
              required
              onChangeText={password =>
                setCredentials({ ...credentials, password })
              }
            />

            <Button
              loading={loading}
              style={my1}
              mode="contained"
              disabled={loading}
              onPress={() => register()}>
              Register
            </Button>
            <Button style={my1} onPress={() => navigation.navigate('Login')}>
              Login
            </Button>
          </Card.Content>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
