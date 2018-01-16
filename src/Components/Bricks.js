import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from './Image.js';
// import backside from './Images/backside.png';

class Bricks extends Component {
  state = {
    bricksArr: [],
    startTime: 0,
    endTime: 0,
    brick1: null,
    brick2: null,
    pairs: 0,
    points: 0,
    flipped: false,
    turns: 0
  };

  onClick = bricks => {
    let bricksArr = [];
    for (var i = 0; i < this.props.nrOfBricks; i++) {
      bricksArr.push(i);
      bricksArr.push(i);
    }
    bricksArr = bricksArr.filter(picsNr => picsNr < this.props.nrOfBricks / 2);
    bricksArr.sort(function(a, b) {
      return 0.5 - Math.random();
    });
    bricksArr = Object.entries(bricksArr).map(brick =>
      Object.assign({ value: brick[1], flipped: false, pair: false })
    );

    const startTime = new Date();
    this.setState({
      bricksArr,
      points: 0,
      pairs: 0,
      turns:0,
      startTime
    });
  };

  checkBricks = (id, value) => {
    if (this.state.brick1 === null) {
      let bricksArr = this.state.bricksArr;
      bricksArr[id].flipped = true;
      this.setState({ brick1: value, bricksArr });
    } else if (this.state.brick1 !== null) {
      let bricksArr = this.state.bricksArr;
      bricksArr[id].flipped = true;

      this.setState(
        { brick2: value, bricksArr, turns: this.state.turns + 1 },
        function() {
          this.checkPair();
        }
      );
    }
  };

  checkPair = () => {

    if (this.state.brick1 === this.state.brick2) {
      //console.log("pair");
      const bricksArr = this.state.bricksArr.map(brick => {
        if (brick.value === this.state.brick2) {
          return { ...brick, pair: true, flipped: true };
        } else {
          return brick;
        }
      });
      setTimeout(() => {
        this.setState(
          {
            brick1: null,
            brick2: null,
            pairs: this.state.pairs + 1,
            bricksArr
          },
          function() {
            this.countPoints(this.state.pairs);
          }
        );
      }, 600);
    } else if (this.state.brick1 !== this.state.brick2) {
      const bricksArr = this.state.bricksArr.map(brick => {
        if (brick.pair === true) {
          return { ...brick, flipped: true };
        } else {
          return { ...brick, flipped: false };
        }
      });
      setTimeout(() => {
        this.setState({ brick1: null, brick2: null, bricksArr });
      }, 1000);
    }
  };

  countPoints = pairs => {
   // console.log(this.state.turns, pairs);
    if (pairs === Number(this.props.nrOfBricks) / 2) {
      const endTime = new Date();
      let points = parseInt(20 - (this.state.turns - pairs) * 1.2);
      this.setState({ points, endTime }, function() {
        this.props.countStats(
          this.state.points,
          this.state.startTime,
          this.state.endTime
        );
      });
      this.endRound();
     
    }
  };

  endRound = () => {
    this.setState({ bricksArr: [] });
  };

  renderBricks = bricks => {
    return bricks.map((brick, index) => {
      return (
        <Image
          key={index}
          value={brick.value}
          id={index}
          flipped={brick.flipped}
          pair={brick.pair}
          checkBricks={this.checkBricks}
        />
      );
    });
  };
  render() {
    const divStyle = {
      maxWidth: '750px',
      margin: "0 auto"
  };
 
    const imgTags =
      this.props.nrOfBricks > 0 ? (
        <div>{this.renderBricks(this.state.bricksArr)}</div>
      ) : (
        <p>Select number of bricks and start playing</p>
      );

    return (
      <div className="d-flex justify-content-center header" style={divStyle}>
        <button onClick={this.onClick}>start game</button>
        {imgTags}
      </div>
    );
  }
}

export default Bricks;