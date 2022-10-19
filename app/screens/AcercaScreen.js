import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    Linking,
    BackHandler,
    FlatList
} from 'react-native'
import { mainStyles, loginStyles } from '@styles/styles'
import MyTextInput from '@components/MyTextInput'
import ToolBar from '@components/ToolBar'
import color from '@styles/colors'
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../styles/colors'

function goToScreen(props, routeName) {
    props.navigation.replace(routeName)
}

function goToApp(site,username){
    switch(site){
        case 'fb':
        Linking.openURL('fb://profile/'+username)
          .catch(() => {
            Linking.openURL('https://www.facebook.com/profile.php?id='+username);
          })
        break;
        case 'ig':
        Linking.openURL('instagram://user?username='+username)
          .catch(() => {
            Linking.openURL('https://www.instagram.com/'+username);
          })
        break;
        default:
        Linking.openURL('https://www.'+site+'.com/'+username)
    }

}

export default function AcercaScreen(props) {

    useEffect(() => {
        const unsubscribe = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => null
    }, []);


    const handleBackButton = () => {
        props.navigation.replace('Login')
        return true;
    }

    return (
        <ScrollView
            style={{ backgroundColor: '#025FC9' }}>
            <StatusBar backgroundColor={color.BLUE1} translucent={false} />
            <ToolBar titulo='The People'
                onPressLeft={() => goToScreen(props, 'Login')}
                iconLeft={require('@recursos/images/back.png')} />
            <TouchableOpacity onPress={() => goToApp('fb','100035742260489')}>
                <View style={[mainStyles.container, { padding: 20, flexDirection: 'row' }]}>
                    <Image source={require('@recursos/images/zacarias.jpg')}
                        style={{ height: 90, width: 90, borderRadius: 5, alignSelf: "flex-start" }} />
                    <View>
                        <Text style={mainStyles.TextoAcerca}> José Zacarías</Text>
                        <Text style={mainStyles.TextoAcerca}> CEO & Programador</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToApp('fb','100040725287706')}>
                <View style={[mainStyles.container, { padding: 20, flexDirection: 'row', marginTop: -20 }]}>
                    <Image source={require('@recursos/images/daniel.jpg')}
                        style={{ height: 90, width: 90, borderRadius: 5, alignSelf: "flex-start" }} />
                    <View>
                        <Text style={mainStyles.TextoAcerca}> Daniel Hernández</Text>
                        <Text style={mainStyles.TextoAcerca}> Co-fundador & Finanzas</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToApp('fb','100006654551694')}>
                <View style={[mainStyles.container, { padding: 20, flexDirection: 'row', marginTop: -20 }]}>
                    <Image source={require('@recursos/images/alexito.jpg')}
                        style={{ height: 90, width: 90, borderRadius: 5, alignSelf: "flex-start" }} />
                    <View>
                        <Text style={mainStyles.TextoAcerca}> Alexis Villanueva</Text>
                        <Text style={mainStyles.TextoAcerca}> Co-fundador & Pressguy</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToApp('fb','100035944961948')}>
                <View style={[mainStyles.container, { padding: 20, flexDirection: 'row', marginTop: -20 }]}>
                    <Image source={require('@recursos/images/ojeda.jpg')}
                        style={{ height: 90, width: 90, borderRadius: 5, alignSelf: "flex-start" }} />
                    <View>
                        <Text style={mainStyles.TextoAcerca}> Héctor Ojeda</Text>
                        <Text style={mainStyles.TextoAcerca}> Co-fundador & Legales</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToApp('fb','100054066211801')}>
                <View style={[mainStyles.container, { padding: 20, flexDirection: 'row', marginTop: -20 }]}>
                    <Image source={require('@recursos/images/venancio-1.jpg')}
                        style={{ height: 90, width: 90, borderRadius: 5, alignSelf: "flex-start" }} />
                    <View>
                        <Text style={mainStyles.TextoAcerca}> Chris Venancio</Text>
                        <Text style={mainStyles.TextoAcerca}> Co-fundador & Logística</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={mainStyles.container}>
                <Text style={mainStyles.tituloBlanco}>Nuestra Mision</Text>
                <Text style={{ color: colors.WHITE, paddingLeft: 20, paddingTop: 5, fontSize: 17, paddingBottom: 10, paddingRight: 20 }}>Somos 5 estudiantes del CBTis 134 que queremos mejorar e innovar el comercio electrónico en nuestra entidad. Hecho con el ❤️ desde Petaquillas :3</Text>
            </View>
            <View style={mainStyles.container}>
                <Text style={[mainStyles.tituloBlanco, { marginTop: 10 }]}>Atribuciones ❤️</Text>
                <Text style={{ color: colors.WHITE, paddingLeft: 20, paddingTop: 5, fontSize: 16, paddingBottom: 3, paddingRight: 20 }}>Este proyecto no sería posible sin ayuda de los proyectos:</Text>

                <Text style={{ color: colors.WHITE, paddingLeft: 20, fontSize: 16, paddingRight: 20, fontFamily: 'Oxygen-Bold' }}>OpenStreetMap</Text>
                <Text style={{ color: colors.WHITE, paddingLeft: 20, fontSize: 16, paddingRight: 20, marginTop: 2, fontFamily: 'Oxygen-Bold' }}>SheepShop Open Source</Text>
                <Text style={{ color: colors.WHITE, paddingLeft: 20, fontSize: 16, paddingRight: 20, marginTop: 2, fontFamily: 'Oxygen-Bold' }}>Google Maps</Text>

            </View>

        </ScrollView>
    )
}