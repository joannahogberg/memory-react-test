import React, { Component } from "react";
import PropTypes from "prop-types";
import Main from "./FormElements/Main.js";
import Header from "./FormElements/Header.js";
import Row from "./FormElements/Row.js";
import Select from "./FormElements/Select.js";
import Bricks from "./Bricks.js";
import optionValues from "../optionValues.js";

import {
  removeStatFromLocalStorage,
  saveStatToLocalStorage
} from "../utils/localStorage";

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
    userMsg: "",
    disabled: false
  };

  onChange = e => {
    this.setState({ value: e.target.value, userMsg: "" });
  };

  disableSelect= ()=>{
    this.setState({disabled: true, userMsg: ""});

  }

  countStats = (points, start, end) => {
    let pointsForThisRound;
    if(points < 0 ){
      pointsForThisRound = 0;
    }
    else{
      pointsForThisRound = points;
    }
    const gameTime = end - start;
    const minutes = Math.floor(gameTime / 60000);
    const seconds = ((gameTime % 60000) / 1000).toFixed(0);
    const time = (Number(seconds) === 60 ? (minutes+1) + ":00" : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds);
    const userMsg =
      "your score for this round is " +
      pointsForThisRound +
      ", and you finished in " +
      time +
      " mins";
    this.setState(
      {
        totalPoints: this.state.totalPoints + pointsForThisRound,
        gamesPlayed: this.state.gamesPlayed + 1,
        userMsg,
        disabled: false
      },
      ()=> {
        saveStatToLocalStorage(this.state.totalPoints, this.state.gamesPlayed);
      }
    );
  };
  clearStats = () => {
    removeStatFromLocalStorage();
    this.setState({ totalPoints: 0, gamesPlayed: 0, userMsg: "" });
  };

  render() {
    const cachedPoints = this.state.totalPoints;
    const cachedGames = this.state.gamesPlayed;
    const avaragePoints = Math.floor(cachedPoints / cachedGames);
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
        <Main>
          <Header
            cachedPoints={cachedPoints}
            gamesPlayed={cachedGames}
            avaragePoints={avrgPoints}
            onClick={this.clearStats}
          />
          <Row>
            <Select
              onChange={this.onChange}
              disabled={this.state.disabled}
              options={options}
            >
              <option value="0">Select nr of bricks</option>
            </Select>
          </Row>
          <Row>
          <p>{this.state.userMsg}</p>
          </Row>
          <Bricks
            nrOfBricks={Number(this.state.value)}
            countStats={this.countStats}
            disabled={this.state.disabled}
            disableSelect={this.disableSelect}
          />
        </Main>
      </div>
    );
  }
}

export default App;
