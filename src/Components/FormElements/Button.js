import React from 'react';

function Button(props){
  return(
    <button className={ `m-2 ${ props.className }` } onClick={props.onClick}>
      { props.title }
    </button>
  )
}

export default Button;