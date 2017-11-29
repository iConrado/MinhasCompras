import React from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput,
  Button,
  Picker,
  DatePickerAndroid } from 'react-native';
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
    this.updateLoja = this.updateLoja.bind(this);
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

    console.log(idItem);
    console.log(this.state.cpLoja);
    console.log(this.state.cpData);
    console.log(this.state.cpQtde);
    console.log(this.state.cpValorU);
    console.log(this.state.cpPromo);

    // Caso o idItem seja repassado, ativa a edição do mesmo
    /*Compra.novaCompra(
      idItem,
      this.state.cpLoja, 
      this.state.cpData, 
      this.state.cpQtde,
      this.state.cpValorU,
      this.state.cpPromo,
    );*/

    this.props.navigation.state.params.updateLista();
    goBack();
  }

  updateLoja(id) {
    this.setState({ cpLoja: id });
  }

  async renderDatePicker () { 
    const { action, year, month, day } = await DatePickerAndroid.open({ 
      date: new Date() 
    }); 

    if (action === DatePickerAndroid.dismissedAction) { 
      return; 
    } 

    this.setState({ 
      cpData: day + '/' + month + '/' + year 
    }); 
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
          <Text style={styles.texto} >Loja:</Text>

          <View style={styles.checkView}>

            <Radio updateLoja={this.updateLoja} />

          </View>

          <Text
            onLongPress={await this.renderDatePicker()}
          >
            Data: {this.state.cpData}
          </Text>

          <Text style={styles.texto} >Quantidade:</Text>
          <Picker 
            style={styles.picker}
            selectedValue={this.state.cpQtde}
            onValueChange={(itemValue, itemIndex) => this.setState({ cpQtde: itemValue}) }
          >
            <Picker.Item label='1' value={1} />
            <Picker.Item label='2' value={2} />
            <Picker.Item label='3' value={3} />
            <Picker.Item label='4' value={4} />
            <Picker.Item label='5' value={5} />
            <Picker.Item label='6' value={6} />
            <Picker.Item label='7' value={7} />
            <Picker.Item label='8' value={8} />
            <Picker.Item label='9' value={9} />
            <Picker.Item label='10' value={10} />
            <Picker.Item label='11' value={11} />
            <Picker.Item label='12' value={12} />
            <Picker.Item label='13' value={13} />
            <Picker.Item label='14' value={14} />
            <Picker.Item label='15' value={15} />
            <Picker.Item label='16' value={16} />
            <Picker.Item label='17' value={17} />
            <Picker.Item label='18' value={18} />
            <Picker.Item label='19' value={19} />
            <Picker.Item label='20' value={20} />
          </Picker>

          <Text style={styles.texto} >Valor unitário:</Text>
          <TextInput 
            ref='valorU'
            style={styles.input}
            autoCapitalize='sentences'
            keyboardType='numeric'
            returnKeyType='send' 
            maxLength={40}
            placeholder='R$ 0,00'
            onChangeText={(text) => { this.setState({ cpValorU: text }); }}
            value={this.state.cpValorU}
            onSubmitEditing={() => { 
              this.salvarCompra(); 
            }}
          />

          <Text style={styles.texto} >Valor total (R$):</Text>
          <Text style={styles.textoValorT} >{this.state.cpValorU * this.state.cpQtde}</Text>

          <Button
            style={styles.botao}
            ref='Salvar'
            title='Salvar Item'
            onPress={() => this.salvarCompra()}
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
  textoValorT: {
    height: 40,
    fontSize: 18,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    textAlignVertical: 'bottom',
    marginBottom: 10,
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
  picker: {
    width: 120,
  },
  textoCheck: {
    width: 60,
  },
});
