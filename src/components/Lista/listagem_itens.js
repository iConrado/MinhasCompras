import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import Item from '../Functions/itens';

const lixeira = require('../../imgs/lixeira.png');
const historico = require('../../imgs/chart.png');
const edit = require('../../imgs/edit.png');

export default class ListagemItens extends React.Component {
  // PROPS ESPERADAS:
  // ----Item
  // id          = id do Item para repassar ao próximo componente de chamada
  // nome        = nome do Item a ser renderizado
  // descricao   = descricao do Item a ser renderizado
  // prioridade  = indica a cor de fundo do item a ser renderizado
  // ----Controle e navegação
  // updateItem  = função da homeScreen para atualizar a tela de itens após alterações
  // navigate    = controle de navegação para permitir a mudança de tela
  // ----Compra
  // check       = booleano para indicar se o item foi comprado na compra atual
  // promo       = indicador de item em promoção
  // qtde        = quantidade de itens comprados
  // valorU      = valor unitário
  // valorT      = valor total (qtde * valorU)

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
        {/*View utilizada para abrigar o check de item comprado*/}
        <View style={styles.check}> 
          <Text>*</Text>
        </View>
        <View style={styles.desc}>
          {/*View segmento de nome e descrição do item*/}
          <View style={styles.segNome}> 
            <Text style={styles.textoItem}>{this.props.nome}</Text>
            <Text style={styles.textoItem}>{this.props.descricao}</Text>
          </View>
          {/*View segmento da indicação de promoção do item*/}
          <View style={styles.segPromo}> 
            <Text style={{ color: 'red', fontWeight: 'bold' }}>*</Text>
          </View>
          {/*View segmento da quantidade do item*/}
          <View style={styles.segQtde}> 
            <Text style={styles.textoItem}>1</Text>
          </View>
          {/*View segmento de valores do item*/}
          <View style={styles.segValor}> 
            <Text style={styles.textoItem}>U 12,99</Text>
            <Text style={styles.textoItem}>T 12,99</Text>
          </View>
        </View>

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
    backgroundColor: '#FCFBE3',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 2,
    marginHorizontal: 5,
  },
  check: {
    width: '6%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  desc: {
    width: '64%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textoItem: {
    fontSize: 13,
    fontWeight: 'normal',
    color: '#000000'
  },
  botoes: {
    width: '30%',
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
  },
  segNome: {
    flexDirection: 'column',
    flex: 7,
  },
  segPromo: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segQtde: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segValor: {
    flexDirection: 'column',
    flex: 3,
    alignItems: 'center',
  },
});
