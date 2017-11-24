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
  render() {
    let prio = 2;
    let prioridade = 'baixa';
    if (this.props.prioridade !== undefined) {
      prioridade = this.props.prioridade.toLowerCase();
    }
    console.log(prioridade);
    switch (prioridade) {
      case 'alta':
        prio = 0;
        break;
      case 'media':
        prio = 1;
        break;
      case 'baixa':
        prio = 2;
        break;
      default:
        prio = 2;
    }
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
            initial={prio}
            formHorizontal
            labelHorizontal
            onPress={() => {}}
        />
      </View>
    );
  }
}
