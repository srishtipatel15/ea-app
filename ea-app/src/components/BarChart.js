import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends Component{
	constructor(props){
		super(props);

		var keys ;
		var values; 
		switch(props.name){
			case 'Sat Scores':
				keys = Object.keys(JSON.parse(localStorage.getItem('sat_scores')));
				values = Object.values(JSON.parse(localStorage.getItem('sat_scores')));
				break;
		}
		console.log(JSON.parse(localStorage.getItem('sat_scores')))
		
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
		displayLegend:false,
		legendPosition:'right'
	}


	async componentDidMount(){
   }

	render(){
		return(
			<div className = "chart">
			<Bar
			  data= {{
			  	labels: this.state.labels,
			  	datasets: this.state.datasets
			  }}
			  width={10}
			  height={10}
			  options={
			  	{
			  	maitainAspectRatio : false,
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

export default BarChart;