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

export default class ItemScreen extends React.Component {
  static navigationOptions = { //eslint-disable-line
    headerTitle: tituloItem,
  };

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      prioAlta: false,
      prioMedia: false,
      prioBaixa: false,
    };
  }

  componentDidMount() {
    this.updateLista();
  }

  async updateLista() {
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

    return (
        <View style={styles.container}>
          <ScrollView style={styles.topo} >

            <Text style={styles.texto} >Item:</Text>
            <TextInput 
              style={styles.input} 
              placeholder='Ex. Arroz 5kg / Biscoito Recheado'
            />

            <Text style={styles.texto} >Descrição do item/marca:</Text>
            <TextInput 
              style={styles.input} 
              placeholder='Camil / Passatempo de morango'
            />

            <Text style={styles.texto} >Prioridade:</Text>

            <View style={styles.checkView}>

              <Radio />

            </View>

            <Button
              title='Salvar Item'
              onPress={() => goBack()}
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
