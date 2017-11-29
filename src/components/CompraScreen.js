import React from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput,
  Button } from 'react-native';
import Radio from './Compras/RadioCompra';
import Compra from './Functions/compras.js';

const tituloCompra = (
    <View>
      <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }} > 
        Adicionar Compra
      </Text>
    </View>
);

export default class CompraScreen extends React.Component {
  // Tela para adição de novo Item ou edição de um item já existente
  // PROPS ESPERADAS ===> this.props.navigation.state.params.<NOME>
  // ----Fluxo da aplicação
  // idItem           = (opcional) caso seja repassado, a rotina deverá realizar update no item
  //                               do contrário, criará um Item novo.
  // ----Controle e navegação
  // updateItem  = função da homeScreen para atualizar a tela de itens após alterações
  // navigate    = controle de navegação para permitir a mudança de tela
  // 


  static navigationOptions = { //eslint-disable-line
    headerTitle: tituloCompra,
  };

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      cpLoja: 0,
      cpPromo: '',
      cpData: '',
      cpQtde: 1,
      cpValorU: 0,
    };
    this.selecionaLoja = this.selecionaLoja.bind(this);
    console.log(this.props.navigation.state.params.idItem);
  }

  componentDidMount() {
    this.updateCompra();
  }

  async updateCompra() {
    this.setState({ isLoading: false });
  }

  async salvarCompra() {
    const { goBack } = this.props.navigation;
    const idItem = this.props.navigation.state.params.idItem;

    // Caso o idItem seja repassado, ativa a edição do mesmo
    Compra.novaCompra(
      idItem,
      this.state.cpLoja, 
      this.state.cpData, 
      this.state.cpQtde,
      this.state.cpValorU,
      this.state.cpPromo,
    );

    this.props.navigation.state.params.updateLista();
    goBack();
  }

  selecionaLoja(id) {
    this.setState({ cpLoja: id });
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
      <View style={styles.container} >
        <ScrollView style={styles.topo} >
          <Text style={styles.texto} >Prioridade:</Text>

          <View style={styles.checkView}>

            <Radio />

          </View>

          <Text style={styles.texto} >Item:</Text>
          <TextInput 
            ref='Nome'
            style={styles.input}
            autoCapitalize='sentences'
            returnKeyType='next' 
            maxLength={40}
            placeholder='Ex. Arroz 5kg / Biscoito Recheado'
            onChangeText={(text) => { this.setState({ itemNome: text }); }}
            value={this.state.itemNome}
            onSubmitEditing={() => { 
              this.refs.Descricao.focus(); 
            }}
            onEndEditing={() => { 
              this.refs.Descricao.focus(); 
            }}
          />

          <Text style={styles.texto} >Descrição do item/marca:</Text>
          <TextInput
            ref='Descricao' 
            style={styles.input} 
            autoCapitalize='sentences'
            returnKeyType='next'
            maxLength={40} 
            placeholder='Camil / Passatempo de morango'
            onChangeText={(text) => { this.setState({ itemDescricao: text }); }}
            value={this.state.itemDescricao}
            onSubmitEditing={() => { 
              this.salvarItem(); 
            }}
          />

          <Button
            ref='Salvar'
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
    width: '100%',
    backgroundColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topo: {
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: '#FFF',
    marginTop: 5,
  },
  texto: {
    fontSize: 14,
  },
  input: {
    fontSize: 18,
    color: '#555',
    height: 40,
  },
  checkView: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
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
