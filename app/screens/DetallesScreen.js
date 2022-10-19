import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import GLOBALS from '@globales/Globals';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import color from '@styles/colors';
import {mainStyles, loginStyles} from '@styles/styles';
var {height, width} = Dimensions.get('window');
const latitudeDelta = 0.00156;
const longitudeDelta = 0.0017;

export default class Detalles extends Component {
  constructor(props) {
    super(props);
    //cambiar isLoading por true
    this.state = {
      isLoading: true,
      dataPedido: [],
      usuario: [],
      ID: '',
      region: {},
    };
  }
  async componentDidMount() {
    const {navigation} = this.props;
    const ID_PEDIDO = navigation.getParam('id');
    const usuario = await AsyncStorage.getItem('@usuario:key');
    this.setState({usuario: JSON.parse(usuario), ID: ID_PEDIDO});

    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        id_pedido: ID_PEDIDO,
        id_user: this.state.usuario.id,
      }),
    };

    try {
      const fetchResponse = await fetch(
        GLOBALS.BASE_URL + 'api/api.php?type=consulta&que=detalles_pedido',
        settings,
      );
      const fetchCoords = await fetch(
        GLOBALS.BASE_URL + 'api/position.php?type=consulta&que=coords_initial',
        settings,
      );
      const data = await fetchResponse.json();
      const dataCoords = await fetchCoords.json();
      if (
        data.estado === 'Preparando' ||
        data.estado === 'Enviado' ||
        data.estado === 'Listo'
      ) {
        this.setState({
          dataPedido: data,
          region: {
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
            latitude: parseFloat(data.coords_neg.lat),
            longitude: parseFloat(data.coords_neg.lon),
          },
          isLoading: false,
        });
      } else if (data.estado === 'Encamino') {
        this.setState({
          dataPedido: data,
          region: {
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
            latitude: parseFloat(dataCoords.lat),
            longitude: parseFloat(dataCoords.lon),
          },
          isLoading: false,
        });
        this._interval = setInterval(() => {
          this.updateCoords();
        }, 5000);
      } else {
        this.setState({
          dataPedido: data,
          region: {
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
            latitude: parseFloat(data.coords_user.lat),
            longitude: parseFloat(data.coords_user.lon),
          },
          isLoading: false,
        });
      }
    } catch (e) {
      alert(e);
    }
  }

  async updateCoords() {
    console.log('Rastreandoo siiii');
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        repartidor: this.state.dataPedido.repartidor,
      }),
    };

    try {
      const fetchResponse = await fetch(
        GLOBALS.BASE_URL + 'api/position.php?type=consulta&que=coords',
        settings,
      );
      const data = await fetchResponse.json();
      if (data.status == 'ERROR') {
        alert('Error');
        this.props.navigation.goBack();
      } else {
        this.setState({
          region: {
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
            latitude: parseFloat(data.lat),
            longitude: parseFloat(data.lon),
          },
        });
      }
    } catch (error) {
      alert(error);
      this.props.navigation.goBack();
    }
  }

  componentWillUnmount() {
    if (this.state.dataPedido.estado == 'Encamino') {
      console.log('morido x_x');
      clearInterval(this._interval);
    }
  }

  render() {
    if (this.state.isLoading) {
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
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <View style={styles.cardShadow}>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={{position: 'absolute', left: 0}}
              onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="arrow-back-outline"
                size={30}
                color={color.WHITE}
                style={{
                  marginLeft: 10,
                  backgroundColor: color.AZUL,
                  borderRadius: 50,
                  height: 37,
                  width: 37,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}
              />
            </TouchableOpacity>
            <Text style={styles.tecsto}>Detalles</Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: height / 4 - 10,
            paddingLeft: 14,
            paddingRight: 14,
          }}>
          <MapView
            showsPointsOfInterest={false}
            zoomEnabled={false}
            scrollEnabled={false}
            showsCompass={false}
            rotateEnabled={false}
            provider={PROVIDER_GOOGLE}
            customMapStyle={[
              {
                featureType: 'administrative',
                elementType: 'geometry',
                stylers: [
                  {
                    visibility: 'off',
                  },
                ],
              },
              {
                featureType: 'poi',
                stylers: [
                  {
                    visibility: 'off',
                  },
                ],
              },
              {
                featureType: 'road',
                elementType: 'labels.icon',
                stylers: [
                  {
                    visibility: 'off',
                  },
                ],
              },
              {
                featureType: 'transit',
                stylers: [
                  {
                    visibility: 'off',
                  },
                ],
              },
            ]}
            style={[styles.map, {width: '100%', height: '100%'}]}
            region={this.state.region}>
            <Marker
              coordinate={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
              }}>
              <Image
                source={require('@recursos/images/marker-1.png')}
                style={{width: 55, height: 55}}
              />
            </Marker>
          </MapView>
        </View>
        <ScrollView style={{paddingLeft: 14, paddingRight: 14}}>
          <View
            style={{
              backgroundColor: '#cff0ff',
              borderBottomRightRadius: 12,
              borderBottomLeftRadius: 12,
              padding: 5,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: color.BLUE3,
                fontFamily: 'Oxygen-Bold',
                fontSize: 16.5,
              }}>
              {this.state.dataPedido.n_negocio}
            </Text>
          </View>
          <View>
            <Text>{this.state.dataPedido.titulo}</Text>
            <Text>${this.state.dataPedido.total}.00</Text>
          </View>
          <View>
            <Text>Recibido | {this.state.dataPedido.recibido}</Text>
            {this.state.dataPedido.preparando != null ? (
              <Text>Preparando | {this.state.dataPedido.preparando}</Text>
            ) : (
              <></>
            )}
            {this.state.dataPedido.listo2entrega != null ? (
              <Text>
                Listo para entrega | {this.state.dataPedido.listo2entrega}
              </Text>
            ) : (
              <></>
            )}
            {this.state.dataPedido.encamino != null ? (
              <Text>En camino | {this.state.dataPedido.encamino}</Text>
            ) : (
              <></>
            )}
            {this.state.dataPedido.entregado != null ? (
              <Text>Entregado | {this.state.dataPedido.entregado}</Text>
            ) : (
              <></>
            )}
          </View>
          {this.state.dataPedido.repartidor != null ? (
            <View>
              <Text>Repartidor:</Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image
                  resizeMode="contain"
                  style={{width: 45, height: 45, borderRadius: 20}}
                  source={{uri: this.state.dataPedido.pic}}
                />
                <Text style={{textAlignVertical: 'center'}}>
                  {' '}
                  {this.state.dataPedido.n_repa}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
          <View>
            <Text>Productos</Text>
            {this.state.dataPedido.productos.map((producto, index) => (
              <View style={{flexDirection: 'row'}} key={index}>
                <Text>{producto.cantidad} x </Text>
                <Text>{producto.nombre}</Text>
                <Text style={{right: 0, position: 'absolute'}}>
                  ${producto.subtotal}.00
                </Text>
              </View>
            ))}
          </View>
          <View>
            <Text>Pago</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>Método de pago:</Text>
              <Text style={{right: 0, position: 'absolute'}}>Efectivo</Text>
            </View>
          </View>
          <Text style={{textAlign: 'center', color: '#555'}}>
            ID Pedido: {'\n' + this.state.ID}
          </Text>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardShadow: {
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
  },
  tecsto: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 20,
    color: color.AZUL,
  },
  btnAzul: {
    backgroundColor: color.BLUE,
    borderColor: color.BLUE,
    width: '100%',
    padding: 6,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 2,
    bottom: 0,
    marginBottom: 35,
  },
});
