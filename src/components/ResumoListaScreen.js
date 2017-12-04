import React from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  View,
  Button,
  Picker, } from 'react-native';
//import Lista from './Functions/listas';
import Item from './Functions/itens';
import Compra from './Functions/compras';
import Data from './Functions/datas';

let its = [];
let cps = [];
let datasPicker = (<Picker.Item label='1' value='1' />);
let itensUnicos = 0;
let itensTotais = 0;
let valorMedio = 0;
let valorTotalCompra = 0;

const tituloLista = (titulo) => (
  <View>
    <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }} > 
      Histórico
    </Text>
    <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }} > 
      {titulo}
    </Text>
  </View>
);

export default class ResumoListaScreen extends React.Component {
  // Tela de Resumo de uma determinada lista contendo o relatório e estatísticas
  // Props esperadas:
  // idLista     = id da Lista que será usada para resgatar os dados
  // nome        = nome da Lista para renderizar o título da navegação

  static navigationOptions = ({ navigation }) => ({ //eslint-disable-line
    headerTitle: tituloLista(navigation.state.params.nome),
  });

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      isEmpty: true,      
      data: '',
    };
  } 

  componentDidMount() {
    try {
      if (this.updateLista()) {
        console.log('ResumoListaScreen - Conseguiu atualizar o resumo da lista');
      } else {
        console.log('ResumoListaScreen - Erro. Não conseguiu atualizar o resumo da lista');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateLista() {
    this.setState({
      isLoading: true,
      isEmpty: true,
    });

    const id = this.props.navigation.state.params.idLista;

    try {
      if (await Item.recuperar()) {
      its = await Item.getItens(id);
      }
    } catch (error) {
      console.log(error);
    }

    try {
      if (await Compra.recuperar()) {
        // Caso existem compras registradas
        cps = Compra.getComprasMultiplas(its);
        const tempDatas = cps.map((item) => new Date(item.data));
        const datas = tempDatas.filter((item, index, self) => self.indexOf(item) === index);
        datas.sort((a, b) => b - a);

        //Variável que monta a lista de datas do Picker
        datasPicker = datas.map((item, index) => (
          <Picker.Item key={index} label={Data.dataToString(item)} value={item} />
        ));

        valorTotalCompra = cps.reduce((atual, elem) => 
        atual + (elem.qtde * elem.valorU), 0);

        itensUnicos = its.length;
        itensTotais = cps.reduce((atual, elem) => atual + elem.qtde, 0);
        valorMedio = valorTotalCompra / itensTotais;
        //cps.sort((a, b) => Date.parse(b.data) - Date.parse(a.data));
        /*const mapaCompras = cps.map((elem, index) => (
          
        ));*/

        /*let ultimo = 0;
        let media = 0;
        let menor = 0;
        if (cps[0] !== undefined) {
          ultimo = cps[0].valorU;
          media = cps.reduce((total, item) => total + item.valorU, 0) / cps.length;
          cps.sort((a, b) => a.valorU - b.valorU);
          menor = cps[0].valorU;
        }*/

        this.setState({ isEmpty: false });
      } else {
        // Caso não existam compras registradas
        this.setState({ isEmpty: true });
      }
      // Instruções independentes de haver ou não compras

      this.setState({ isLoading: false });
      return true;
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
      return false;
    }
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

    if (this.state.isEmpty) {
      return (
        <View style={styles.container}>
          <View style={styles.corpo}>
            <Text style={styles.textoInstrucoes}>
              Sua lista ainda não possui nenhum registro de compras.
            </Text>
            <Text style={styles.textoInstrucoes}>
              Experimente incluir informações sobre suas últimas 
              compras para obter uma análise.
            </Text>
          </View>
          <View style={styles.rodapeNovo}>
            <Button
              title='Voltar'
              onPress={() => goBack()}
            />
          </View>
        </View>
      );
    }

    // Renderização em caso de sucesso ao recuperar as compras
    return (
      <View style={styles.container}>
        {/* View com o seletor de data da compra */}
        <View style={styles.viewData}> 
          <Text style={{ width: 135, fontWeight: 'bold' }}>Data:</Text>
          <Picker 
            style={styles.picker}
            prompt='Selecione uma data de compra:'
            selectedValue={this.state.data}
            onValueChange={(itemValue) => this.setState({ data: itemValue })}
          >
            { datasPicker }
          </Picker>
        </View>

        {/* View com as estatística dos Itens */}
        <View style={styles.viewDetalhes}>
          <View style={styles.divisorInterno}>
            <Text>Qtde. itens únicos: {itensUnicos}</Text>
            <Text>Qtde. itens totais: {itensTotais}</Text>
          </View>
          <View style={styles.divisorInterno}>
            <Text style={{ textAlign: 'center' }}>
              Valor médio por item:
            </Text>
            <Text style={{ textAlign: 'center' }}>
              R$ {valorMedio.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>

        {/* View com o valor total da compra */}
        <View style={styles.viewDetalhes}>
          <View style={styles.divisorInterno}>
            <Text style={styles.txtCompra}>Valor total da compra:</Text>
          </View>
          <View style={styles.divisorInterno}>
            <Text style={styles.txtCompra}>R$ {valorTotalCompra.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>

        {/* View com as estatísticas de gastos por loja */}
        <View style={styles.viewDetalhes}>
          <View style={styles.divisorInterno}>
            <Text>Gasto por loja:</Text>
          </View>
          <View style={styles.divisorInterno}>
            <Text>Loja1 (componente para gerar a estatística por loja)</Text>
          </View>
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingHorizontal: 5,
    //justifyContent: 'flex-start',
  },
  textoInstrucoes: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 15,
  },
  corpo: {
    flex: 1,
    paddingTop: 5,
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
  viewData: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  viewDetalhes: {
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  divisorInterno: {
    flex: 1,
  },
  picker: {
    height: 40,
    width: 150,
    borderWidth: 1,
    borderColor: '#000',
  },
  txtCompra: {
    marginVertical: 5,
    fontSize: 17,
    color: '#2D37E7',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
