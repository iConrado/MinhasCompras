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
import Compra from './Functions/compras';
import Data from './Functions/datas';
import ListagemItens from './Lista/listagem_itens';

let ls = {};
let it = [];
let cps = [];
let maxData = '';
let mapaItem = '';
let d = '';

const tituloLista = (titulo) => (
  <Text 
    style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }} 
  > 
    {titulo}
  </Text>
);

const calendario = require('../imgs/calendar2.png');
const filtro = require('../imgs/sort.png');

export default class ListaScreen extends React.Component {
  // Tela de informalões gerais da Lista
  // Props esperadas:
  // idLista     = id da lista à qual será usada para resgatas os dados

  static navigationOptions = ({ navigation }) => ({ //eslint-disable-line
    headerTitle: tituloLista(navigation.state.params.nome),
  });

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
    this.setState({
      isLoading: true,
      isNew: true,
    });

    const id = this.props.navigation.state.params.idLista;
    try {
      ls = await Lista.getLista(id);
    } catch (error) {
      console.log(error);
    }

    //Rotina de testes para criação de ambiente
    //Item.remocaoManual();
    /*Item.novoItem(ls.idLista, 'Arroz', 'teste', 'Alta');
    Item.novoItem(ls.idLista, 'Feijão', 'teste', 'Alta');*/    

    try {
      if (await Item.recuperar()) {
        it = Item.getItens(ls.idLista);
        if (it.length > 0) {
          if (await Compra.recuperar()) {
            cps = Compra.getComprasMultiplas(it);
            if (cps.length > 0) {
              cps.sort((a, b) => Date.parse(b.data) - Date.parse(a.data));
              d = new Date(Date.parse(cps[0].data));
            }
          } else {
            cps = [];
            d = '';
          }
          maxData = typeof d === 'object' ? d : '';
          mapaItem = it.map((elem, index) => (
            <ListagemItens 
              key={index} 
              id={elem.idItem} 
              nome={elem.nome}
              descricao={elem.descricao}
              prioridade={elem.prioridade}
              compras={cps}
              maxData={maxData}
              updateLista={this.updateLista} 
              navigate={this.props.navigation} 
            />
          ));
          this.setState({ isNew: false });
        } else {
          this.setState({ isNew: true });
        }
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
          {/*<View style={styles.titulo}>
            <Text style={styles.txtTitulo}>{ls.nome}</Text>
          </View>*/}
          <View style={styles.topo} >
            <Image 
              style={styles.calendario}
              source={calendario} 
            />
            <Text style={styles.data}>Adicione itens à sua lista</Text>
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
            <Text> </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {/*<View style={styles.titulo}>
          <Text style={styles.txtTitulo}>{ls.nome}</Text>
        </View>*/}
        <View style={styles.topo} >
          <Image 
            style={styles.calendario}
            source={calendario} 
          />
          <Text style={styles.data}>
            {maxData !== '' ? 
              `${Data.dataToString(maxData)} (última compra)` : 'Nenhuma compra registrada'}
            </Text>
          <Image 
            style={styles.filtro}
            source={filtro} 
          />
        </View>
        <View style={styles.topo2}>
          <Text style={styles.check}>Com-</Text>
          <Text style={styles.item}>Item</Text>
          <Text style={styles.promo}>Promoção</Text>
          <Text style={styles.qtde}>Qtde</Text>
          <Text style={styles.valor}>Valor Unit.</Text>
          <Text style={styles.excluir}>Excluir</Text>
          <Text style={styles.historico}>Com</Text>
        </View>
        <View style={styles.topo2}>
          <Text style={styles.check}>prado</Text>
          <Text style={styles.item}>Descrição</Text>
          <Text style={styles.promo}>(* = Sim)</Text>
          <Text style={styles.qtde}> </Text>
          <Text style={styles.valor}>Valor Total</Text>
          <Text style={styles.excluir}>Excluir</Text>
          <Text style={styles.historico}>pras</Text>
        </View>
        <ScrollView style={styles.corpo}>
          { /* Apresenta texto de UX indicando como inserir uma compra */ }
          { maxData === '' ?
            <Text style={{ textAlign: 'center' }}>
              Clique no ícone de histórico para adicionar 
              uma compra do seu respectivo item da lista.
            </Text>
            : null
          }
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
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  topo2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    //paddingVertical: 5,
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
  txtCab: {
    fontSize: 10,
  },
  calendario: {
    height: 25,
    width: 25,
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
  check: {
    width: '9%',
    fontSize: 9,
  },
  item: {
    width: '35%',
    fontSize: 9,
  },
  promo: {
    width: '12%',
    fontSize: 9,
    textAlign: 'center',
  },
  qtde: {
    width: '7%',
    fontSize: 9,
    textAlign: 'center',
  },
  valor: {
    width: '17%',
    fontSize: 9,
    textAlign: 'center',
  },
  excluir: {
    width: '10%',
    fontSize: 9,
    textAlign: 'center',
  },
  historico: {
    fontSize: 9,
    width: '10%',
    textAlign: 'center',
  },
});
