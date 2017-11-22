import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View, StatusBar } from 'react-native';

import HomeScreen from './src/components/HomeScreen';
import ListaScreen from './src/components/ListaScreen';
import ItemScreen from './src/components/ItemScreen';

const AppNav = StackNavigator({
  Home: { screen: HomeScreen },
  Lista: { screen: ListaScreen },
  Item: { screen: ItemScreen },
  }, {
    initialRouteName: 'Home',
    headerMode: 'float',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar 
          translucent
        />
        <View style={{ height: StatusBar.currentHeight }} />
        <AppNav />
      </View>
    );
  }
}
