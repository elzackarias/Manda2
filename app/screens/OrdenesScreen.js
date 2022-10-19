import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import color from '@styles/colors'
import OrdenesProceso from '@screens/OrdenesProceso'
import OrdenesAnteriores from '@screens/OrdenesAnteriores'
var { width } = Dimensions.get('window');

export default class Ordenes extends Component {

  constructor(props) {
    super(props);
    this.state = { module:1 };
  }

  select(id){
    this.setState({module:id})
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <View style={styles.cardContainer}>
            <TouchableOpacity onPress={()=>this.select(1)} style={this.state.module == 1 ? styles.btnLeft : styles.btnTop}>
                <Text style={[styles.textTop,{color:this.state.module == 1 ? color.AZUL : '#d3d3d3'}]}>En proceso</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.module == 2 ? styles.btnRight : styles.btnTop} onPress={()=>this.select(2)}>
                <Text style={[styles.textTop,{color:this.state.module == 2 ? color.AZUL : '#d3d3d3'}]}>Anteriores</Text>
            </TouchableOpacity>
          </View>
        {
               this.state.module==1? <OrdenesProceso navigation={this.props.navigation} />
               :<OrdenesAnteriores navigation={this.props.navigation} />
              }
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
    justifyContent:'space-between',
    width:width,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    alignItems: 'center',
    elevation: 3,
    height: 65,
  },
  btnTop: {
    height:65,
    alignItems:'center',
    justifyContent:'center',
    width: width / 2,
  },
  btnLeft:{
    height:65,
    alignItems:'center',
    justifyContent:'center',
    width: width / 2,
    borderLeftColor:color.AZUL,
    borderLeftWidth:3,
    borderBottomColor:color.AZUL,
    borderBottomWidth:3,
    borderBottomStartRadius:16
  },
  btnRight:{
    height:65,
    alignItems:'center',
    justifyContent:'center',
    width: width / 2,
    borderRightColor:color.AZUL,
    borderRightWidth:3,
    borderBottomColor:color.AZUL,
    borderBottomWidth:3,
    borderBottomEndRadius:16
  },
  textTop: {
    textAlign: 'center',
    fontFamily: 'Oxygen-Regular',
    fontSize: 18
  },
  tecsto: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 22,
    color: color.AZUL
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
  }
});
