import React from "react";

const selectStyle = `block 
appearance-none 
w-full 
bg-white 
border border-grey-light 
hover:border-grey
px-4 py-2 pr-8 
rounded shadow
`;
const disabledSelectStyle = `
opacity-50  
pointer-events-none 
  ${selectStyle}
`;

function Select(props) {
    return <div className="inline-block relative w-64 mb-2 mt-2">
    <select onChange={props.onChange} className={`${props.disabled ? disabledSelectStyle : selectStyle}`} name={props.name} value={props.value} disabled={props.disabled}>
        {props.children}
        {props.options}
      </select>
     </div>;
}
export default Select;