import React from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Button,
  ScrollView } from 'react-native';
import Lista from './Functions/listas';
import Item from './Functions/itens';
import ListagemItens from './Lista/listagem_itens';

let ls = {};
let it = [];

const tituloLista = (
    <Text 
      style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }} 
    > 
      Itens
    </Text>
);

const calendario = require('../imgs/calendar2.png');
const filtro = require('../imgs/sort.png');

export default class ListaScreen extends React.Component {
  // Tela de informalões gerais da Lista
  // Props esperadas:
  // idLista     = id da lista à qual será usada para resgatas os dados

  static navigationOptions = { //eslint-disable-line
    headerTitle: tituloLista,
  };

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      isNew: true,
      titulo: 'Teste',
    };
    this.updateLista = this.updateLista.bind(this);
  }

  componentDidMount() {
    try {
      if (this.updateLista()) {
        console.log('ListaScreen - Conseguiu recuperar os itens da lista');
      } else {
        console.log('ListaScreen - Erro. Não conseguiu recuperar os itens da lista');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateLista() {    
    const id = this.props.navigation.state.params.idLista;
    try {
      ls = await Lista.getLista(id);
    } catch (error) {
      console.log(error);
    }

    //Rotina de testes para criação de ambiente
    /*Item.remocaoManual();
    console.log(ls.idLista);
    Item.novoItem(ls.idLista, 'Arroz', 'teste', 'Alta');
    Item.novoItem(ls.idLista, 'Feijão', 'teste', 'Alta');*/    

    try {
      if (await Item.recuperar()) {
        this.setState({ isNew: false });
      } else {
        this.setState({ isNew: true });
      }
      this.setState({ isLoading: false });
      return true;
    } catch (error) {
      console.log(error);
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
            <Text style={styles.txtTitulo}>{ls.nome}</Text>
          </View>
          <View style={styles.topo} >
            <Image 
              style={styles.calendario}
              source={calendario} 
            />
            <Text style={styles.data}>07/11/2017</Text>
            <Image 
              style={styles.filtro}
              source={filtro} 
            />
          </View>
          <ScrollView style={styles.corpo}>
            <Text>Clique no botão abaixo para adicionar um novo item em sua lista.</Text>
            <Button 
              title='Novo Item'
              onPress={() => navigate('Item', { 
                idLista: this.props.navigation.state.params.idLista,
                updateLista: this.updateLista,
                prioridade: 'baixa' 
              })}
            />
          </ScrollView>
          <View style={styles.rodape}>
            <Text>Rodape</Text>
          </View>
        </View>
      );
    }

    const it = Item.getItens(ls.idLista);
    console.log(ls.idLista);
    const mapaItem = it.map((elem, index) => (
      <ListagemItens 
        key={index} 
        id={elem.idItem} 
        nome={elem.nome}
        descricao={elem.descricao}
        prioridade={elem.prioridade}
        updateLista={this.updateLista} 
        navigate={this.props.navigation} 
      />
    ));

    return (
      <View style={styles.container}>
        <View style={styles.titulo}>
          <Text style={styles.txtTitulo}>{ls.nome}</Text>
        </View>
        <View style={styles.topo} >
          <Image 
            style={styles.calendario}
            source={calendario} 
          />
          <Text style={styles.data}>07/11/2017</Text>
          <Image 
            style={styles.filtro}
            source={filtro} 
          />
        </View>
        <ScrollView style={styles.corpo}>
          {/*Componente que renderiza a lista de itens */}
          { mapaItem }
        </ScrollView>
        <View style={styles.rodape}>
          <Button 
            title='Novo Item'
            onPress={() => navigate('Item', { 
              idLista: this.props.navigation.state.params.idLista,
              updateLista: this.updateLista,
              prioridade: 'baixa' })}
          />
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
    paddingLeft: 30,
  },
  txtTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555'
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
