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


	async componentDidMount(){
    
    // const url = 'https://api.data.gov/ed/collegescorecard/v1/schools/?school.operating=1&2015.academics.program_available.assoc_or_bachelors=true&2015.student.size__range=1..&school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&id=240444&api_key=7dDEjFQNdQgfnP3QTUbjPIXIkXfaRtQZT0DX0YX4';
    // const response = await axios.get(url)
    // var key = Object.keys(response.data.results[0].latest.academics.program_percentage)
    // var colors = []
    // var values = Object.values(response.data.results[0].latest.academics.program_percentage)
    // for (var i = 0; i<key.length; i++){
    // 	colors.push('#'+Math.floor(Math.random()*16777215).toString(16))
    // }

    // console.log(this.state)
    // console.log()
    // this.setState({
    // 	labels: key,
    // 	datasets: [{
    //     data: values,
    //     backgroundColor: colors,
    // }]
    // })
   }

	render(){
		return(
			<div className = "chart">
			<Doughnut
			  data= {{
			  	labels: this.state.labels,
			  	datasets: this.state.datasets
			  }}
			  width={75}
			  height={35}
			  options={{ 
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