import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import color from '@styles/colors'

export default function MyTextInput(props) {

  return (
    <Input
      style={{ alignItems: 'center' }}
      containerStyle={{ marginBottom: -8 }}
      inputContainerStyle={{borderBottomWidth:0, backgroundColor:color.FACEBOOK_I, borderRadius: 15}}
      inputStyle={{
        fontSize: 17, paddingVertical: 12,
        paddingHorizontal: 8,
        color: color.WHITE,
      }}
      placeholderTextColor={color.BLUE4}
      placeholder={props.placeholder}
      leftIconContainerStyle={{ marginLeft: 13 }}
      leftIcon={<Icon size={24} color={'#e6ecff'}
        type={'font-awesome'} name={props.image} />}
      rightIcon={props.bolGone ?
        <TouchableOpacity activeOpacity={0.8} style={styles.btnVisibility} onPress={props.onPress}>
          <Image style={styles.btnImage} tintColor={color.WHITE}
            source={(props.secureTextEntry) ? require('@recursos/images/ic_show_password.png') : require('@recursos/images/ic_hide_password.png')} />
        </TouchableOpacity> :
        <Icon size={22} color={color.WHITE}
          type={'font-awesome'} name={props.imageRight} />}
      errorStyle={{ color: color.RED }}
      errorMessage={(props.bolError) ? props.strError : ''}
      editable={props.editable}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
      autoCapitalize={props.autoCapitalize}
      autoCompleteType={props.autoCompleteType}
      onChangeText={props.onChangeText}
      value={props.value} />
  )
}

const styles = StyleSheet.create({

  btnVisibility:
  {
    height: 40,
    width: 35,
    paddingTop: 2,
    paddingLeft: 5,
    paddingRight: 5
  },

  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
})

