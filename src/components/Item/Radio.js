import React, { Component } from 'react';
import { View } from 'react-native';
import RadioForm from 'react-native-radio-form';

const mockData = [
    {
        label: 'Alta',
        prioridade: 'alta'
    },
    {
        label: 'Média',
        prioridade: 'media'
    },
    {
        label: 'Baixa',
        prioridade: 'baixa'
    }
];

export default class Radio extends Component {
  onSelect(item) {
    console.log(item);
  }

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
            itemRealKey="prioridade"
            circleSize={25}
            initial={2}
            formHorizontal
            labelHorizontal
            onPress={(item) => this.onSelect(item)}
        />
      </View>
    );
  }
}
