import React, { useContext, useEffect, Component } from 'react'
import { Text, View, StatusBar, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
var { width } = Dimensions.get("window")
import color from '@styles/colors'
import Icon from 'react-native-vector-icons/Ionicons';
//Import the screen
import Usuario from '@screens/UsuarioScreen'
import Principal from '@screens/PrincipalScreen'

export default class Inicio extends Component{

     constructor(props) {
         super(props);
         this.state = {
           module:1,
         };
      }

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         miVariableUno: "",
    //         miVariableDos: ""
    //     };
    // };

      //COLOR #1877F2

    render() {
        return (
           <View style={{flex:1}}>
           
           <StatusBar translucent={false} backgroundColor='#e3e3e3' barStyle='dark-content' />
              {
               this.state.module==1? <Principal navigation={this.props.navigation} />
               :<Usuario />
              }
              <View style={styles.bottomTab}>
                <TouchableOpacity style={styles.itemTab} onPress={()=>this.setState({module:1})}>
                  <Icon name="ios-home" size={18} color={this.state.module==1?color.AZUL:"gray"} />
                  <Text style={{ color:this.state.module==1?color.AZUL:"gray", fontFamily:this.state.module==1?'Oxygen-Bold':"Oxygen-Regular",fontSize:13}}>Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemTab} onPress={()=>this.props.navigation.navigate('Buscador')}>
                  <Icon name="ios-search" size={18} color={this.state.module==2?color.AZUL:"gray"} />
                  <Text style={{fontSize:13, fontFamily:'Oxygen-Regular', color:'gray'}}>Buscador</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemTab} onPress={()=>this.props.navigation.navigate('Carrito')}>
                  <Icon name="ios-cart" size={18} color={this.state.module==3?color.AZUL:"gray"} />
                  <Text style={{fontSize:13, fontFamily:'Oxygen-Regular', color:'gray'}}>Carrito</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemTab} onPress={()=>this.props.navigation.navigate('Ordenes')}>
                  <Icon name="ios-list-outline" size={18} color={this.state.module==4?color.AZUL:"gray"} />
                  <Text style={{fontSize:13, fontFamily:'Oxygen-Regular', color:'gray'}}>Ordenes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemTab} onPress={()=>this.props.navigation.navigate('Usuario')}>
                  <Icon name="ios-person" size={18} color={this.state.module==5?color.AZUL:"gray"} />
                  <Text style={{ color:this.state.module==5?color.AZUL:"gray", fontFamily:this.state.module==5?'Oxygen-Bold':"Oxygen-Regular",fontSize:13}}>Cuenta</Text>
                </TouchableOpacity>
              </View>
           </View>
          //<Bottom />
        );
      }
    }
    
    const styles = StyleSheet.create({
      bottomTab:{
        height:60,
        width:width,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        elevation:5,
        position:'absolute',
        bottom:0,
        shadowOpacity:0.4,
        shadowRadius:50,
      },
      itemTab:{
        width:width/5,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
      }
    })