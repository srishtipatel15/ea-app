import React, {Component} from 'react';
import {Doughnut,Bar} from 'react-chartjs-2';
import axios from 'axios';

class Chart extends Component{
	constructor(props){
		super(props);

		var keys;
		var values ; 
		console.log(props.name)
		switch(props.name){
			case 'Program Percentage':
				keys = Object.keys(JSON.parse(window.localStorage.getItem('programPercentages')));
				values = Object.values(JSON.parse(window.localStorage.getItem('programPercentages')));
				break;
			case 'Race Ethnicity':
				keys = Object.keys(JSON.parse(window.localStorage.getItem('raceEthnicity')));
				values = Object.values(JSON.parse(window.localStorage.getItem('raceEthnicity')));
				break;
		}
		
    	var colors = []
    	for (var i = 0; i<keys.length; i++){
	    	colors.push('#'+Math.floor(Math.random()*16777215).toString(16))
	    }


		this.state = {
			labels : keys,
			datasets: [{
        data: values,
        backgroundColor: colors,
    }]
		}
	}

	static defaultProps = {
		displayTitle :true,
		displayLegend:true,
		legendPosition:'right'
	}


	render(){
		return(
			<div className = "chart">
			<Doughnut
			  data= {{
			  	labels: this.state.labels,
			  	datasets: this.state.datasets
			  }}
			  width={1000}
			  height={900}
			  options={{
			  	maintainAspectRatio:false, 
			  	title : {
			  		display:this.props.displayTitle,
			  		text: this.props.name,
			  		fontsize: 55
			  	},
			  	legend: {
			  		display: this.props.displayLegend,
			  		position:this.props.legendPosition
			  	}
			  }}
			/>
			</div>
			)
	}
}

export default Chart;