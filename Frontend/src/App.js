import React, { Component } from 'react';
import './App.css';
import { TopNav } from './Pages/TopNav/TopNav';
import Content from './Pages/Content/Content';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Apiresponse: []
    }
  }

  callApi = () => {
    fetch('http://localhost:3001/getQuestion')
      .then((res) => res.json())
      .then((res) => {
        if (res[0]) {
          this.setState({
            Apiresponse: res
          })
        }
      });
  }

  componentDidMount() {
    this.callApi();
  }

  render() {
    return (
      <div className="App">
        <TopNav refresh={this.callApi} />
        <Content response={this.state.Apiresponse} />
        {/* <SideBar /> */}
        <p></p>
      </div>

    );
  }

}

/*
<li className="" key={index}>
          {Question.title}<br/>
          {Question.description}
        </li>)
 */

export default App
