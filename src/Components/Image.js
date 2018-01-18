import React, { Component } from 'react';
import backside from './Images/backside.png';
import empty from './Images/empty.png';


class Image extends Component {
  state = {
    imgUrl: backside

  };

  onClick = e => {
    this.setState({
      imgUrl: require("./Images/_" + this.props.value + ".png")
    });
    this.props.checkBricks(e.target.id, this.props.value);
  };

  render() {
    const imgUrl = this.props.pair ? empty : this.state.imgUrl;
    const className = this.props.flipped ? "brickFront" : "brickBack";
    const imgStyle = {
      width: '25%',
  };
    return (
      <img
        src={!this.props.flipped ? backside : imgUrl}
        className={this.props.pair ? "brickFront" : className}
        alt="backside"
        id={this.props.id}
        onClick={this.onClick}
        style={imgStyle}
      />
    );
  }
}

export default Image;

