import React, {Component} from 'react';
import axios from 'axios';

import CamperListItem from './CamperListItem'

class CamperList extends Component{
constructor(props){
  super(props);

  this.state = {
    loaded: false,
    recentCampers: [],
    allTimeCampers: [],
    currentVeiw: null,
    selectedCamper: 'recentCampers'
  };
}
//json data request
fetchRecentCampers(){
  return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
}
//json data request
fetchAllTimeCampers() {
  return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
}
//function that exectutes when component loads
//sets data from axios request to the correct state values
componentWillMount(){
  
  axios.all([this.fetchRecentCampers(), this.fetchAllTimeCampers()])
    .then(axios.spread((recent, alltime) => {
      this.setState({
        loaded: true,
        recentCampers: recent.data,
        allTimeCampers: alltime.data,
        currentVeiw: 'recentCampers',


      });
    }));
}

changeTitle(currentVeiw){
  this.setState({currentVeiw});
}

renderTable(){
  return this.state.recentCampers.map((camper) => {
    return <CamperListItem key={camper.username} {...camper} />
  });
}
  render(){
    const { loaded } = this.state;
    if(!loaded) {
      return <div>Loading...</div>
    }
    return (
      <div className="col-md-12">
        <h1>{this.state.currentVeiw}</h1>
        <button onClick={() => this.changeTitle('recentCampers')} className="btn btn-primary">Recent</button>
        <button onClick={() => this.changeTitle('allTimeCampers')} className="btn btn-primary">All Time</button>

        <table className="table table-striped ftable" id="table">
          <thead>
            <tr >
              <th>#</th>
              <th>Username</th>
              <th>Recent Points</th>
              <th>All Time Points</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTable()}
          </tbody>
        </table>
      </div>
      
    );
  }
}

export default CamperList;