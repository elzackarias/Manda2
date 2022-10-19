import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import color from '@styles/colors';
import GLOBALS from '@globales/Globals';
import {mainStyles, loginStyles} from '@styles/styles';
import Counter from 'react-native-counters';
import AsyncStorage from '@react-native-community/async-storage';
var {height, width} = Dimensions.get('window');
var total, qty, price, tienda, prid;

export default class Producto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataProducto: [],
      dataSub: [],
      price: '',
      qty: '',
      cart: [],
      info: [],
    };
  }

  async componentDidMount() {
    try {
      const {navigation} = this.props;
      const response = await AsyncStorage.getItem('carrito');
      const response_data = await AsyncStorage.getItem('cart_info');
      //console.log(JSON.parse(response))
      this.setState({info: JSON.parse(response_data)});
      this.setState({cart: JSON.parse(response)});
      const ProductoID = JSON.stringify(navigation.getParam('id_prod'));
      prid = navigation.getParam('id_prod');
      prid = prid.replace(/['"]+/g, '');
      const TiendaID = navigation.getParam('id_tienda');
      tienda = TiendaID.replace(/['"]+/g, '');

      var url =
        GLOBALS.BASE_URL + 'api/api.php?type=consulta&que=producto&id_prod=';
      var link = url + ProductoID;
      return fetch(link.replace(/['"]+/g, ''))
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource: responseJson.datos,
            dataProducto: responseJson.datos,
            dataSub: responseJson.opciones,
            price: responseJson.datos.precio,
            qty: 1,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      alert(e);
    }
  }

  onChange(number, type) {
    this.setState({qty: number}, function () {});
  }

  addToCart(negocio, producto, cantidad, subtotal, nombre) {
    if (this.state.info.carrito == false) {
      this.state.cart.push({
        id: producto,
        nombre: nombre,
        qty: cantidad,
        subtotal: subtotal,
        negocio: negocio,
      });
      let n_cat = {carrito: true, qty: 1, negocio: negocio};
      this.setState({info: n_cat});
      AsyncStorage.setItem('carrito', JSON.stringify(this.state.cart));
      AsyncStorage.setItem('cart_info', JSON.stringify(n_cat));
      this.props.navigation.goBack();
    } else {
      let procedencia = this.state.info.negocio[0];
      if (negocio !== procedencia) {
        Alert.alert(
          'Ops..',
          'Solo puedes realizar un pedido por negocio, ¿Deseas borrar tu carrito del negocio anterior?',
          [
            {
              text: 'No',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Si',
              onPress: () =>
                this.borrarAnterior(
                  negocio,
                  producto,
                  cantidad,
                  subtotal,
                  nombre,
                ),
            },
          ],
        );
      } else {
        this.state.cart.push({
          id: producto,
          nombre: nombre,
          qty: this.state.qty,
          subtotal: subtotal,
          negocio: negocio,
        });
        AsyncStorage.setItem('carrito', JSON.stringify(this.state.cart));
        let cantidad = this.state.info.qty + 1;
        let n_cat = {carrito: true, qty: cantidad, negocio: negocio};
        this.setState({info: n_cat});
        AsyncStorage.setItem('cart_info', JSON.stringify(n_cat));
        this.props.navigation.goBack();
      }
    }
  }

  borrarAnterior(negocio, producto, cantidad, subtotal, nombre) {
    this.setState({cart: []});
    this.state.cart.push({
      id: producto,
      nombre: nombre,
      qty: this.state.qty,
      subtotal: subtotal,
      negocio: negocio,
    });
    let xd = {carrito: true, qty: 1, negocio: negocio};
    AsyncStorage.setItem('cart_info', JSON.stringify(xd));
    AsyncStorage.setItem('carrito', JSON.stringify(this.state.cart));
    this.props.navigation.goBack();
  }

  render() {
    total = parseInt(this.state.dataProducto.precio * this.state.qty);
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
      <View style={{backgroundColor: color.WHITE, flex: 1}}>
        <View style={{marginBottom: -49}}>
          <Image
            source={require('@recursos/images/banner-1.jpg')}
            resizeMode="contain"
            style={{
              width: width,
              height: 320,
              alignContent: 'center',
              borderRadius: 16,
              marginTop: -105,
            }}
          />
          <TouchableOpacity
            style={{position: 'absolute'}}
            onPress={() => this.props.navigation.goBack()}>
            <Icon
              name="arrow-back-outline"
              size={30}
              color={color.AZUL}
              style={{
                marginTop: 10,
                marginLeft: 10,
                backgroundColor: color.WHITE,
                borderRadius: 50,
                height: 37,
                width: 37,
                textAlign: 'center',
                textAlignVertical: 'center',
                borderWidth: 1.5,
                borderColor: '#00000075',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingRight: 20, paddingLeft: 20, marginTop: 12}}>
          <Text
            style={[
              mainStyles.titleNegocio,
              {marginTop: 5, fontSize: 20, textAlign: 'center'},
            ]}>
            {this.state.dataProducto.nombre}
          </Text>
          <Text
            style={[mainStyles.precio, {textAlign: 'center', marginTop: -5}]}>
            ${this.state.dataProducto.precio}.00 c/u
          </Text>
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Counter
              start={1}
              min={1}
              max={20}
              onChange={this.onChange.bind(this)}
              countTextStyle={{fontSize: 25}}
              buttonTextStyle={{fontSize: 28, color: color.WHITE}}
              buttonStyle={{
                backgroundColor: color.AZUL,
                borderRadius: 50,
                width: 20,
                height: 20,
                borderColor: color.AZUL,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            marginTop: 20,
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            width: width - 50,
            height: 70,
          }}
          onPress={() =>
            this.addToCart(
              tienda,
              prid,
              this.state.qty,
              total,
              this.state.dataProducto.nombre,
            )
          }>
          <View
            style={[
              mainStyles.btnMain,
              {
                marginTop: 20,
                alignContent: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                width: width - 50,
                height: 70,
                borderRadius: 50,
              },
            ]}>
            <Text style={[mainStyles.btntxt, {fontSize: 18}]}>
              Agregar al carrito ${total}.00
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
