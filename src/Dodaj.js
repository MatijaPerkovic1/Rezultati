import React, {Component} from 'react'
const uuidv1 = require('uuid/v1');

class Dodaj extends Component {
  constructor() {
  	super()
  	this.state = {
  		pocetakUtakmice: "",
  		krajUtakmice: "",
  		prviTim: "",
  		drugiTim: ""
  	}
  	this.handleChange = this.handleChange.bind(this)
  	this.dodajUtakmicu = this.dodajUtakmicu.bind(this)
  }

  handleChange(event) {
  	const {name, value} = event.target
  	this.setState({[name]: value})
  }

  dodajUtakmicu(event) {
    const pocetak = new Date(this.state.pocetakUtakmice)
    const kraj = new Date(pocetak.getTime() + 90*60000)
  	let novaUtakmica = {
  		id: uuidv1(),
  		pocetakUtakmice: pocetak,
  		krajUtakmice: kraj,
  		prviTim: this.state.prviTim,
  		drugiTim: this.state.drugiTim,
      goloviPT: 0,
      goloviDT: 0
  	}
  	fetch('http://localhost:8080/utakmice', {
  		"body": JSON.stringify(novaUtakmica),
  		"headers": {
  			"Accept": "application/json",
  			"Content-Type": "application/json"
  		},
  		"method": "POST"
  	}).then((response) => response.json())

  }
  render() {
    return (
      <div>
        <form onSubmit={this.dodajUtakmicu}>
          Prvi tim: <input type="text" value={this.state.prviTim} name="prviTim" onChange={this.handleChange} />
          <br />
        	Drugi tim: <input type="text" value={this.state.drugiTim} name="drugiTim" onChange={this.handleChange} />
        	<br />
        	Početak utakmice: <input type="datetime-local" value={this.state.pocetakUtakmice} name="pocetakUtakmice" onChange={this.handleChange} />
        	<br />
        	<input type="submit" value="Dodaj" />
        </form>
      </div>
    )
  }
}

export default Dodaj;
