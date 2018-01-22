import React from 'react';

const Main = (props)=>{
    return(
	<main className="flex flex-col justify-center items-center w-full mx-auto font-sans text-indigo-darker mt-6">
		{props.children}
	</main>
	); 
}

export default Main;