import React,{Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Chart from './components/Chart';
import BarChart from './components/BarChart';
import Export from './components/Export';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';

class App extends Component{
  constructor(props){
    super(props);
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
  getPdf(){
    const input = document.getElementById('capture');
    const pdf = new jsPDF('landscape');
            if (pdf) {
              domtoimage.toPng(input)
                .then(imgData => {
                  pdf.addImage(imgData, 'PNG', 0, 0);
                  pdf.save('download.pdf');
                });
            }

  }

  getData(){
    // const {file} = this.state;

    var pdfConverter = require('jspdf');
    //var converter = new pdfConverter();
    //var doc = converter.jsPDF('p', 'pt');

    var doc = new pdfConverter('landscape');

    doc.setFontSize(20);
    doc.text(20, 20, 'Page Data');
    doc.setFontSize(15);
    doc.text(20, 30, 'School Name: ' + this.state.schoolData.name );
    doc.text(20, 40, 'School Website: ' + this.state.schoolData.school_url);
    doc.text(20, 50, 'School City: ' + this.state.schoolData.city);
    doc.text(20, 60, 'School State: ' + this.state.schoolData.state);
    doc.text(20, 70, 'School Zip: ' + this.state.schoolData.zip);
    doc.text(20, 80, 'Total number of Students: ' + this.state.totalStudent);
    doc.text(20, 90, 'Program Percentages: ' + JSON.stringify(this.state.programPercentages));
    doc.text(20, 100, 'Race Ethnicity: ' + JSON.stringify(this.state.raceEthnicity));
    doc.text(20, 110, 'SAT Scores: ' + JSON.stringify(this.state.sat_scores));
    doc.save("test.pdf");
  }



  render(){
    return( 
    <React.Fragment>
      <div id = 'capture'>
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
          <table>
            <tr className="row">
              <div className = "container-fluid">
              <Chart name={'Program Percentage'}/>
              </div>
            </tr>

            <tr className="row">
              <div className = "container-fluid">
              <Chart name={'Race Ethnicity'}/>
              </div>
            </tr>

            <tr className="row">
              <div className = "container-fluid">
              <BarChart name={'Sat Scores'}/>
              </div>
            </tr>
          </table>
        </div>
      </div>
      <div className="container-fluid">
        <table>
          <tr>
          <td>
            <button onClick={this.getPdf} className="btn btn-info">Save as PDF</button>
          </td>
          <td>
            <button onClick={this.getData.bind(this)} className="btn btn-info">Save Page Data</button>
          </td>
          </tr>
        </table>
      </div>
    </React.Fragment>
    );
  }
}



export default App;
