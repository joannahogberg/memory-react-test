import React from 'react';

const Row = (props)=>{
    return(

	<div className="flex w-full justify-center">
		{props.children}
	</div>

	); 
}

export default Row;