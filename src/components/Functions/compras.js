import { AsyncStorage } from 'react-native';
import hashCode from './hashcode';

var compras = []; //eslint-disable-line

export default class Compra {
  static async remocaoManual() {
    try {
      await AsyncStorage.removeItem('compras');
      console.log('Sucesso ao limpar a compra');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async salvar() {
    if (compras.length <= 0) {
      try {
        await AsyncStorage.removeItem('compras');
        return true;
      } catch (error) {
        console.log(error);
      return false;
      }
    }

    try {
      await AsyncStorage.setItem('compras', JSON.stringify(compras));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async recuperar() {
    try {
      const c = await AsyncStorage.getItem('compras');
      compras = JSON.parse(c);
      if (c === null) {
        console.log('Compra - Não existem dados armazenados no AsyncStorage');
        return false;
      }
      console.log('Compra - recuperadas com sucesso');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static removerCompra(id) {
    // Verifica se não há uma tentativa de remover mais de uma compra por chamada
    if (compras.filter((elem) => elem.idCompra === id).length !== 1) { return false; }
    
    const temp = compras.filter((elem) => elem.idCompra !== id);
    compras = temp;

    // Tenta salvar e retorna o resultado da tentativa
    try {
      Compra.salvar();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static removerCompraPorItem(idItem) {
    // Verifica se não há uma tentativa de remover menos de uma compra por chamada
    if (compras.filter((elem) => elem.idItem === idItem).length < 1) { return false; }
    
    const temp = compras.filter((elem) => elem.idItem !== idItem);
    compras = temp;

    // Tenta salvar e retorna o resultado da tentativa
    try {
      Compra.salvar();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static novaCompra(idI, data, idLoja, qtde, valorU, promocao) {
    // ATRIBUTOS DA CLASSE COMPRA:
    // ==================================
    // idCompra PK (Gerado com hashCode)
    // idItem FK
    // data
    // idLoja
    // qtde
    // valorU   (valor unitário)
    // promocao (booleano)
    // ==================================

    if (idI === null || idI === '') { return false; }
    if (compras === null) { compras = []; }
    const d = new Date();
    const cp = new Compra();
    cp.idCompra = hashCode(d.getTime().toString());
    cp.idItem = idI;
    cp.data = data;
    cp.idLoja = idLoja;
    cp.qtde = qtde;
    cp.valorU = valorU;
    cp.promocao = promocao;
    compras.push(cp);
    // Tenta salvar e retorna o resultado da tentativa
    try {
      Compra.salvar();
      console.log('Compra salva');
      return true;
    } catch (error) {
      console.log(error);
      console.log('Erro ao salvar a nova compra');
      return false;
    } 
  }

  static getCompras(idItem) {
    const cp = compras.filter((elem) => elem.idItem === idItem);
    // console.log(it);
    return cp;
  }

  static getComprasMultiplas(arrItens) {
    //Retorna um array com todos os objetos de compras relacionados a um array de Itens
    if (compras === null) { return false; }
    const cps = [];
    const temp = arrItens.map(item => compras.filter((elem) => elem.idItem === item.idItem));
    temp.map(item => item.map(item2 => cps.push(item2)));
    return cps;
  }

  static getCompra(id) { 
    // Teste se retornou mais de um item, caso contrário retorna falso
    if (compras.filter((elem) => elem.idCompra === id).length !== 1) { return false; }
    
    // busca a Item específica e retorna um objeto {} ao invés de um array []
    const temp = compras.filter((elem) => elem.idCompra === id);
    return temp[0];
  }
}
