import React from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  View, 
  Button, 
  Image, 
  ScrollView,
  Text,
  Modal,
  TextInput,
  Alert } from 'react-native';

import Listagem from './Home/listagem';
import Lista from './Functions/listas';

const logo = require('../imgs/logo.gif');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#DDD',
    justifyContent: 'space-between',
  },
  barraTitulo: {
    backgroundColor: 'red',
  },
  logo: {
    alignSelf: 'center',
    height: 40,
    width: 205,
  },
  textoNovo: {
    color: '#5685E2',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  corpo: {
    flex: 1,
    paddingTop: 10,
  },
  rodape: {
    height: 50,
    marginHorizontal: 10,
  },
  alteraNome: {
    backgroundColor: '#FFF',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 15,
    height: '70%',
    marginTop: 45,
    marginHorizontal: 10,
    padding: 10,
    justifyContent: 'center'
  },
  inputNome: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 0, 
    fontWeight: 'bold',
    fontSize: 18,
    color: '#555',
    paddingHorizontal: 5,
    marginBottom: 30,
    marginTop: 5,
  },
});


const imgLogo = (
  <Image source={logo} style={styles.logo} />
);

export default class HomeScreen extends React.Component {
  static navigationOptions = { //eslint-disable-line
    headerTitle: imgLogo,
    headerBackTitle: 'Voltar',
  };

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      isNew: true,
      modalVisible: false,
      novoNome: '',
    };
    this.updateLista = this.updateLista.bind(this);
  }

  componentDidMount() {
    this.updateLista();
  }

  setModalVisible() {
    const md = !this.state.modalVisible;
    this.setState({ modalVisible: md });
  }

  async novaLista() {
    if (this.state.novoNome.length <= 3) { return false; }

    const nome = this.state.novoNome;
    
    try {
      Lista.novaLista(nome);
    } catch (error) {
      Alert.alert('', 'Erro na gravação da lista.');
      console.log(error);
    }
    this.setModalVisible();
    this.setState({ novoNome: '' });
    this.updateLista();
  }

  async updateLista() {
    //Lista.remocaoManual();
    /*Lista.novaLista('Lista de Compras Mensal');
    Lista.novaLista('Lista de Compras Semanal');*/
    /*Lista.removerLista();*/

    this.setState({ isLoading: true });

    if (await Lista.recuperar()) {
      this.setState({ isNew: false });
    } else {
      this.setState({ isNew: true });
    }

    this.setState({ isLoading: false }); 
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

    if (this.state.isNew) {
      return (
        <View style={styles.container}>
          {/*=====MODAL=====*/}
          <Modal 
            animationType='slide'
            transparent
            style={{ backgroundColor: '#000' }}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible()}
          >
            <View style={styles.alteraNome}>
            <View>
              <Text>Digite o nome da lista:</Text>
              <TextInput
                style={styles.inputNome}
                autoFocus
                maxLength={40}
                placeholder='Ex.: Lista de compras semanal'
                autoCapitalize='sentences'
                selectTextOnFocus
                onChangeText={(text) => this.setState({ novoNome: text })}
                value={this.state.novoNome}
              />
              <Button 
                onPress={() => { this.novaLista(); }} 
                title='Salvar' 
              />
              <Text style={{ marginTop: 30, textAlign: 'center', fontSize: 11 }}>
                Para cancelar, pressione o botão 'voltar' de seu aparelho
              </Text>
            </View>
           </View>
          </Modal>
          {/*=====MODAL=====*/}
          <View style={styles.corpo}>
            <Text style={styles.textoNovo}>
              Clique no botão abaixo para incluir uma nova lista ;)
            </Text>
          </View>
          <View style={styles.rodape}>
            <Button
              title='Nova Lista'
              onPress={() => this.setModalVisible()}
            />
          </View>
        </View>
      );
    } else { //eslint-disable-line
      const base = Lista.getListas();
      const mapaLista = base.map((elem, index) => (
        <Listagem 
          key={index} 
          idLista={elem.idLista} 
          nome={elem.nome}
          updateLista={this.updateLista} 
          navigate={this.props.navigation} 
        />
      ));

      return (
        <View style={styles.container}>
          {/*=====MODAL=====*/}
          <Modal 
            animationType='slide'
            transparent
            style={{ backgroundColor: '#000' }}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible()}
          >
            <View style={styles.alteraNome}>
              <View>
                <Text>Digite o nome da lista:</Text>
                <TextInput
                  style={styles.inputNome}
                  autoFocus
                  maxLength={40}
                  placeholder='Ex.: Lista de compras semanal'
                  autoCapitalize='sentences'
                  selectTextOnFocus
                  onChangeText={(text) => this.setState({ novoNome: text })}
                  value={this.state.novoNome}
                />
                <Button 
                  onPress={() => { this.novaLista(); }} 
                  title='Salvar' 
                />
                <Text style={{ marginTop: 30, textAlign: 'center', fontSize: 11 }}>
                  Para cancelar, pressione o botão 'voltar' de seu aparelho
                </Text>
              </View>
           </View>
          </Modal>
          {/*=====MODAL=====*/}
          <ScrollView 
            style={styles.corpo}
          >
            {/* VARIÁVEL COM O COMPONENTE QUE CONSTROI A LISTA*/}
            {mapaLista}
          </ScrollView>
          <View style={styles.rodape}>
            <Button
              title='Nova Lista'
              onPress={() => this.setModalVisible()}
            />
          </View>
        </View>
      );
    }
  }
}
