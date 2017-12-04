import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import Lista from '../Functions/listas';

const lixeira = require('../../imgs/lixeira.png');
const historico = require('../../imgs/chart.png');
const lupa = require('../../imgs/lupa.png');

export default class Listagem extends React.Component {
  // PROPS ESPERADAS:
  // nome        = nome da lista a ser renderizada
  // id          = id da lista para repassar ao próximo componente de chamada
  // updateLista = função da homeScreen para atualizar a lista após alterações
  // navigate    = controle de navegação para permitir a mudança de tela

  removerLista(id) {
    Alert.alert(
      this.props.nome,
      'Deseja realmente excluir esta lista?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        { text: 'Excluir', 
          onPress: () => {
            Lista.removerLista(id);
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
      <View style={styles.lista}>
        
        <Text style={styles.textoLista}>{this.props.nome}</Text>
        
        <View style={styles.botoes}>
          {/*Botão de apagar a lista*/}
          <TouchableOpacity 
            style={styles.excluiLista}
            onPress={() => { this.removerLista(this.props.idLista); }} 
          >
            <Image 
              style={styles.excluiImgLista} 
              source={lixeira} 
            />
          </TouchableOpacity>

          {/*Botão de histórico*/}
          <TouchableOpacity 
            style={styles.historicoLista}
            onPress={() => navigate('ResumoLista', { 
              idLista: this.props.idLista,
              nome: this.props.nome,
            })} //eslint-disable-line
          >
            <Image 
              style={styles.historicoImgLista} 
              source={historico} 
            />
          </TouchableOpacity>

          {/*Botão de consultar a lista*/}
          <TouchableOpacity 
            style={styles.consultaLista}
            onPress={() => navigate('Lista', { 
              idLista: this.props.idLista,
              nome: this.props.nome,
            })} 
          >
            <Image 
              style={styles.consultaImgLista} 
              source={lupa} 
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
  lista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#FCFBE3',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    marginBottom: 2,
  },
  textoLista: {
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
  excluiLista: {
    marginHorizontal: 5,
    alignSelf: 'center'
  },
  excluiImgLista: {
    width: 20,
    height: 20
  },
  historicoLista: {
    marginHorizontal: 5,
    alignSelf: 'center'
  },
  historicoImgLista: {
    width: 30,
    height: 30
  },
  consultaLista: {
    marginHorizontal: 5,
    alignSelf: 'center'
  },
  consultaImgLista: {
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
