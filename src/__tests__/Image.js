import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Image from '../Components/Image.js';
import Bricks from '../Components/Bricks.js';
import backside from '../Components/Images/backside.png';
import empty from '../Components/Images/empty.png';


  it('change class onClick', () => {
    const fakeCall = jest.fn();
    let flipped = false; 
    const wrapper = shallow(<Image checkBricks={fakeCall} />);
    expect(wrapper.hasClass('brickBack')).toEqual(true);  
    // wrapper.simulate("click", { target: { id: 1 } });
    //expect(wrapper.hasClass('brickFront')).toEqual(true);
    // flipped = true;
    // wrapper.instance().onClick({ target: { id: 1 } })
    // // wrapper.props().flipped = true;
    // expect(wrapper.hasClass('brickFront')).toEqual(true);
  })

  it('change class onClick', () => {
    const fakeCall = jest.fn();
    const wrapper = mount(<Image value={6} flipped={true} checkBricks={fakeCall} />);
    wrapper.simulate('click', {target: {id: 6}})
    expect(wrapper.state().imgNr).toBe(6)
    expect(wrapper.props().checkBricks).toHaveBeenCalled()
    
  })