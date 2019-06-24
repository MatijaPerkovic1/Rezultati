import React, {Component} from 'react';
class Utakmica extends Component {

	constructor(props){
		let sada = new Date()
		let pocetakUtakmice = new Date(props.utakmica.pocetakUtakmice)
		let razlika = (sada - pocetakUtakmice) / (60000)
		let minute = Math.trunc(razlika)
		super()
		this.state = {
			prviTim: props.utakmica.prviTim,
			drugiTim: props.utakmica.drugiTim,
			pocetakUtakmice: props.utakmica.pocetakUtakmice,
			krajUtakmice: props.utakmica.krajUtakmice,
			trenutnaMinuta: minute,
			goloviPT: 0,
			goloviDT: 0
		}
		this.povecajGolove = this.povecajGolove.bind(this)
		this.mijenjajMinute = this.mijenjajMinute.bind(this)
	}

	povecajGolove(e, ime){
		this.setState(prevState => 
		({
			 [ime]: prevState[ime] + 1
		}))
	}
	mijenjajMinute(){
		setTimeout(() =>
			this.setState(prevState => 
			({
				 trenutnaMinuta: prevState.trenutnaMinuta + 1
			}))
		,  60 * 1000)

	}
	render() {
		let pocetakUtakmice = new Date(this.state.pocetakUtakmice)
		let krajUtakmice = new Date(this.state.krajUtakmice)
		let uzivo = false
		let buduce = false
		let proslo = false

		let pocetakNatpis = "Početak: " + pocetakUtakmice.toLocaleString('hr-HR')
		let krajNatpis = "Kraj: " + krajUtakmice.toLocaleString('hr-HR')

		let goloviPT = this.state.goloviPT
		let goloviDT = this.state.goloviDT

		let sada = new Date().getTime()
		var minute
		//Uživo utakmica
		if(pocetakUtakmice < sada && krajUtakmice > sada){
			uzivo = true

			minute += "'"
		}
		//Buduća utakmica
		if(pocetakUtakmice > new Date().getTime()){
			buduce = true
		}
		//Prosla utakmica
		if(krajUtakmice < new Date().getTime()){
			proslo = true
		}
		this.mijenjajMinute();
		return (
		<div className="utakmica">
		  	<div id="imena">
		  		<b>{this.state.prviTim} </b>
		  		{uzivo && <button onClick={(e) => this.povecajGolove(e, "goloviPT")}>+</button>}
		  		 {(uzivo || proslo) && goloviPT} - {(uzivo || proslo) && goloviDT} 
		  		{uzivo && <button onClick={(e) => this.povecajGolove(e, "goloviDT")}>+</button>}
		  		<b> {this.state.drugiTim}</b>
		  	</div>
			<p>{uzivo && this.state.trenutnaMinuta + "'"}</p>
			<p>{(proslo || buduce) && pocetakNatpis}</p>
      	</div>
		)
	}
}

export default Utakmica;
