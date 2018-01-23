import React, { Component } from "react";
import PropTypes from "prop-types";
import Image from "./Image.js";
import Button from "./FormElements/Button.js";

const buttonStyle = `sbg-transparent 
hover:bg-green-light 
text-green-light 
font-semibold 
hover:text-white 
py-2 px-4 
border 
border-green 
hover:border-transparent 
rounded
`;
const disabledButtonStyle = `
opacity-50  
pointer-events-none 
  ${buttonStyle}
`;

class Bricks extends Component {
  static propTypes = {
    nrOfBricks: PropTypes.number,
    countPoints: PropTypes.func,
    countStats: PropTypes.func,
    disableSelect: PropTypes.func,
    disabled: PropTypes.bool
  };
  state = {
    bricksArr: [],
    startTime: 0,
    endTime: 0,
    brick1: null,
    brick2: null,
    pairs: 0,
    points: 0,
    flipped: false,
    turns: 0,
    disabled: this.props.disabled
  };

  onClick = () => {
    if(this.props.nrOfBricks === 0){
      return
    }

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

    const startTime = new Date().getTime();
    this.setState({
      bricksArr,
      points: 0,
      pairs: 0,
      turns: 0,
      startTime,
      disabled: true
    },
    function() {
      this.props.disableSelect();
    }
  );
  };

  checkBricks = (id, value) => {
    if (this.state.brick1 === null) {
      let bricksArr = this.state.bricksArr;
      bricksArr[id].flipped = true;
      this.setState({ brick1: value, bricksArr });
    // } else if (this.state.brick1 !== null) {
    } else {
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
    // } else if (this.state.brick1 !== this.state.brick2) {
    } else {
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
    if (pairs === Number(this.props.nrOfBricks) / 2) {
      const endTime = new Date().getTime();
      let points = parseInt(20 - (this.state.turns - pairs) * 1.2, 10);
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
    this.setState({ bricksArr: [],  disabled: false });
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
          nrOfBricks={this.props.nrOfBricks}
        />
      );
    });
  };
  render() {
    
    const wrapperWidth =
      this.props.nrOfBricks > 23
        ? "w-screen max-w-xl p-2"
        : "w-screen max-w-md p-2";

    const imgTags = 
      this.state.bricksArr.length === this.props.nrOfBricks
        ? this.renderBricks(this.state.bricksArr)
        : "";

    return (
      <div className="flex flex-wrap justify-center">
        <div className="flex w-full mb-2 justify-center">
          <Button
            onClick={this.onClick}
            className={`${this.state.disabled ? disabledButtonStyle : buttonStyle}`}
            title="START GAME"
          />
        </div>
        <div className={wrapperWidth}>{imgTags}</div>
      </div>
    );
  }
}

export default Bricks;
