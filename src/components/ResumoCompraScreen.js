import React from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Button,
  ScrollView,
  FlatList } from 'react-native';
import Lista from './Functions/listas';
import Item from './Functions/itens';
import Compra from './Functions/compras';
import ListagemCompras from './Compras/listagem_compras';

let its = {};

const tituloLista = (
    <Text 
      style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }} 
    > 
      Resumo de Compras
    </Text>
);

const lixeira = require('../imgs/lixeira.png');

export default class ResumoCompraScreen extends React.Component {
  // Tela de informalões gerais da Lista
  // Props esperadas:
  // idItem     = id do Item o qual será usado para resgatar os dados

  static navigationOptions = { //eslint-disable-line
    headerTitle: tituloLista,
  };

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      isNew: true,
    };
    this.updateLista = this.updateLista.bind(this);
  }

  componentDidMount() {
    try {
      if (this.updateLista()) {
        console.log('ResumoCompraScreen - Conseguiu recuperar as compras do Item');
      } else {
        console.log('ResumoCompraScreen - Erro. Não conseguiu recuperar as compras do Item');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateLista() {    
    const id = this.props.navigation.state.params.idItem;

    try {
      its = await Item.getItem(id);
    } catch (error) {
      console.log(error);
    }

    //Rotina de testes para criação de ambiente
    //Compra.remocaoManual();
    /*const d1 = new Date(2017, 11, 5);
    const d2 = new Date(2017, 11, 27);
    console.log(its.idItem);
    Compra.novaCompra(its.idItem, d1, 1, 2, 15.99, false);
    Compra.novaCompra(its.idItem, d2, 1, 1, 12.39, true);*/

    try {
      if (await Compra.recuperar()) {
        this.setState({ isNew: false });
      }
      this.setState({ isLoading: false });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { goBack } = this.props.navigation;
    
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            size='large'
          />
        </View>
      );
    }

    if (this.state.isNew) {
      return (
        <View style={styles.container}>
          <View style={styles.titulo}>
            <Text style={styles.txtTitulo}>{its.nome}</Text>
            <Text style={styles.txtTitulo}>{its.descricao}</Text>
          </View>
          <ScrollView style={styles.corpo}>
            <Text>Clique no botão abaixo para adicionar um novo item em sua lista.</Text>
            <Button 
              title='Voltar'
              onPress={() => goBack()}
            />
          </ScrollView>
          <View style={styles.rodape}>
            <Text>Rodape</Text>
          </View>
        </View>
      );
    }

    const cps = Compra.getCompras(its.idItem);
    console.log(its.idItem);
    const mapaCompras = cps.map((elem, index) => (
      <ListagemCompras
        key={index} 
        id={elem.idItem} 
        idLoja={elem.idLoja}
        data={elem.data}
        qtde={elem.qtde}
        valorU={elem.valorU}
        updateLista={this.updateLista} 
        navigate={this.props.navigation} 
      />
    ));

    return (
      <View style={styles.container}>
        <View style={styles.titulo}>
          <Text style={styles.txtTitulo}>{its.nome}</Text>
          <Text style={styles.txtTitulo}>{its.descricao}</Text>
        </View>
        <ScrollView style={styles.corpo}>
          { mapaCompras }
          <Text>Componente para carregar as compras</Text>
          <Button 
            title='Voltar'
            onPress={() => goBack()}
          />
        </ScrollView>
        <View style={styles.rodape}>
          <Text>Rodape</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 17,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  titulo: {
    width: '100%',
    backgroundColor: '#FFF',
    paddingTop: 5,
    justifyContent: 'center',
  },
  txtTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
  calendario: {
    height: 30,
    width: 30,
    marginHorizontal: 15,
  },
  data: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#519EFF'
  },
  filtro: {
    height: 25,
    width: 25,
    marginHorizontal: 15,
    marginTop: 0,
  },
  corpo: {
    flex: 1,
    paddingTop: 5,
  },
  rodape: {
    height: 50,
    width: '95%',
    marginHorizontal: 10,
  },
});
