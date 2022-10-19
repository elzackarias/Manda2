import React, { useContext, useEffect, useState } from 'react'
import {
    Text, View, TouchableOpacity, Dimensions, Alert, Image, Linking
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import color from '@styles/colors'
import { UsuarioContext } from '@context/UsuarioContext'
import AsyncStorage from '@react-native-community/async-storage'
var { width } = Dimensions.get('window');

export default function LoginScreen(props) {
    const [Datos, setDatos] = useState('')
    const [login, loginAction] = useContext(UsuarioContext)
    useEffect(() => {
        readData();
    }, [])


    const readData = async () => {
        try {
            const Datos = await AsyncStorage.getItem("@usuario:key")
            setDatos(JSON.parse(Datos))
        } catch (e) {
            alert(e)
        }
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'center' }}>
            <TouchableOpacity style={{ position: 'absolute', zIndex: 100, left:0 }} onPress={() => props.navigation.goBack()}>
                <Icon name="arrow-back-outline" size={30} color={color.AZUL} style={{ marginTop: 10, marginLeft: 10, backgroundColor: color.WHITE, borderRadius: 50, height: 37, width: 37, textAlign: 'center', textAlignVertical: 'center' }} />
            </TouchableOpacity>
            <View style={{ backgroundColor: '#355db0', width: width, height: 235, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('@recursos/images/user.png')} style={{ height: 110, width: 110 }} />
                <Text style={{ color: color.WHITE, fontSize: 20, fontFamily: 'Oxygen-Bold', marginBottom: 3 }}>{Datos.nombre}</Text>
                <Text style={{ color: color.WHITE, fontSize: 15, marginBottom: 3 }}>{Datos.email}</Text>
                <Text style={{ color: color.WHITE, fontSize: 15 }}>{Datos.telefono}</Text>
            </View>
            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => feedback()} style={{ backgroundColor: '#cff0ff', width: width - 40, height: 45, borderRadius: 14, justifyContent: 'center', flexDirection: 'row', marginBottom: 10 }}>
                    <Icon name="chatbox-ellipses" size={25} color={color.AZUL} style={{ textAlignVertical: 'center' }} />
                    <Text style={{ fontSize: 17, fontFamily: 'Oxygen-Bold', color: color.AZUL, textAlignVertical: 'center' }}> Sugerencias :3</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => help()} style={{ backgroundColor: '#cff0ff', width: width - 40, height: 45, borderRadius: 14, justifyContent: 'center', flexDirection: 'row', marginBottom: 10 }}>
                    <Icon name="ios-help-buoy" size={25} color={color.AZUL} style={{ textAlignVertical: 'center' }} />
                    <Text style={{ fontSize: 17, fontFamily: 'Oxygen-Bold', color: color.AZUL, textAlignVertical: 'center' }}> Soporte Técnico</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => desconectarse(props)}>
                    <Text style={{ color: color.BLUE, fontSize: 21, fontFamily: 'Oxygen-Bold' }}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 115 }}>
                <Text style={{ textAlign: 'center', fontSize: 15, color: '#c4c4c4' }}>José Zacarías</Text>
                <Text style={{ textAlign: 'center', fontSize: 15, color: '#c4c4c4' }}>Versión 1.0 beta</Text>
            </View>
        </View>
    );

    function feedback() {
        Linking.openURL('whatsapp://send?text=Holaa, tengo una sugerencia sobre Manda2 :3&phone=527471441396');
    }

    function help() {
        Linking.openURL('whatsapp://send?text=Holaa, tengo un problema con Manda2 ...&phone=527471441396');
    }

    function desconectarse(props) {

        Alert.alert(
            "Salir",
            "¿Está seguro que desea cerrar sesión?",
            [
                {
                    text: "Si", onPress: () => {
                        loginAction({
                            type: 'sign-out',
                            data: {}
                        })
                        props.navigation.replace('Login')
                    }
                },
                {
                    text: "No", onPress: () => { }, style: 'cancel'
                }
            ]
        )
    }
}