import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'token-sms',
  styleUrl: 'token-sms.css',
  shadow: true,
})
export class TokenSms {

  @Prop() tamanho: number;

  @State() quantidadeDigitos: number;

  @State() digitos = new Array<string>();
  @State() tokenString: string;
  @Event() enviaTokenSaida: EventEmitter<{digitado: boolean, token: string}>;

  componentWillLoad() {
    this.digitos = new Array<string>();
    this.quantidadeDigitos = this.tamanho ? this.tamanho : 6;
  }

  gravaDigito(evento, indice: number) {
    const valor = evento.target.value;
    this.digitos[indice] = valor;
    const saida = {
      digitado: this.validaTokenDigitado(),
      token: this.tokenString
    }
    console.log('saida', saida);
    this.enviaTokenSaida.emit(saida);
  }

  validaTokenDigitado(): boolean {
    this.tokenString = this.digitos.join('');
    return this.tokenString.length === this.quantidadeDigitos;
  }

  montarCamposToken() {
    let conteudo = [];
    for (let i = 0; i < this.quantidadeDigitos; i++) {
      conteudo.push(<input type="text" value={this.digitos[i]} maxlength="1" onInput={(event) => this.gravaDigito(event, i)}/>)
    }
    return conteudo;
  }

  @Prop() name: string;

  render() {
    return (
      <form>
        {this.montarCamposToken()}
        {/* <input type="text" value={this.digitos[0]} maxlength="1" onInput={(event) => this.gravaDigito(event, 0)}/>
        <input type="text" value={this.digitos[1]} maxlength="1" onInput={(event) => this.gravaDigito(event, 1)}/>
        <input type="text" value={this.digitos[2]} maxlength="1" onInput={(event) => this.gravaDigito(event, 2)}/>
        <input type="text" value={this.digitos[3]} maxlength="1" onInput={(event) => this.gravaDigito(event, 3)}/>
        <input type="text" value={this.digitos[4]} maxlength="1" onInput={(event) => this.gravaDigito(event, 4)}/>
        <input type="text" value={this.digitos[5]} maxlength="1" onInput={(event) => this.gravaDigito(event, 5)}/> */}
      </form>
      // <Host>
      //   <slot></slot>
      // </Host>
    );
  }

}
