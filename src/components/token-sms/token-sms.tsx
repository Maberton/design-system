import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'token-sms',
  styleUrl: 'token-sms.css',
  shadow: true,
})
export class TokenSms {

  @Prop() quantidadeDigitos = 6;

  @State() digitado: boolean;
  @State() digitos = new Array<string>();
  @State() tokenString: string;
  @Event() enviaTokenSaida: EventEmitter<{digitado: boolean, token: string}>;

  submitValoresForm(evento) {
    // this.enviaTokenSaida.emit({digitado: this.digitado, token: ''})
    evento.preventDefault();
    return;
  }

  somenteNumero(evento): boolean {
    const ASCIICode = (evento.which) ? evento.which : evento.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
      return false;
    } 

    return true;
  }

  gravaDigito(evento, indice: number) {
    const valor = evento.target.value;
    this.digitos[indice] = valor;
    const saida = {
      digitado: this.tokenDigitado(),
      token: this.tokenString
    }
    console.log('saida', saida);
    this.enviaTokenSaida.emit(saida);
  }

  tokenDigitado(): boolean {
    this.tokenString = this.digitos.join('');
    return this.tokenString.length === 6;
  }

  @Prop() name: string;

  render() {
    return (
      <form onSubmit={(e) => this.submitValoresForm(e)}>
        <input type="text" value={this.digitos[0]} maxlength="1" onInput={(event) => this.gravaDigito(event, 0)}/>
        <input type="text" value={this.digitos[1]} maxlength="1" onInput={(event) => this.gravaDigito(event, 1)}/>
        <input type="text" value={this.digitos[2]} maxlength="1" onInput={(event) => this.gravaDigito(event, 2)}/>
        <input type="text" value={this.digitos[3]} maxlength="1" onInput={(event) => this.gravaDigito(event, 3)}/>
        <input type="text" value={this.digitos[4]} maxlength="1" onInput={(event) => this.gravaDigito(event, 4)}/>
        <input type="text" value={this.digitos[5]} maxlength="1" onInput={(event) => this.gravaDigito(event, 5)}/>
      </form>
      // <Host>
      //   <slot></slot>
      // </Host>
    );
  }

}
