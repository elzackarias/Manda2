import React from 'react'
import { View, AppRegistry } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Searcher from '@components/Searcher'
import SplashScreen from '@screens/SplashScreen'
import LoginScreen from '@screens/LoginScreen'
import PrincipalScreen from '@screens/PrincipalScreen'
import RecuperarPasswordScreen from '@screens/RecuperarPasswordScreen'
import AcercaScreen from '@screens/AcercaScreen'
import RegistroScreen from '@screens/RegistroScreen'
import IndexScreen from '@screens/IndexScreen'
import NegocioScreen from '@screens/NegocioScreen'
import ProductoScreen from '@screens/ProductoScreen'
import UsuarioScreen from '@screens/UsuarioScreen'
import OrdenesScreen from '@screens/OrdenesScreen'
import CarritoScreen from '@screens/CarritoScreen'
import Buscador from '@components/Searcher'
import Opciones from '@screens/OpcionesDirScreen'
import MapaScreen from '@screens/MapaScreen'
import MapaBuscaScreen from '@screens/MapaBuscaScreen'
import PersonalizarScreen from '@screens/PersonalizarDirScreen'
import ConfirmarScreen from '@screens/ConfirmarScreen'
import ExitoScreen from '@screens/ExitoScreen'
import CategoriaScreen from '@screens/CategoriaScreen'
import DetallesScreen from '@screens/DetallesScreen'

import MapaTest from '@screens/MapaTest'

const AppNavigation = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Principal: {
    screen: PrincipalScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  RecuperarPassword: {
    screen: RecuperarPasswordScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Acerca: {
    screen: AcercaScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Registro: {
    screen: RegistroScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Inicio: {
    screen: IndexScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Negocio: {
    screen: NegocioScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Producto: {
    screen: ProductoScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  Usuario: {
    screen: UsuarioScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Ordenes: {
    screen: OrdenesScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Carrito: {
    screen: CarritoScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Buscador: {
    screen: Buscador,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Opciones: {
    screen: Opciones,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Mapa: {
    screen: MapaScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  MapaBusca: {
    screen: MapaBuscaScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Personalizar: {
    screen: PersonalizarScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Exito: {
    screen: ExitoScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Categoria: {
    screen: CategoriaScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Confirmar: {
    screen: ConfirmarScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Detalles: {
    screen: DetallesScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  MapaTest: {
    screen: MapaTest,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
});

// export default createAppContainer(AppNavigation)
export default createAppContainer(AppNavigation)