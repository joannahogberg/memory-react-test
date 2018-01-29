import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Image from '../Components/Image.js';
import Bricks from '../Components/Bricks.js';

//Instructs Jest to use fake versions of the standard timer functions
jest.useFakeTimers();

it('Generate image tags when button is being clicked', () => {
    const fakeCall = jest.fn();
    const wrapper = mount(<Bricks nrOfBricks={16} disableSelect={fakeCall}/>);
    const btn = wrapper.find('button'); 
    expect(wrapper.state().bricksArr).toHaveLength(0)
    btn.simulate("click");
    expect(wrapper.state().bricksArr).toHaveLength(16)
    const bricksArr = wrapper.state().bricksArr;
    wrapper.instance().renderBricks(bricksArr)
    const imgTags = wrapper.find('img');
    expect(imgTags).toHaveLength(16)
 
  })
  it('Check so that function returns falsy if nrOfBricks is set to 0', () => {
    const fakeCall = jest.fn();
    const wrapper = mount(<Bricks nrOfBricks={0} disableSelect={fakeCall}/>);
    const btn = wrapper.find('button'); 
    btn.simulate("click");
    expect(wrapper.state().bricksArr).toHaveLength(0)
  })

  it('When endRound is called bricksArr should be empty', () => {
    const fakeCall = jest.fn();
    const wrapper = mount(<Bricks nrOfBricks={16} disableSelect={fakeCall}/>);
    const btn = wrapper.find('button'); 
    btn.simulate("click");
    expect(wrapper.state().bricksArr).toHaveLength(16)
    wrapper.instance().endRound();
    expect(wrapper.state().bricksArr).toHaveLength(0)
 
  })

  it('Call countPoints to check points for round', () => {
    const fakeCall = jest.fn();
    const wrapper = mount(<Bricks nrOfBricks={16} countStats={fakeCall} disableSelect={fakeCall} />);
    const btn = wrapper.find('button'); 
    btn.simulate("click");
    wrapper.setState({ turns: 22});
    wrapper.instance().countPoints(8);
    const points = parseInt(20 - (22 - 8) * 1.2, 10);
    expect(wrapper.state().points).toEqual(points)
  

  })

  it('Call checkPair and see if state is being updated when images dont match', () => {
    const fakeCall = jest.fn();
    const wrapper = mount(<Bricks nrOfBricks={16} disableSelect={fakeCall}/>);
    const btn = wrapper.find('button'); 
    btn.simulate("click");
    wrapper.setState({ brick1: 1});
    wrapper.setState({ brick2: 2});
    expect(wrapper.state().brick1).toEqual(1)
    expect(wrapper.state().brick2).toEqual(2)
    wrapper.instance().checkPair()
     // Fast-forward until all timers have been executed
    jest.runAllTimers();
    expect(wrapper.state().brick1).toBeFalsy()
    expect(wrapper.state().brick2).toBeFalsy()
 

  })


  it('Call checkPair and see if state is being updated', () => {
    const fakeCall = jest.fn();
    const wrapper = mount(<Bricks nrOfBricks={16} disableSelect={fakeCall}/>);
    const btn = wrapper.find('button'); 
    btn.simulate("click");
    const bricksArr = wrapper.state().bricksArr;
    expect(wrapper.state().pairs).toEqual(0)
    wrapper.setState({ brick1: 2});
    wrapper.setState({ brick2: 2});
    wrapper.instance().checkPair()
     // Fast-forward until all timers have been executed
    jest.runAllTimers();
    const bricks = wrapper.state().bricksArr.filter( obj => 
      {
        if (obj.value === wrapper.state().brick2) {
          return { ...obj, pair: true, flipped: true };
        } else {
          return obj; 
        }
      }
    );
    expect(wrapper.state().bricksArr).toEqual(bricks)
    expect(wrapper.state().pairs).toEqual(1)
    wrapper.setState({ brick1: 1});
    wrapper.setState({ brick2: 3}); 
    wrapper.instance().checkPair()
    const bricksUpdate = wrapper.state().bricksArr.filter(obj => {
      if (obj.pair === true) {
        return { ...obj, flipped: true };
      } else {
        return { ...obj, flipped: false };
      }
    });
    expect(wrapper.state().pairs).toEqual(1)
    expect(wrapper.state().bricksArr).toEqual(bricksUpdate)
  })

  it('Call ccheckBricks and see if state is being updated and spy to see if checkPair is being called', () => {
    const fakeCall = jest.fn();
    const wrapper = mount(<Bricks nrOfBricks={16} disableSelect={fakeCall}/>);
    const btn = wrapper.find('button'); 
    btn.simulate("click");
    const bricksArr = wrapper.state().bricksArr;
    wrapper.instance().checkBricks(2, 6)
    expect(wrapper.state().bricksArr[2].flipped).toBeTruthy()
    expect(wrapper.state().brick1).toEqual(6)
    expect(wrapper.state().brick2).toBeFalsy()
    const instance = wrapper.instance()
    const spy = jest.spyOn(instance, 'checkPair')
    wrapper.instance().checkBricks(1, 4)
    expect(wrapper.state().bricksArr[1].flipped).toBeTruthy()
    expect(wrapper.state().brick2).toEqual(4)  
    expect(wrapper.state().turns).toEqual(1) 
    expect(spy).toHaveBeenCalled()
  })





