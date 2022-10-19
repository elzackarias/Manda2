import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import GLOBALS from '@globales/Globals';
import color from '@styles/colors'
import { mainStyles } from '@styles/styles'

export default class OrdenesProceso extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, dataOrdenes: [], usuario: [] };
  }

  async componentDidMount() {

    const usuario = await AsyncStorage.getItem("@usuario:key")
    this.setState({ usuario: JSON.parse(usuario) });

    const settings = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        dataUser: this.state.usuario,
      })
    };

    try {
      //AQUI SE VA A CONECTAR CON LA API PARA OBTENER LAS ORDENES DEL USUARIO
      const fetchResponse = await fetch(GLOBALS.BASE_URL + 'api/api.php?type=consulta&que=ordenes_proceso', settings);
      const data = await fetchResponse.json();
      this.setState({ dataOrdenes: data, isLoading: false });
      //console.log(this.state.dataOrdenes)
    } catch (e) {
      alert(e)
    }
  }


  timeto(timest) {
    var milisegundos = timest * 1000;
    var dateObject = new Date(milisegundos);
    const currentDayOfMonth = dateObject.getDate();
    const currentMonth = dateObject.getMonth(); // Be careful! January is 0, not 1
    const currentYear = dateObject.getFullYear();
    const hora = dateObject.getHours();
    const minutos = (dateObject.getMinutes() < 10 ? '0' : '') + dateObject.getMinutes();

    return dateObject = currentDayOfMonth + "/" + (currentMonth + 1) + "/" + currentYear + " " + hora + ":" + minutos;
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 21, justifyContent: 'center', alignContent: 'center' }}>
          <ActivityIndicator size="large" color={color.AZUL} style={{ height: 100 }} />
        </View>
      );
    }

    return (
      <ScrollView style={{ padding: 10 }}>
        {this.state.dataOrdenes.map((producto, index) => (
          <View  key={index} style={{ height: 110, borderRadius: 20, marginBottom: 12, backgroundColor: color.BLUE, elevation: 2, flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 12 }}>
              <Text style={mainStyles.textOrder}>{producto.estado}</Text>
              <Text style={mainStyles.textOrder}>{producto.negocio}</Text>
              <Text style={mainStyles.timeOrder}>{this.timeto(producto.createAt)}</Text>
              <Text style={mainStyles.precioOrder}>${producto.total}.00</Text>
            </View>

            <TouchableHighlight underlayColor='#00000060' onPress={() => {
              this.props.navigation.navigate('Detalles',{id: producto.id});
            }}
            style={{ justifyContent: 'center', backgroundColor:'#2A5CBF', width:100, borderRadius:20}}
            >
              <View>
                <Text style={{textAlign:'center', color:color.WHITE, fontFamily:'Oxygen-Bold', fontSize:13}}>Ver detalles</Text>
              </View>
            </TouchableHighlight>
          </View>
        ))}

      </ScrollView>
    );
  }
}