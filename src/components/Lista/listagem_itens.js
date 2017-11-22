import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import Item from '../Functions/itens';

const lixeira = require('../../imgs/lixeira.png');
const historico = require('../../imgs/chart.png');
const edit = require('../../imgs/edit.png');

export default class ListagemItens extends React.Component {
  // PROPS ESPERADAS:
  // id          = id do Item para repassar ao próximo componente de chamada
  // nome        = nome do Item a ser renderizado
  // descricao   = descricao do Item a ser renderizado
  // updateItem  = função da homeScreen para atualizar a tela de itens após alterações
  // navigate    = controle de navegação para permitir a mudança de tela
  //
  //

  removerItem(id) {
    Alert.alert(
      this.props.nome,
      'Deseja realmente excluir este item?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        { text: 'Excluir', 
          onPress: () => {
            Item.removerItem(id);
            this.props.updateLista();
          } 
        }
      ],
      { cancelable: false }
    ); 
  }

  render() {
    const { navigate } = this.props.navigate;
    return (
      <View style={styles.item}>
        
        <Text style={styles.textoItem}>{this.props.nome}</Text>
        
        <View style={styles.botoes}>
          {/*Botão de apagar o Item*/}
          <TouchableOpacity 
            style={styles.excluiItem}
            onPress={() => { this.removerItem(this.props.id); }} 
          >
            <Image 
              style={styles.excluiImgItem} 
              source={lixeira} 
            />
          </TouchableOpacity>

          {/*Botão de histórico*/}
          <TouchableOpacity 
            style={styles.historicoItem}
            onPress={() => { /* Adicionar função para histórico */ }} //eslint-disable-line
          >
            <Image 
              style={styles.historicoImgItem} 
              source={historico} 
            />
          </TouchableOpacity>

          {/*Botão de consultar o Item*/}
          <TouchableOpacity 
            style={styles.consultaItem}
            onPress={() => navigate('Item', { id: this.props.id })} 
          >
            <Image 
              style={styles.consultaImgItem} 
              source={edit} 
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#DDD',
    justifyContent: 'space-between',
  },
  corpo: {
    width: '100%',
    flex: 19,
    backgroundColor: '#F0FFFF'
  },
  alteraNome: {
    backgroundColor: '#DFFFFE',
    borderRadius: 15,
    height: '80%',
    marginTop: 45,
    marginHorizontal: 10,
    padding: 10,
    justifyContent: 'center'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#FCFBE3',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 2,
  },
  textoItem: {
    width: '60%',
    marginLeft: 10,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000'
  },
  botoes: {
    width: 120,
    flexDirection: 'row',
  },
  excluiItem: {
    marginHorizontal: 5,
    alignSelf: 'center'
  },
  excluiImgItem: {
    width: 20,
    height: 20
  },
  historicoItem: {
    marginHorizontal: 5,
    alignSelf: 'center'
  },
  historicoImgItem: {
    width: 30,
    height: 30
  },
  consultaItem: {
    marginHorizontal: 5,
    alignSelf: 'center'
  },
  consultaImgItem: {
    width: 30,
    height: 30
  },
  rodape: {
    flex: 3,
    width: '100%',
    backgroundColor: '#F0FFFF',
    alignItems: 'flex-end'
  },
  botao_add: {
    alignItems: 'center',
    marginRight: '15',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'blue'
  }
});
