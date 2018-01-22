import React from 'react';
import { shallow, mount} from 'enzyme';
import Image from '../Components/Image.js';
import Bricks from '../Components/Bricks.js';
import backside from '../Components/Images/backside.png';
import empty from '../Components/Images/empty.png';


  it('check className for img tag', () => {
    const wrapper = shallow(<Image />);
    expect(wrapper.hasClass('pointer-events-auto')).toEqual(true);  
  })
  it('check that length of images array is 18', () => {
    const wrapper = mount(<Image />).instance();
    expect(wrapper.state.images).toHaveLength(18)
  })

  it('check if function is being called on click', () => {
    const fakeCall = jest.fn();
    const wrapper = mount(<Image value={6} flipped={true} checkBricks={fakeCall} />);
    wrapper.simulate('click', {target: {id: 6}})
    expect(wrapper.state().imgNr).toBe(6)
    expect(wrapper.props().checkBricks).toHaveBeenCalled()
    
  })

  it('change image src onClick', () => {
    const fakeCall = jest.fn();
    const wrapper = shallow(<Image value={6} flipped={true} checkBricks={fakeCall} />);
    expect(wrapper.props().src).toBe('backside.png')
    wrapper.simulate('click', {target: {id: 6}})
    expect(wrapper.props().src).toBe('_6.png')
   
  })

  it('If pair is true set img src to empty.png and className to be brickFront', () => {
    const wrapper = shallow(<Image pair={true} flipped={true} />);
    expect(wrapper.props().src).toBe('empty.png')
    expect(wrapper.props().className).toContain('pointer-events-none')
   
  })

