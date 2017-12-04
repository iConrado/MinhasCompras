import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';

import HomeScreen from './src/components/HomeScreen';
import ListaScreen from './src/components/ListaScreen';
import ItemScreen from './src/components/ItemScreen';
import ResumoCompraScreen from './src/components/ResumoCompraScreen';
import CompraScreen from './src/components/CompraScreen';
import ResumoLista from './src/components/ResumoListaScreen';

const AppNav = StackNavigator({
  Home: { screen: HomeScreen },
  Lista: { screen: ListaScreen },
  Item: { screen: ItemScreen },
  ResumoCompra: { screen: ResumoCompraScreen },
  Compra: { screen: CompraScreen },
  ResumoLista: { screen: ResumoLista },
  }, {
    initialRouteName: 'Home',
    headerMode: 'float',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <StatusBar 
          translucent
        />
        <View style={{ height: StatusBar.currentHeight }} />
        <AppNav />
      </KeyboardAvoidingView>
    );
  }
}
