import React from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput,
  Button } from 'react-native';
import Radio from './Item/Radio';
import Item from './Functions/itens.js';

const tituloItem = (
    <View>
      <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }} > 
        Lista de compras XXXXXX
      </Text>
      <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
        Incluir Item
      </Text>
    </View>
);

let it = [];

export default class ItemScreen extends React.Component {
  // Tela para adição de novo Item ou edição de um item já existente
  // PROPS ESPERADAS ===> this.props.navigation.state.params.<NOME>
  // ----Fluxo da aplicação
  // idLista          = Id da lista em que o item será vinculado
  // idItem           = (opcional) caso seja repassado, a rotina deverá realizar update no item
  //                               do contrário, criará um Item novo.
  // ----Controle e navegação
  // updateItem  = função da homeScreen para atualizar a tela de itens após alterações
  // navigate    = controle de navegação para permitir a mudança de tela
  // 


  static navigationOptions = { //eslint-disable-line
    headerTitle: tituloItem,
  };

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      isNew: true,
      prioAlta: false,
      prioMedia: false,
      prioBaixa: false,
      itemNome: '',
      itemDescricao: '',
      itemPrio: 'baixa',
    };
  }

  componentDidMount() {
    this.updateItem();
  }

  async updateItem() {
    const idItem = this.props.navigation.state.params.idItem;

    // Caso o idItem seja repassado, ativa a edição do mesmo
    if (idItem !== undefined) {
      it = Item.getItem(idItem);
      console.log(it);
      if (it !== null) {
        console.log('conseguiu recuperar o item');
        this.setState({ 
          isNew: false,
          itemNome: it.nome,
          itemDescricao: it.descricao,
          itemPrio: it.prioridade,
        });
      } 
    }
    this.setState({ isLoading: false });
  }

  async salvarItem() {
    const { goBack } = this.props.navigation;
    const idItem = this.props.navigation.state.params.idItem;

    // Caso o idItem seja repassado, ativa a edição do mesmo
    if (idItem !== undefined) {
      Item.editarItem(it.idItem, this.state.itemNome, this.state.itemDescricao, this.state.itemPrio);
    } else {
      console.log('Entrou na rotina de novo item');
    }
    goBack();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            size='large'
          />
        </View>
      );
    }

    return (
        <View style={styles.container}>
          <ScrollView style={styles.topo} >

            <Text style={styles.texto} >Item:</Text>
            <TextInput 
              style={styles.input} 
              placeholder='Ex. Arroz 5kg / Biscoito Recheado'
              onChangeText={(text) => {this.setState({ itemNome: text })}}
              value={this.state.itemNome}
            />

            <Text style={styles.texto} >Descrição do item/marca:</Text>
            <TextInput 
              style={styles.input} 
              placeholder='Camil / Passatempo de morango'
              onChangeText={(text) => {this.setState({ itemDescricao: text })}}
              value={this.state.itemDescricao}
            />

            <Text style={styles.texto} >Prioridade:</Text>

            <View style={styles.checkView}>

              <Radio prioridade={it.prioridade} />

            </View>

            <Button
              title='Salvar Item'
              onPress={() => this.salvarItem()}
            />

          </ScrollView>
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
    flex: 0.8,
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: '#FFF',
    marginTop: 5,
  },
  texto: {
    fontSize: 14,
  },
  input: {
    fontSize: 18,
    color: '#555',
    height: 50,
  },
  checkView: {
    flexDirection: 'row',
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  checkAlta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6565',
  },
  checkMedia: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFF95',
  },
  checkBaixa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C6EFFF',
  },
  textoCheck: {
    width: 60,
  },
});
