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
  CheckBox } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Radio from './Compras/RadioCompra';
import Compra from './Functions/compras';
import Data from './Functions/datas';

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
    const d = new Date();
    this.state = { 
      isLoading: true,
      cpData: Data.dataToString(d),
      cpLoja: 1,
      cpQtde: 1,
      cpValorU: '0',
      cpPromo: false,
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

    /*console.log(idItem);
    console.log(this.state.cpData);
    console.log(Data.stringToData(this.state.cpData));
    console.log(this.state.cpLoja);
    console.log(this.state.cpQtde);
    console.log(parseFloat(this.state.cpValorU.replace(',', '.')));
    console.log(this.state.cpPromo);*/

    // Caso o idItem seja repassado, ativa a edição do mesmo
    try {
      Compra.novaCompra(
        idItem,
        Data.stringToData(this.state.cpData), 
        this.state.cpLoja, 
        this.state.cpQtde,
        parseFloat(this.state.cpValorU.replace(',', '.')),
        this.state.cpPromo,
      );
    } catch (error) {
      console.log(error);
    }
    console.log(this.state.cpPromo);
    this.props.navigation.state.params.updateLista();
    goBack();
  }

  updateLoja(id) {
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
          <DatePicker
            style={{ width: 150 }}
            date={this.state.cpData}
            mode='date'
            placeholder='Selecione uma data'
            format='DD/MM/YYYY'
            minDate='01/01/2010'
            maxDate='31/12/2050'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { this.setState({ cpData: date }); }}
          />

          <Text style={styles.texto} >Loja:</Text>
          <View style={styles.checkView}>
            <Radio updateLoja={this.updateLoja} />
          </View>

          <View style={styles.organizer}>
            <Text style={styles.texto} >Quantidade:</Text>
            <Picker 
              style={styles.picker}
              selectedValue={this.state.cpQtde}
              onValueChange={(itemValue) => this.setState({ cpQtde: itemValue })}
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
          </View>

          <View style={styles.organizer}>
            <Text style={styles.texto} >Valor unitário:</Text>
            <TextInput 
              ref='valorU'
              style={styles.input}
              autoCapitalize='sentences'
              selectTextOnFocus
              keyboardType='numeric'
              returnKeyType='next' 
              maxLength={40}
              placeholder='R$ 0,00'
              onChangeText={(text) => { this.setState({ cpValorU: text }); }}
              value={this.state.cpValorU}
            />
          </View>

          <View style={styles.organizer}>
            <Text style={styles.texto} >Valor total (R$):</Text>
            <Text style={styles.textoValorT} >
              {parseFloat((this.state.cpValorU.replace(',', '.')) * 
                this.state.cpQtde).toString().replace('.', ',')}
            </Text>
          </View>

          <View style={styles.organizerCentro}>
            <CheckBox
              onValueChange={(valor) => this.setState({ cpPromo: valor })}
              value={this.state.cpPromo}
            />
            <Text style={styles.texto}>Promoção</Text>
          </View>

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
  organizer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  organizerCentro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  texto: {
    fontSize: 14,
    width: 100,
  },
  textoValorT: {
    flex: 1,
    height: 40,
    fontSize: 18,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    textAlignVertical: 'bottom',
    marginBottom: 10,
    textAlign: 'center',
    marginHorizontal: 3,
  },
  input: {
    fontSize: 18,
    color: '#555',
    height: 40,
    flex: 1,
    textAlign: 'center',
  },
  checkView: {
    flexDirection: 'row',
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  picker: {
    flex: 1,
  },
  textoCheck: {
    width: 60,
  },
});
