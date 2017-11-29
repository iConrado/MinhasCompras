import { AsyncStorage } from 'react-native';
import hashCode from './hashcode';
import Item from './itens';

var listas = []; //eslint-disable-line

export default class Lista {
  static async remocaoManual() {
    try {
      await AsyncStorage.removeItem('listas');
      console.log('Sucesso ao limpar a lista');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async salvar() {
    if (listas.length <= 0) {
      try {
        await AsyncStorage.removeItem('listas');
        return true;
      } catch (error) {
        console.log(error);
      return false;
      }
    }

    try {
      await AsyncStorage.setItem('listas', JSON.stringify(listas));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async recuperar() {
    try {
      const l = await AsyncStorage.getItem('listas');
      listas = JSON.parse(l);
      if (l === null) {
        console.log('Não existem dados armazenados no AsyncStorage');
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static removerLista(id) {
    // Verifica se há exatamente uma lista informada para poder prosseguir
    if (listas.filter((elem) => elem.idLista === id).length !== 1) { return false; }

    const temp = listas.filter((elem) => elem.idLista !== id);
    listas = temp;

    // Tenta salvar e retorna o resultado da tentativa
    try {
      Lista.salvar();
      //Remove todos os itens associados a esta lista para otimizar o array salvo no dispositivo
      Item.removerItemPorLista(id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static novaLista(nm) {
    // ATRIBUTOS DA CLASSE LISTA:
    // ==================================
    // idLista PK (Gerado com hashCode)
    // nome
    // ==================================

    if (nm === null || nm === '') { return false; }
    if (listas === null) { listas = []; }
    const d = new Date();
    const ls = new Lista();
    ls.idLista = hashCode(d.getTime().toString());
    ls.nome = nm;
    listas.push(ls);

    // Tenta salvar e retorna o resultado da tentativa
    try {
      Lista.salvar();
      return true;
    } catch (error) {
      console.log(error);
      console.log('Erro ao salvar a nova lista criada');
      return false;
    } 
  }

  static getListas() {
    return listas;
  }

  static getLista(id) { 
    // Teste se retornou mais de um item, caso contrário retorna falso
    if (listas.filter((elem) => elem.idLista === id).length !== 1) { return false; }
    
    // busca a lista específica e retorna um objeto {} ao invés de um array []
    const temp = listas.filter((elem) => elem.idLista === id);
    return temp[0];
  }
}
