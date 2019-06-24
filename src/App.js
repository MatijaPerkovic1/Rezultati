import React, {Component} from 'react';
import './App.css';
import Utakmica from './Utakmica';
import Dodaj from './Dodaj'

class App extends Component {
  constructor() {
    super()
    this.state = {
      utakmice: [],
      prikazaneUtakmice: [],
      pokaziDodaj: false
    }
    this.promjeniUtakmice = this.promjeniUtakmice.bind(this);
    this.pokaziDodaj = this.pokaziDodaj.bind(this);
  }
  //Dohvaća sve utakmice iz baze i sprema ih u state
  componentDidMount(){
    fetch("http://localhost:8080/utakmice").
      then((Response) => Response.json()).
        then ((findresponse)=>
          {
            this.setState({
              utakmice: [findresponse][0]
             });
          });
  }
  //Učitava sve gotove utakmice
  ucitajProsle(utakmice) {
    let prosleUtakmice =  [];
    utakmice.forEach(function(utakmica) {
      if(new Date(utakmica.krajUtakmice) < new Date().getTime()){
        prosleUtakmice.push(utakmica)
      }
    });
    this.setState({
      prikazaneUtakmice: prosleUtakmice,
      pokaziDodaj: false
    })
  }
  //Učitava sve buduće utakmice
  ucitajBuduce(utakmice) {
    let buduceUtakmice =  [];
    utakmice.forEach(function(utakmica) {
      if(new Date(utakmica.pocetakUtakmice) > new Date().getTime()){
        buduceUtakmice.push(utakmica);
      }
    });
    this.setState({
      prikazaneUtakmice: buduceUtakmice,
      pokaziDodaj: false
    })
  }
  //Učitava utakmice koje su trenutno aktivne
  ucitajUzivo(utakmice) {
    let uzivo =  []
    let trenutnoVrijeme = new Date().getTime()
    utakmice.forEach(function(utakmica) {
      if(new Date(utakmica.pocetakUtakmice) < trenutnoVrijeme && new Date(utakmica.krajUtakmice) > trenutnoVrijeme){
        uzivo.push(utakmica)
      }
    });
    this.setState({
      prikazaneUtakmice: uzivo,
      pokaziDodaj: false
    })
  }
  //Mijenja trenutni prikaz ovisno o izboru
  promjeniUtakmice(izbor, e) {
    switch(izbor){
      case 1:
        this.ucitajProsle(this.state.utakmice);
        break;
      case 2:
        this.ucitajUzivo(this.state.utakmice);
        break;
      case 3:
        this.ucitajBuduce(this.state.utakmice);
        break;
    }
  }
  //Prikaz komponente za dodavanje nove utakmice
  pokaziDodaj(){
    this.setState({
      pokaziDodaj: true,
      prikazaneUtakmice: [] //Micanje prikaza utakmica
    })
  }
  render() {
    const prikazaneUtakmice = this.state.prikazaneUtakmice.map(utakmica =>  <Utakmica key={utakmica.id} utakmica={utakmica} />)
    return (
      <div>
      <h1>Rezultati</h1>
      <ul>
        <li onClick={this.promjeniUtakmice.bind(this, 1)}><a>Prošli</a></li>
        <li onClick={this.promjeniUtakmice.bind(this, 2)}><a>Uživo</a></li>
        <li onClick={this.promjeniUtakmice.bind(this, 3)}><a>Budući</a></li>
        <li onClick={this.pokaziDodaj}><a>Dodaj novo</a></li>
      </ul>
      {prikazaneUtakmice}
      {this.state.pokaziDodaj && <Dodaj />}
      </div>
    )
  }
}

export default App;
