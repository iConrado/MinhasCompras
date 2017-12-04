import React from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  TouchableOpacity } from 'react-native';
import Item from './Functions/itens';
import Compra from './Functions/compras';
import CabecalhoCompra from './Compras/cabecalho_compras';
import ListagemCompras from './Compras/listagem_compras';

let its = {};

const tituloLista = (
    <Text 
      style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }} 
    > 
      Resumo de Compras
    </Text>
);

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

  /*componentWillUnmount() {
    this.props.navigation.state.params.updateLista();
  }*/

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
      } else {
        this.setState({ isNew: true });
      }
      this.setState({ isLoading: false });
      return true;
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
      return false;
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    
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
            <Text style={{ textAlign: 'center' }}>
              Clique no botão abaixo para adicionar um novo item em sua lista.
            </Text>
          </ScrollView>
          <View style={styles.rodapeNovo}>
            <TouchableOpacity
            style={styles.botaoNovo}
              onPress={() => navigate('Compra', {
                idItem: its.idItem,
                updateLista: this.updateLista,
                updateItens: this.props.navigation.state.params.updateLista,
                navigation: this.props.navigation
              })}
            >
              <Text style={styles.textoBotao}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    const cps = Compra.getCompras(its.idItem);
    cps.sort((a, b) => Date.parse(b.data) - Date.parse(a.data));
    const mapaCompras = cps.map((elem, index) => (
      <ListagemCompras
        key={index} 
        id={elem.idItem} 
        idCompra={elem.idCompra}
        idLoja={elem.idLoja}
        data={elem.data}
        qtde={elem.qtde}
        valorU={elem.valorU}
        promo={elem.promocao}
        updateLista={this.updateLista}
        updateItens={this.props.navigation.state.params.updateLista}
        navigate={this.props.navigation} 
      />
    ));

    let ultimo = 0;
    let media = 0;
    let menor = 0;
    if (cps[0] !== undefined) {
      ultimo = cps[0].valorU;
      media = cps.reduce((total, item) => total + item.valorU, 0) / cps.length;
      cps.sort((a, b) => a.valorU - b.valorU);
      menor = cps[0].valorU;
    }

    return (
      <View style={styles.container}>
        <View style={styles.titulo}>
          <Text style={styles.txtTitulo}>{its.nome}</Text>
          <Text style={styles.txtTitulo}>{its.descricao}</Text>
        </View>
        <ScrollView style={styles.corpo}>
          <CabecalhoCompra />
          {/* Componente que lista as compras */}
          { mapaCompras }
        </ScrollView>
        <View style={styles.rodape}>
          <View style={styles.valoresLabel}>
            <Text>Menor Valor: </Text>
            <Text>Valor médio: </Text>
            <Text>Último valor: </Text>
          </View>
          <View style={styles.valoresConteudo}>
            <Text>R$ {menor.toFixed(2).replace('.', ',')}</Text>
            <Text>R$ {media.toFixed(2).replace('.', ',')}</Text>
            <Text>R$ {ultimo.toFixed(2).replace('.', ',')}</Text>
          </View>
          <TouchableOpacity
            style={styles.botaoNovo}
            onPress={() => navigate('Compra', {
              idItem: its.idItem,
              updateLista: this.updateLista,
              updateItens: this.props.navigation.state.params.updateLista,
              navigation: this.props.navigation
            })}
          >
            <Text style={styles.textoBotao}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    /*height: 50,*/
    width: '95%',
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  rodapeNovo: {
    flexDirection: 'row',
    justifyContent: 'center',
    /*height: 50,*/
    width: '95%',
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  valoresLabel: {
    flex: 4,
    borderTopColor: '#DDD',
    borderTopWidth: 1,
  },
  valoresConteudo: {
    flex: 3,
    borderTopColor: '#DDD',
    borderTopWidth: 1,
  },
  botaoNovo: {
    height: 60,
    width: 60,
    marginLeft: 15,
    backgroundColor: '#5679FF',
    borderRadius: 60 / 2,
    justifyContent: 'center',
    elevation: 3,
  },
  textoBotao: {
    textAlign: 'center',
    fontSize: 28,
    color: '#FFF'
  }
});
