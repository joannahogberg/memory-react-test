import React, { Component } from 'react';
import PropTypes from 'prop-types';
import backside from './Images/backside.png';
import empty from './Images/empty.png';
import imgNumbers from './Images/imgNumbers.js';
// import _0 from './Images/_0.png';
// import _1 from './Images/_1.png';
// import _2 from './Images/_2.png';
// import _3 from './Images/_3.png';
// import _4 from './Images/_4.png';
// import _5 from './Images/_5.png';
// import _6 from './Images/_6.png';
// import _7 from './Images/_7.png';
// import _8 from './Images/_8.png';
// import _9 from './Images/_9.png';
// import _10 from './Images/_10.png';
// import _11 from './Images/_11.png';
// import _12 from './Images/_12.png';
// import _13 from './Images/_13.png';
// import _14 from './Images/_14.png';
// import _15 from './Images/_15.png';
// import _16 from './Images/_16.png';
// import _17 from './Images/_17.png';


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
  //   images: [
  //     { imgNr: 0, img: require(`./Images/_0.png`)},
  //     { imgNr: 1, img: _1 },
  //     { imgNr: 2, img: _2 },
  //     { imgNr: 3, img: _3 },
  //     { imgNr: 4, img: _4 },
  //     { imgNr: 5, img: _5 },
  //     { imgNr: 6, img: _6 },
  //     { imgNr: 7, img: _7 },
  //     { imgNr: 8, img: _8 },
  //     { imgNr: 9, img: _9 },
  //     { imgNr: 10, img: _10 },
  //     { imgNr: 11, img: _11 },
  //     { imgNr: 12, img: _12 },
  //     { imgNr: 13, img: _13 },
  //     { imgNr: 14, img: _14 },
  //     { imgNr: 15, img: _15 },
  //     { imgNr: 16, img: _16 },
  //     { imgNr: 17, img: _17 }
  
  // ]

  };

  onClick = e => {
    let imgUrl = this.state.images.filter(img => img.imgNr === this.state.imgNr ).map(img => img.img)
    imgUrl = imgUrl.toString()
   // console.log(typeof(imgUrl.toString()))
    this.setState({
     imgUrl: imgUrl.toString()
    //  imgUrl: process.env.PUBLIC_URL + "/Images/_" + this.state.imgNr + ".png"
   
   
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

