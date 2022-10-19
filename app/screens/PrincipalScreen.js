import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {mainStyles} from '@styles/styles';
import color from '@styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import {UsuarioContext} from '@context/UsuarioContext';
import Swiper from 'react-native-swiper';
import GLOBALS from '@globales/Globals'; 
var {height, width} = Dimensions.get('window');

export default function PrincipalScreen(props) {
  const [login, loginAction] = useContext(UsuarioContext);
  const [tk, setTk] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataBanner, setDataBanner] = useState([]);
  const [dataNegocios, setDataNegocios] = useState([]);
  const [dataCategorias, setDataCategorias] = useState([]);

  useEffect(() => {
    messaging()
      .getToken()
      .then((token) => {
        setTk(token);
      });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(
        'Message handled in the background!',
        JSON.stringify(remoteMessage),
      );
    });

    const fondo = messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        console.log(
          'Message handled in the background!',
          JSON.stringify(remoteMessage),
        );
      },
    );

    const url = GLOBALS.BASE_URL + 'api/main_screen.php?type=main';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setDataBanner(responseJson.banner);
        setDataNegocios(responseJson.descubrir);
        setDataCategorias(responseJson.categorias);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    //console.log(dataBanner)
    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 21,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <ActivityIndicator
          size="large"
          color={color.AZUL}
          style={{height: 100}}
        />
      </View>
    );
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Aqui incia el Swiper de los banners de promocion */}
      <Swiper
        style={{height: width / 2}}
        showsButtons={true}
        autoplay={true}
        autoplayTimeout={4}>
        {dataBanner.map((itembann) => {
          return (
            <Image
              key={itembann}
              style={styles.imageBanner}
              resizeMode="cover"
              source={{uri: itembann}}
            />
          );
        })}
      </Swiper>

      <View>
        <Text style={styles.subtitulo}>
          <Icon
            name="ios-navigate-outline"
            size={18}
            style={{color: color.AZUL, textAlignVertical: 'center'}}
          />{' '}
          Descubrir: 
        </Text>
        <View
          style={{
            backgroundColor: color.AZUL_BAJO,
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          <ScrollView horizontal={true}>
            {dataNegocios.map((negocio, index) => (
              <TouchableOpacity
                style={{marginLeft: 10}}
                key={index}
                onPress={() => {
                  props.navigation.navigate('Negocio', {id: negocio.id});
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: '#1877f2',
                    width: 180,
                    height: 130,
                    marginRight: 10,
                    borderRadius: 12,
                  }}>
                  <Image
                    source={{uri: negocio.banner}}
                    resizeMode="cover"
                    style={{
                      width: 180,
                      height: 100,
                      alignContent: 'center',
                      borderRadius: 12,
                    }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      textAlignVertical: 'center',
                      color: color.WHITE,
                      fontFamily: 'Oxygen-Bold',
                      marginTop: 5,
                    }}>
                    {negocio.nombre}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            {/*<Category imageUri={require('@recursos/images/recargas.png')} flex={4} color="#fff" name="Recargas" />
                        <Category imageUri={require('@recursos/images/oxxo2.png')} flex={20} color="#c22520" name="" />
                        <Category imageUri={require('@recursos/images/venancio-1.jpg')} flex={4} name="Hola" /> */}
          </ScrollView>
        </View>
        <Text style={styles.subtitulo}>
          <Icon
            name="ios-fast-food-outline"
            size={19}
            style={{color: color.AZUL, textAlignVertical: 'center'}}
          />{' '}
          Categorías:
        </Text>
        <View style={{paddingTop: 2}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {dataCategorias.map((categoria, index) => (
              <TouchableOpacity
                key={index}
                style={{marginLeft: 10}}
                onPress={() => {
                  props.navigation.navigate('Categoria', {
                    id: categoria.id,
                    nombre: categoria.nombre,
                  });
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                    marginRight: 7,
                  }}>
                  <Image
                    source={{uri: categoria.icono}}
                    resizeMode="contain"
                    style={{
                      width: 82,
                      height: 82,
                      alignContent: 'center',
                      borderRadius: 12,
                    }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      textAlignVertical: 'center',
                      color: '#444444',
                      fontFamily: 'Oxygen-Bold',
                    }}>
                    {categoria.nombre}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageBanner: {
    height: width / 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
  },
  subtitulo: {
    fontFamily: 'Oxygen-Regular',
    color: 'black',
    fontSize: 16,
    textAlignVertical: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 3,
  },
});
