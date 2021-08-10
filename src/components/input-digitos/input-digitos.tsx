import { Component, Event, EventEmitter, h, Listen, Prop, State } from '@stencil/core';

@Component({
  tag: 'input-digitos',
  styleUrl: 'input-digitos.css',
  shadow: true,
})
export class InputDigitos {

  @Prop() tamanho: number;
  @Prop() tipoInput: string;
  @Prop() desabilitaInputs: boolean;
  @Prop() alfanumerico: boolean;
  @Prop() digitosExternos: Array<string>;

  @State() quantidadeDigitos: number;
  @State() tipo: string;

  @State() digitos = new Array<string>();
  @State() stringSaida: string;
  @State() conteudo: Array<HTMLInputElement>;
  @Event() enviaStringSaida: EventEmitter<{digitado: boolean, string: string}>;
  
  @Listen('change', { capture: true })
  handleClick(ev) {
    console.log('evento', ev);
    console.log('digitosExternos', this.digitosExternos);
  }

  componentWillLoad() {
    this.digitos = new Array<string>();
    this.quantidadeDigitos = this.tamanho ? this.tamanho : 6;
    this.tipo = this.tipoInput ? this.tipoInput : 'text';
  }

  private gravaDigito(evento, indice: number) {
    const valor = evento.target.value;
    this.digitos[indice] = valor;
    const saida = {
      digitado: this.validaTokenDigitado(),
      string: this.stringSaida
    }
    console.log('saida', saida);
    this.enviaStringSaida.emit(saida);
  }

  private teclaPressionada(evento) {
    if(this.alfanumerico) {
      return;
    }
    var theEvent = evento || window.event;

    // trata copiar e colar no input
    if (theEvent.type === 'paste') {
      key = evento.clipboardData.getData('text/plain');
    } else {
    // trata pressionar a tecla
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }

  }

  validaTokenDigitado(): boolean {
    this.stringSaida = this.digitos.join('');
    return this.stringSaida.length === this.quantidadeDigitos;
  }

  montarCamposToken() {
    this.conteudo = new Array<HTMLInputElement>();
    for (let i = 0; i < this.quantidadeDigitos; i++) {
      this.conteudo.push(
        <input
          type={this.tipo}
          disabled={this.desabilitaInputs}
          value={this.digitos[i]}
          maxlength="1"
          onInput={(event) => this.gravaDigito(event, i)}
          onKeyPress={(event) => {this.teclaPressionada(event)}}
        />)
    }
    return this.conteudo;
  }

  render() {
    return (
      <form>
        {this.montarCamposToken()}
      </form>
    );
  }

}
