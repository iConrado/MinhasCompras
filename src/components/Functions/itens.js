import { AsyncStorage } from 'react-native';
import hashCode from './hashcode';
import Compra from './compras';

var itens = []; //eslint-disable-line

export default class Item {
  static async remocaoManual() {
    try {
      await AsyncStorage.removeItem('itens');
      console.log('Sucesso ao limpar o item');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async salvar() {
    if (itens.length <= 0) {
      try {
        console.log(itens);
        await AsyncStorage.removeItem('itens');
        return true;
      } catch (error) {
        console.log(error);
      return false;
      }
    }

    try {
      await AsyncStorage.setItem('itens', JSON.stringify(itens));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async recuperar() {
    try {
      const l = await AsyncStorage.getItem('itens');
      itens = JSON.parse(l);
      if (l === null) {
        console.log('Item - Não existem dados armazenados no AsyncStorage');
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static removerItem(id) {
    // Verifica se não há uma tentativa de remover mais de um item por chamada
    if (itens.filter((elem) => elem.idItem === id).length !== 1) { return false; }
    
    const temp = itens.filter((elem) => elem.idItem !== id);
    itens = temp;

    // Tenta salvar e retorna o resultado da tentativa
    try {
      Item.salvar();
      //Remove todas as compras asssociadas a este item para otimizar o array salvo no dispositivo
      Compra.removerCompraPorItem(id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static removerItemPorLista(idLista) {
    // Verifica se não há uma tentativa de remover menos de um item por chamada
    console.log(idLista);
    if (itens.filter((elem) => elem.idLista === idLista).length < 1) { return false; }
    
    //Remover compras associadas a estes itens que se´rão removidos pela exclusão da lista
    const tempItem = itens.filter((elem) => elem.idLista === idLista);
    tempItem.map((elem) => Compra.removerCompraPorItem(elem.idItem));

    const temp = itens.filter((elem) => elem.idLista !== idLista);
    itens = temp;

    // Tenta salvar e retorna o resultado da tentativa
    try {
      console.log('Vai entrar no passo 3');
      Item.salvar();
      console.log('Entrou no passo 3');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static novoItem(idL, nome, descricao, prioridade) {
    // ATRIBUTOS DA CLASSE ITEM:
    // ==================================
    // idItem PK (Gerado com hashCode)
    // idLista FK
    // nome
    // descricao
    // prioridade
    // ==================================

    if (idL === null || idL === '') { return false; }
    if (nome === null || nome === '') { return false; }
    if (itens === null) { itens = []; }
    const d = new Date();
    const it = new Item();
    it.idItem = hashCode(d.getTime().toString());
    it.idLista = idL;
    it.nome = nome;
    it.descricao = descricao;
    it.prioridade = prioridade;
    itens.push(it);
    // Tenta salvar e retorna o resultado da tentativa
    try {
      Item.salvar();
      console.log('Item salvo');
      return true;
    } catch (error) {
      console.log(error);
      console.log('Erro ao salvar o novo item criado');
      return false;
    } 
  }

  static editarItem(idItem, nome, descricao, prioridade) {
    if (idItem === null || idItem === '') { return false; }
    if (nome === null || nome === '') { return false; }
    
    const id = itens.reduce((preVal, elem, index) => {
      if (elem.idItem === idItem) {
        return preVal + index;
      } 
      return preVal; 
    }, 0);

    itens[id].nome = nome;
    itens[id].descricao = descricao;
    itens[id].prioridade = prioridade;

    Item.salvar();
  }

  static getItens(idLista) {
    const it = itens.filter((elem) => elem.idLista === idLista);
    // console.log(it);
    return it;
  }

  static getItem(id) { 
    // Teste se retornou mais de um item, caso contrário retorna falso
    if (itens.filter((elem) => elem.idItem === id).length !== 1) { return false; }
    
    // busca a Item específica e retorna um objeto {} ao invés de um array []
    const temp = itens.filter((elem) => elem.idItem === id);
    return temp[0];
  }
}
