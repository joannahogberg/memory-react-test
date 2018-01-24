import React from 'react';
import { shallow, mount} from 'enzyme';
import App from '../Components/App.js';
import optionValues from '../optionValues.js';

it("renders without crashing", () => {
  shallow(<App />);
});

it("Update state when disableSelect is being called", () => {
  const wrapper = mount(<App />);
  wrapper.instance().disableSelect();
  expect(wrapper.state().disabled).toBeTruthy();
});

it("check nr of option tags in select tag", () => {
  const optionValuesLength = optionValues.length + 1; // +1 since the first value is not added from object
  const wrapper = mount(<App />);
  const select = wrapper.find("select");
  expect(select.find("option")).toHaveLength(optionValuesLength);
});

it("when simulating a change, select should update state.value", () => {
  const wrapper = mount(<App />);
  const values = optionValues;
  for (var i = 0; i < values.length; i++) {
    wrapper
      .find("select")
      .simulate("change", { target: { value: values[i].value } });
    expect(wrapper.state("value")).toEqual(values[i].value);
  }
});

it("Call functions to see if states get updated", () => {
  const wrapper = mount(<App gamesPlayed={1} totalPoints={10}/>);
  wrapper.instance().clearStats()
  expect(wrapper.state().gamesPlayed).toEqual(0)
  expect(wrapper.state().totalPoints).toEqual(0)
});

describe('Call function countStats with different values', () => {

  it("Call function with values to check when seconds < 10 and check if state is being updated", () => {
    const wrapper = mount(<App gamesPlayed={1} totalPoints={10}/>);
    const points = 16;
    const start = 1515350118002;
    const end = 1515350179001;
    wrapper.instance().countStats(points, start, end)
    const gameTime = end - start;
    const minutes = Math.floor(gameTime / 60000);
    const seconds = ((gameTime % 60000) / 1000).toFixed(0);
    const time = (Number(seconds) === 60 ? (minutes+1) + ":00" : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds);
    expect(wrapper.state().userMsg).toContain(time)
    expect(wrapper.state().gamesPlayed).toEqual(2)
    expect(wrapper.state().totalPoints).toEqual(26)
  });
  
  it("Call function with values to check when seconds === 60", () => {
    const wrapper = mount(<App gamesPlayed={0} totalPoints={0}/>);
    const points = -5;
    const start = 1515349879101;
    const end = 1515350179001;
    wrapper.instance().countStats(points, start, end)
    const gameTime = end - start;
    const minutes = Math.floor(gameTime / 60000);
    const seconds = ((gameTime % 60000) / 1000).toFixed(0);
    const time = (Number(seconds) === 60 ? (minutes+1) + ":00" : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds);
    expect(wrapper.state().userMsg).toContain(time)
    expect(wrapper.state().totalPoints).toEqual(0)
    expect(wrapper.state().gamesPlayed).toEqual(1)
  });
  
  it("Call function with values to check when seconds > 10", () => {
    const wrapper = mount(<App gamesPlayed={1} totalPoints={10}/>);
    const points = 16;
    const start = new Date('2018-01-19T09:24:00').getTime();
    const end = new Date('2018-01-19T09:24:57').getTime();
    wrapper.instance().countStats(points, start, end)
    const gameTime = end - start;
    const minutes = Math.floor(gameTime / 60000);
    const seconds = ((gameTime % 60000) / 1000).toFixed(0);
    const time = (Number(seconds) === 60 ? (minutes+1) + ":00" : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds);
    expect(wrapper.state().userMsg).toContain(time)
  });
});

  // it("Call function with values to check when seconds < 10", () => {
  //   const wrapper = mount(<App gamesPlayed={1} totalPoints={10}/>);
  //   const points = 16;
  //   const start = 1515350119001;
  //   const end = 1515350179001;
  //   wrapper.instance().countStats(points, start, end)
  //   const gameTime = end - start;
  //   const minutes = Math.floor(gameTime / 60000);
  //   const seconds = ((gameTime % 60000) / 1000).toFixed(0);
  //   const time = (Number(seconds) === 60 ? (minutes+1) + ":00" : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds);
  //   expect(wrapper.state().userMsg).toContain(time)
  // });

