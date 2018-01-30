import React, { Component } from "react";
import PropTypes from "prop-types";
import backside from "../Images/backside.png";
import empty from "../Images/empty.png";
import imgNumbers from "../utils/imgNumbers.js";
import _0 from '../Images/_0.png';
import _1 from '../Images/_1.png';
import _2 from '../Images/_2.png';
import _3 from '../Images/_3.png';
import _4 from '../Images/_4.png';
import _5 from '../Images/_5.png';
import _6 from '../Images/_6.png';
import _7 from '../Images/_7.png';
import _8 from '../Images/_8.png';
import _9 from '../Images/_9.png';
import _10 from '../Images/_10.png';
import _11 from '../Images/_11.png';
import _12 from '../Images/_12.png';
import _13 from '../Images/_13.png';
import _14 from '../Images/_14.png';
import _15 from '../Images/_15.png';
import _16 from '../Images/_16.png';
import _17 from '../Images/_17.png';

class Image extends Component {
  static propTypes = {
    value: PropTypes.number,
    flipped: PropTypes.bool,
    pair: PropTypes.bool,
    checkBricks: PropTypes.func,
    nrOfBricks: PropTypes.number
  };

  state = {
    imgUrl: backside,
    imgNr: this.props.value,
    images: imgNumbers,
    imgArr: [_0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17]
  };

  onClick = e => {
    let imgUrl = this.state.images
      .filter(img => img.imgNr === this.state.imgNr)
      .map(img => img.img);
      let testUrl = this.state.imgArr
      .filter(img => img === imgUrl.toString())
  
    this.setState({
      // imgUrl: imgUrl.toString()
      imgUrl: testUrl
      
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

