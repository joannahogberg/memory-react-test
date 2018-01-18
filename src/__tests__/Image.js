import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Image from '../Components/Image.js';
import Bricks from '../Components/Bricks.js';
import backside from '../Components/Images/backside.png';
import empty from '../Components/Images/empty.png';


  it('change class onClick', () => {
    const wrapper = shallow(<Image />);
    expect(wrapper.hasClass('brickBack')).toEqual(true);  
    wrapper.simulate("change", { target: { id: '1' } });
    expect(wrapper.hasClass('brickFront')).toEqual(false);
  })