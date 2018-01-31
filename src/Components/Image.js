import React, { Component } from "react";
import PropTypes from "prop-types";
import backside from "../Images/backside.png";
import empty from "../Images/empty.png";

class Image extends Component {
  static propTypes = {
    value: PropTypes.number,
    flipped: PropTypes.bool,
    pair: PropTypes.bool,
    checkBricks: PropTypes.func,
    nrOfBricks: PropTypes.number,
    imgNumbers: PropTypes.arrayOf(PropTypes.shape({
      imgNr: PropTypes.number,
      imgUrl: PropTypes.string
    })),
  };

  state = {
    imgUrl: backside,
    imgNr: this.props.value,
    images: this.props.imgNumbers,
  };

  onClick = e => {
      let imgUrl = this.state.images
      .filter(img => img.imgNr === this.state.imgNr)
      .map(img => img.imgNr);
  
    this.setState({
      imgUrl: require('../Images/_'+ imgUrl +'.png')
      
    });
    this.props.checkBricks(e.target.id, this.state.imgNr);
  };

  render() {
    const small = this.props.nrOfBricks > 19 ? "w-1/5" : "w-1/4";
    const width = this.props.nrOfBricks > 23 ? "w-1/6" : small;
    const imgUrl = this.props.pair ? empty : this.state.imgUrl;
    const className = this.props.flipped
      ? "pointer-events-none p-px " + width
      : "pointer-events-auto p-px " + width;

    return (
      <img
        src={!this.props.flipped ? backside : imgUrl}
        className={
          this.props.pair ? "pointer-events-none p-px " + width : className
        }
        alt="backside"
        id={this.props.id}
        onClick={this.onClick}
      />
    );
  }
}

export default Image;

