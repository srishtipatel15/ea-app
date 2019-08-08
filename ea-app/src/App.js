import React,{Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Chart from './components/Chart';
import BarChart from './components/BarChart';

class App extends Component{
  constructor(){
    super();
    this.getKeys = this.getKeys.bind(this);
    this.state = {
      schoolData:[],
      totalStudent: '',
      programPercentages:{},
      raceEthnicity: [],
      sat_scores:[]
    };

  }

  async componentDidMount(){
    
    const url = 'https://api.data.gov/ed/collegescorecard/v1/schools/?school.operating=1&2015.academics.program_available.assoc_or_bachelors=true&2015.student.size__range=1..&school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&id=240444&api_key=7dDEjFQNdQgfnP3QTUbjPIXIkXfaRtQZT0DX0YX4';
    const response = await axios.get(url)
        this.setState({
                schoolData: response.data.results[0].school, 
                totalStudent:response.data.results[0].latest.student.size, 
                programPercentages:response.data.results[0].latest.academics.program_percentage, 
                sat_scores:response.data.results[0].latest.admissions.sat_scores.midpoint, 
                raceEthnicity:response.data.results[0].latest.student.demographics.race_ethnicity});
    
    console.log(response.data.results[0].latest.admissions.sat_scores);
    window.localStorage.setItem('programPercentages', JSON.stringify(this.state.programPercentages));
    window.localStorage.setItem('raceEthnicity', JSON.stringify(this.state.raceEthnicity));
    window.localStorage.setItem('sat_scores', JSON.stringify(this.state.sat_scores));

  }
  getKeys(){
    return Object.keys(this.state.programPercentages);
  }

  // print() {
  //   const filename  = 'ThisIsYourPDFFilename.pdf';

  //   html2canvas(document.querySelector('#nodeToRenderAsPDF')).then(canvas => {
  //     let pdf = new jsPDF('p', 'mm', 'a4');
  //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
  //     pdf.save(filename);
  //   });
  // }
  render(){
    const {key} = this.state.programPercentages;
    return( 
    <React.Fragment>

      <div className = "container-fluid">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
            <th scope="col">Name</th>
            <th scope="col">Website</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Zip</th>
            <th scope="col">Number of Students</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td> {this.state.schoolData.name}</td>
                <td> <a href = {this.state.schoolData.school_url}>{this.state.schoolData.school_url} </a></td>
                <td> {this.state.schoolData.city}</td>
                <td> {this.state.schoolData.state}</td>
                <td> {this.state.schoolData.zip}</td>
                <td> {this.state.totalStudent}</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div className = "container-fluid">
        <Chart name={'Program Percentage'}/>
      </div>
      <div className = "container-fluid">
        <Chart name={'Race Ethnicity'}/>
      </div>
      <div className = "container-fluid">
        <BarChart name={'Sat Scores'}/>
      </div>
      <div className = "container-fluid">
        <a href="https://pdf-ace.com/pdfme/" target= "_blank">Save as PDF</a>
      </div>
    </React.Fragment>
    );
  }
}



export default App;
