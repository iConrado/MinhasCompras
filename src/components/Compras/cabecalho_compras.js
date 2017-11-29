import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class CabecalhoCompra extends React.Component {
  render() {
    return (
      <View style={styles.item}>
        {/*View segmento de loja da compra*/}
        <View style={styles.segLoja}> 
          <Text style={styles.textoItem}>Loja</Text>
        </View>
        {/*View segmento de promoção da compra*/}
        <View style={styles.segPromo}> 
          <Text style={styles.textoItem}>Promo</Text>
        </View>
        {/*View segmento da data da compra*/}
        <View style={styles.segData}> 
          <Text>Data</Text>
        </View>
        {/*View segmento da quantidade da compra*/}
        <View style={styles.segQtde}> 
          <Text style={styles.textoItem}>Qtde</Text>
        </View>
        {/*View segmento de valor unitário da compra*/}
        <View style={styles.segValorU}> 
          <Text style={styles.textoItem}>Vlr Unit</Text>
        </View>
        {/*View segmento de valor total da compra*/}
        <View style={styles.segValorT}> 
          <Text style={styles.textoItem}>Vlr Total</Text>
        </View>
        <View style={styles.botoes}>
          {/*Botão de apagar o Item*/}
          <Text>Excluir</Text>
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
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    borderTopColor: '#DDD',
    borderTopWidth: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 5,
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
    alignItems: 'center',
  },
  segValorT: {
    flex: 6,
    alignItems: 'center',
  },
  botoes: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
