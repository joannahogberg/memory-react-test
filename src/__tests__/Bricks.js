import React from 'react';
import { mount } from 'enzyme';
import Bricks from '../Components/Bricks.js';

//Instructs Jest to use fake versions of the standard timer functions
jest.useFakeTimers();

it("Check so that function returns falsy if nrOfBricks is set to 0", () => {
  const fakeCall = jest.fn();
  const wrapper = mount(
    <Bricks nrOfBricks={0} countStats={fakeCall} disableSelect={fakeCall} />
  );
  const btn = wrapper.find("button");
  btn.simulate("click");
  expect(wrapper.state().bricksArr).toHaveLength(0);
});

describe("Render image tags when button is being clicked and check if state is being updated", () => {
  const fakeCall = jest.fn();
  const wrapper = mount(<Bricks nrOfBricks={16} disableSelect={fakeCall} />);
  const btn = wrapper.find("button");

  it("Render image tags when button is being clicked", () => {
    expect(wrapper.state().bricksArr).toHaveLength(0);
    const spy = jest.spyOn(wrapper.instance(), "renderBricks");
    btn.simulate("click");
    expect(wrapper.state().bricksArr).toHaveLength(16);
    const imgTags = wrapper.find("img");
    expect(imgTags).toHaveLength(16);
    expect(spy).toHaveBeenCalledWith(wrapper.state().bricksArr);
  });

  it.skip("Check rendered img tags", () => {
    const imgTags = wrapper.find("img");
    expect(imgTags.first().props()).toEqual(
      expect.objectContaining({
        src: "backside.png",
        className: "pointer-events-auto p-px w-1/4",
        id: expect.any(Number),
        onClick: expect.any(Function)
      })
    );
  });
});


describe("Call countPoints to check points for round", () => {
  const fakeCall = jest.fn();
  const wrapper = mount(
    <Bricks nrOfBricks={16} countStats={fakeCall} disableSelect={fakeCall} />
  );
  const btn = wrapper.find("button");
  const spy = jest.spyOn(wrapper.instance(), "endRound");
  btn.simulate("click");
  it("Check points", () => {
    expect(wrapper.state().bricksArr).toHaveLength(16);
    wrapper.setState({ turns: 22 });
    wrapper.instance().countPoints(8);
    const points = parseInt(20 - (22 - 8) * 1.2, 10);
    expect(wrapper.state().points).toEqual(points);
  });

  it("When endRound is called bricksArr should be empty", () => {
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().bricksArr).toHaveLength(0);
  });
});

describe("Call checkBricks and see if state is being updated and spy to see if checkPair is being called", () => {
  const fakeCall = jest.fn();
  const wrapper = mount(<Bricks nrOfBricks={16} disableSelect={fakeCall} />);
  const btn = wrapper.find("button");
  const bricksArr = wrapper.state().bricksArr;
  const spy = jest.spyOn(wrapper.instance(), "checkPair");
  btn.simulate("click");
  it("First call", () => {
    wrapper.instance().checkBricks(2, 6);
    expect(wrapper.state().bricksArr[2].flipped).toBeTruthy();
    expect(wrapper.state().brick1).toEqual(6);
    expect(wrapper.state().brick2).toBeFalsy();
    expect(spy).not.toHaveBeenCalled();
  });
  it("Second call", () => {
    wrapper.instance().checkBricks(1, 4);
    expect(wrapper.state().bricksArr[1].flipped).toBeTruthy();
    expect(wrapper.state().brick2).toEqual(4);
    expect(wrapper.state().turns).toEqual(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("Call checkPair and see if state is being updated and if countPoints is being called", () => {
  const fakeCall = jest.fn();
  const wrapper = mount(<Bricks nrOfBricks={16} disableSelect={fakeCall} />);
  const btn = wrapper.find("button");
  const spy = jest.spyOn(wrapper.instance(), "countPoints");
  btn.simulate("click");
  it(`With equal values`, () => {
    expect(wrapper.state().pairs).toEqual(0);
    wrapper.setState({ brick1: 2 });
    wrapper.setState({ brick2: 2 });
    wrapper.instance().checkPair();
    // Fast-forward until all timers have been executed
    jest.runAllTimers();
    expect(wrapper.state().pairs).toEqual(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
  it(`With unequal values`, () => {
    wrapper.setState({ brick1: 1 });
    wrapper.setState({ brick2: 3 });
    wrapper.instance().checkPair();
    expect(wrapper.state().pairs).toEqual(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});



  





