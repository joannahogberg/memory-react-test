import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './Select.js';
import Bricks from './Bricks.js';
import optionValues from '../optionValues.js';
// import '../App.css';
import {
  removeStatFromLocalStorage,
  saveStatToLocalStorage
} from '../utils/localStorage';

class App extends Component {
  static propTypes = {
    totalPoints: PropTypes.number,
    gamesPlayed: PropTypes.number
  };
  
  state = {
    gamesPlayed: this.props.gamesPlayed,
    totalPoints: this.props.totalPoints,
    options: optionValues,
    value: 0,
    userMsg: ""
  };


  onChange = e => {
    this.setState({ value: e.target.value });
  };

  countStats = (points, start, end) => {
    console.log(typeof(points))
    let gameTime = end - start;
    // strip the ms
    gameTime /= 1000;
    // get seconds
    const time = Math.round(gameTime / 60);
    const userMsg =
      "your score for this round is " +
      points +
      ", and you finished in " +
      time +
      " mins";

    this.setState(
      {
        totalPoints: this.state.totalPoints + points,
        gamesPlayed: this.state.gamesPlayed + 1,
        userMsg
      },
      function() {
        saveStatToLocalStorage(this.state.totalPoints, this.state.gamesPlayed);
      }
    );
  };
clearStats=()=>{
  removeStatFromLocalStorage();
  this.setState({ totalPoints:0, gamesPlayed:0 });

}

  render() {
    const cachedPoints = this.state.totalPoints;
    const cachedGames = this.state.gamesPlayed;
    // const avaragePoints = parseInt(Number(cachedPoints) / Number(cachedGames));
    const avaragePoints = cachedPoints /cachedGames;
    const avrgPoints = this.state.gamesPlayed ? avaragePoints : "";
    //Set options for select to select nr of bricks to play with
    const options = this.state.options.map(name => {
      return (
        <option key={name.value} value={name.value}>
          {name.text}
        </option>
      );
    });

    return (
      <div className="App">
        <h1>Memory game</h1>
        <h4>
          Total score: {cachedPoints}. GamesPlayed: {cachedGames}. Avarage
          points: {avrgPoints}
        </h4>
        <button onClick={this.clearStats}>delete stat</button>
        <Select
          onChange={this.onChange}
          className="custom-select form-control-sm"
          options={options}
        >
          <option value="0">Select nr of bricks</option>
        </Select>
        <h2>{this.state.userMsg}</h2>
        <Bricks nrOfBricks={this.state.value} countStats={this.countStats} />
      </div>
    );
  }
}

export default App;
