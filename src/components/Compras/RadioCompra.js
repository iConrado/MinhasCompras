import React, { Component } from 'react';
import { View } from 'react-native';
import RadioForm from 'react-native-radio-form';

const mockData = [
    {
        label: 'Extra',
        idLoja: 1
    },
    {
        label: 'Carrefour',
        idLoja: 2
    },
    {
        label: 'Walmart',
        idLoja: 3
    },
    {
        label: 'Sams Club',
        idLoja: 4
    },
    {
        label: 'Atacadão',
        idLoja: 5
    }
];

export default class Radio extends Component {
  render() {
    return (
      <View style={{ marginVertical: 0 }} >
        <RadioForm
            style={{ width: '100%' }}
            contentContainerStyle={{ 
              width: 400, 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}
            dataSource={mockData}
            itemShowKey="label"
            itemRealKey="idLoja"
            circleSize={20}
            initial={1}
            formHorizontal
            labelHorizontal
            onPress={() => {}}
        />
      </View>
    );
  }
}
