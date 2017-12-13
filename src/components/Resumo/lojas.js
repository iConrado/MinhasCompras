import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const img = [];
img[0] = require('../../imgs/img0.png');
img[1] = require('../../imgs/img1.gif');
img[2] = require('../../imgs/img2.jpg');
img[3] = require('../../imgs/img3.png');
img[4] = require('../../imgs/img4.png');
img[5] = require('../../imgs/img5.jpeg');
img[6] = require('../../imgs/img6.jpg');

export default class Loja extends React.Component {
  // PROPS ESPERADAS
  // -----------------------------
  // idLoja     = Id da loja para renderização da imagem
  // nome       = nome da loja
  // valor      = valor total da compra na respectiva loja
  // percentual = percentual da compra na respectiva loja
  //

  static getNome(idLoja) {
    switch (idLoja) {
      case 1:
        return 'Extra';
      case 2:
        return 'Carrefour';
      case 3:
        return 'Walmart';
      case 4:
        return 'Sams Club';
      case 5:
        return 'Atacadão';
      case 6:
        return 'Dia a Dia';
      default:
        return '';
    }
  }

	constructor(props){
    super(props);
    const idLoja = 0;
    const nome = '';
    const valor = 0;
    const percentual = 0;

    if (this.props.idLoja !== null) {
      this.state = {
        idLoja: this.props.idLoja,
        nome: this.props.nome,
        valor: this.props.valor,
        percentual: this.props.percentual,
      };
    } else {
      this.state = {
        idLoja: idLoja,
        nome: nome,
        valor: valor,
        percentual: percentual,
      };
    }
	}

	render() {
    const idLoja = this.props.idLoja
		return (
      <Image
        source={img[idLoja]}
        style={styles.imagem}
      />
    );
	}
} 

const styles = StyleSheet.create({
  imagem: {
    height: 15,
    width: 15,
    alignSelf: 'center',
  }
});