import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import Item from '../Functions/itens';

const lixeira = require('../../imgs/lixeira.png');
const historico = require('../../imgs/chart.png');
//const edit = require('../../imgs/edit.png');

let cps = [];

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
  // compras     = array com todas as compras da lista para filtragem
  // maxData     = objeto Date com a data da última compra para renderização do item 
  constructor(props) {
    super(props);
    this.state = {
      comprado: false,
    };
  }

  componentWillMount() {
    if (this.props.compras.length > 0) {
      cps = this.props.compras.filter(elem => 
        elem.idItem === this.props.id && Date.parse(elem.data) === Date.parse(this.props.maxData));
      if (cps.length > 0) {
        this.setState({ comprado: true });
      }
    } else {
      this.setState({ comprado: false });
    }
  }
  
  getPromo() {
    return cps[0].promocao ? '*' : '';
  }

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

  getStyle(prioridade) {
    switch (prioridade.toLowerCase()) {
      case 'alta':
        return styles.itemAlta;
      case 'media':
        return styles.itemMedia;
      case 'baixa':
        return styles.itemBaixa;
      default:
        return styles.item;
    }
  }

  render() {
    const { navigate } = this.props.navigate;
    return (
      <View style={this.getStyle(this.props.prioridade)}>
        {/*View utilizada para abrigar o check de item comprado*/}
        <View style={styles.check}> 
          <Text>{this.state.comprado ? '*' : ''}</Text>
        </View>
        <View style={styles.desc}>
          {/*View segmento de nome e descrição do item*/}
          <View style={styles.segNome}> 
            <Text 
              style={styles.textoItem} 
              onLongPress={() => navigate('Item', { 
                idItem: this.props.id, 
                updateLista: this.props.updateLista
              })}
            >
              {this.props.nome}
            </Text>
            <Text 
              style={styles.textoItem} 
              onLongPress={() => navigate('Item', { 
                idItem: this.props.id, 
                updateLista: this.props.updateLista
              })}
            >
              {this.props.descricao}
            </Text>
          </View>
          {/*View segmento da indicação de promoção do item*/}
          <View style={styles.segPromo}> 
            <Text style={{ color: 'red', fontWeight: 'bold' }}>
              {this.state.comprado ? this.getPromo() : ''}
            </Text>
          </View>
          {/*View segmento da quantidade do item*/}
          <View style={styles.segQtde}> 
            <Text style={styles.textoItem}>
              {this.state.comprado ? cps[0].qtde : ''}
            </Text>
          </View>
          {/*View segmento de valores do item*/}
          <View style={styles.segValor}> 
            <Text style={styles.textoItem}>
              U {this.state.comprado ? cps[0].valorU.toFixed(2).replace('.', ',') : ''}
            </Text>
            <Text style={styles.textoItem}>
              T {this.state.comprado ? 
                (cps[0].qtde * cps[0].valorU).toFixed(2).replace('.', ',') : ''}
            </Text>
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
            onPress={() => navigate('ResumoCompra', { 
                idItem: this.props.id, 
                updateLista: this.props.updateLista
              })} 
          >
            <Image 
              style={styles.historicoImgItem} 
              source={historico} 
            />
          </TouchableOpacity>

          {/*Botão de consultar o Item*/}
         {/* <TouchableOpacity 
            style={styles.consultaItem}
            onPress={() => navigate('Item', { 
              idItem: this.props.id, 
              updateLista: this.props.updateLista
            })} 
          >
            <Image 
              style={styles.consultaImgItem} 
              source={edit} 
            />
          </TouchableOpacity>*/}
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
  itemBaixa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EDFFEE',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 2,
    marginHorizontal: 5,
  },
  itemMedia: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFE5',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 2,
    marginHorizontal: 5,
  },
  itemAlta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFE2E2',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 2,
    marginHorizontal: 5,
  },
  check: {
    width: '8%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  desc: {
    width: '72%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textoItem: {
    fontSize: 13,
    fontWeight: 'normal',
    color: '#000000'
  },
  botoes: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
