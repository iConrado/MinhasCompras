import React from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  View,
  Button,
  Picker,
  ScrollView } from 'react-native';
import ChartView from 'react-native-highcharts';
//import Lista from './Functions/listas';
import Item from './Functions/itens';
import Compra from './Functions/compras';
import Data from './Functions/datas';
import Loja from './Resumo/lojas';

let its = [];
let cps = [];
let datasPicker = (<Picker.Item label='1' value='1' />);
let itensUnicos = 0;
let itensTotais = 0;
let valorMedio = 0;
let valorTotalCompra = 0;
dados = []; //{ name: 'Nenhuma loja', y: 1 }

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

  calculaEstatistica(data) {
    const tempCps = cps.filter((item) => item.data == data.toJSON());

    valorTotalCompra = tempCps.reduce((atual, elem) => 
    atual + (elem.qtde * elem.valorU), 0);

    itensUnicos = its.length;
    itensTotais = tempCps.reduce((atual, elem) => atual + 1, 0);
    valorMedio = valorTotalCompra / itensTotais;

    //Extrai as lojas com compras na data especifica, remove as duplicatas e soma os valores de compras 
    const tempLojas = tempCps.map((item) => item.idLoja);
    const lojas = tempLojas.filter((item, index, self) => self.indexOf(item) === index);
    dados = [];
    lojas.map(item => dados.push(this.montaItemGrafico(item, tempCps.filter(cps => cps.idLoja === item).reduce((preVal, reduc) => preVal + reduc.valorU, 0))));
  }

  listaLojas(data, coluna) {
    // Função para retornar a lista de lojas com compras
    // data   = data da compra para filtrar o array geral
    // coluna = define o tipo de retorno da função (útil para dividir a lista em duas colunas)
    //          0 - retorna todos as lojas existentes
    //          1 - retorna todas as lojas impares
    //          2 - retorna todas as lojas pares

    const tempCps = cps.filter((item) => item.data == data.toJSON());

    // Obtem a lista de Lojas únicas
    const tempLojas = tempCps.map((item) => item.idLoja);
    const lojas = tempLojas.filter((item, index, self) => self.indexOf(item) === index);


  }

  montaItemGrafico(idLoja, valor) {
    if (idLoja !== undefined || valor !== undefined) {
      const loja = Loja.getNome(idLoja);
      return { name: loja, y: valor };
    }
    return false;
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
        if (cps.length > 0) {
          //Extrai as datas de compras, remove as duplicatas e ordena
          const tempDatas = cps.map((item) => item.data);
          const datas = tempDatas.filter((item, index, self) => self.indexOf(item) === index).map(item => new Date(item));
          datas.sort((a, b) => b - a);

          //Variável que monta a lista de datas do Picker
          datasPicker = datas.map((item, index) => (
            <Picker.Item key={index} label={Data.dataToString(item)} value={item} />
          ));

          this.calculaEstatistica(datas[0]);
          this.setState({ isEmpty: false });
        } else {
          this.setState({ isEmpty: true });
        }
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

    var Highcharts='Highcharts';
    const options = {
      global: {
        useUTC: false
      },
      lang: {
        decimalPoint: ',',
        thousandsSep: '.'
      }
    };
    var conf={
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Compras por Loja'
      },
      series: [
        {
          name: 'Valor gasto',
          data: dados
        }
      ]
    };
    
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            style={{ alignSelf: 'center' }}
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
      <ScrollView style={styles.container}>
        {/* View com o seletor de data da compra */}
        <View style={styles.viewData}> 
          <Text style={{ width: 135, fontWeight: 'bold' }}>Data da compra:</Text>
          <Picker 
            style={styles.picker}
            prompt='Selecione uma data de compra:'
            selectedValue={this.state.data}
            onValueChange={(itemValue) => {this.setState({ data: itemValue }); this.calculaEstatistica(itemValue);}}
          >
            { datasPicker }
          </Picker>
        </View>

        {/* View com as estatística dos Itens */}
        <View style={styles.viewDetalhes}>
          <View style={styles.divisorInterno}>
            <Text style={styles.textoQtde}>Qtde. itens únicos:</Text>
            <Text style={styles.textoQtde}>{itensUnicos}</Text>
          </View>
          <View style={styles.divisorInterno}>
            <Text style={styles.textoQtde}>Qtde. itens comprados:</Text>
            <Text style={styles.textoQtde}>{itensTotais}</Text>
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
           <ChartView 
            style={{height:300, width: 300}} 
            config={conf}
            options={options} 
          />
        </View>        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    //alignItems: 'flex-start',
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
    justifyContent: 'center',
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
  textoQtde: {
    textAlign: 'center',
  },
});
