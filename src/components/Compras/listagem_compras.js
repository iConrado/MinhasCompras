import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import Compra from '../Functions/compras';
import Data from '../Functions/datas';
import Loja from '../Resumo/lojas';

const lixeira = require('../../imgs/lixeira.png');

export default class ListagemCompras extends React.Component {
  // PROPS ESPERADAS:
  // ----Item
  // id          = id do Item para repassar ao próximo componente de chamada
  // ----Controle e navegação
  // updateLista = função da ResumoCompraScreen para atualizar a tela de itens após alterações
  // updateItens = função da ListaScreen para atualizar a tela com itens após alterações
  // navigate    = controle de navegação para permitir a mudança de tela
  // ----Compra
  // idCompra    = id da Compra
  // idLoja      = id da loja onde foi comprado o item
  // data        = data da compra
  // promo       = indicador de item em promoção
  // qtde        = quantidade de itens comprados
  // valorU      = valor unitário
  // valorT      = valor total (qtde * valorU)
  

  removerItem(id) {
    Alert.alert(
      this.props.nome,
      'Deseja realmente excluir esta compra?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        { text: 'Excluir', 
          onPress: () => {
            Compra.removerCompra(id);
            this.props.updateLista();
            this.props.updateItens();
          } 
        }
      ],
      { cancelable: false }
    ); 
  }

  render() {
    const d = new Date(Date.parse(this.props.data));
    console.log(this.props.promo);
    return (
      <View style={styles.item}>
        {/*View segmento de loja da compra*/}
        <View style={styles.segLoja}> 
          <Loja idLoja={this.props.idLoja} />
          {/*<Text style={styles.textoItem}>{this.props.idLoja}</Text>*/}
        </View>
        {/*View segmento de promoção da compra*/}
        <View style={styles.segPromo}> 
          <Text style={styles.textoPromo}>
            {this.props.promo ? '*' : ''}
          </Text>
        </View>
        {/*View segmento da data da compra*/}
        <View style={styles.segData}> 
          <Text>{Data.dataToStringAA(d)}</Text>
        </View>
        {/*View segmento da quantidade da compra*/}
        <View style={styles.segQtde}> 
          <Text style={styles.textoItem}>{this.props.qtde}</Text>
        </View>
        {/*View segmento de valor unitário da compra*/}
        <View style={styles.segValorU}> 
          <Text style={styles.textoValor}>
            {this.props.valorU.toFixed(2).replace('.', ',')}
          </Text>
        </View>
        {/*View segmento de valor total da compra*/}
        <View style={styles.segValorT}> 
          <Text style={styles.textoValor}>
            {(this.props.qtde * this.props.valorU).toFixed(2).replace('.', ',')}
          </Text>
        </View>

        <View style={styles.botoes}>
          {/*Botão de apagar o Item*/}
          <TouchableOpacity 
            style={styles.excluiItem}
            onPress={() => { this.removerItem(this.props.idCompra); }} 
          >
            <Image 
              style={styles.excluiImgItem} 
              source={lixeira} 
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
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //borderBottomColor: '#DDD',
    //borderBottomWidth: 1,
    //borderRadius: 10,
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
    color: '#000000',
    textAlign: 'center',
  },
  textoPromo: {
    fontSize: 13,
    fontWeight: 'normal',
    color: '#FF0000',
    textAlign: 'center',
  },
  textoValor: {
    fontSize: 13,
    fontWeight: 'normal',
    color: '#000000',
    textAlign: 'right',
    paddingRight: 5,
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
  segLoja: {
    flex: 3,
  },
  segPromo: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segData: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segQtde: {
    flex: 4,
    alignItems: 'center',
  },
  segValorU: {
    flex: 6,
    alignItems: 'flex-end',
  },
  segValorT: {
    flex: 6,
    alignItems: 'flex-end',
  },
  botoes: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
