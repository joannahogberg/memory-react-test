import React, { Component } from 'react';
import PropTypes from 'prop-types';
import backside from './Images/backside.png';
import empty from './Images/empty.png';
import imgNumbers from './Images/imgNumbers.js';


class Image extends Component {
  static propTypes = {
    value: PropTypes.number,
    flipped: PropTypes.bool,
    pair: PropTypes.bool,
    checkBricks: PropTypes.func
  };

  state = {
    imgUrl: backside,
    imgNr: this.props.value,
    images: imgNumbers

  };

  onClick = e => {
    const imgUrl = this.state.images.filter(img => img.imgNr === this.state.imgNr ).map(img => img.img)
    this.setState({
      imgUrl: imgUrl
    });
    this.props.checkBricks(e.target.id, this.state.imgNr);
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

