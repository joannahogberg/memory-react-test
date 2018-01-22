import React from 'react';
// import fetchMock from 'fetch-mock';
import { shallow, mount, render } from 'enzyme';
import App from '../Components/App.js';
import optionValues from '../optionValues.js';

it("renders without crashing", () => {
  shallow(<App />);
});

// it('testing h1', () =>{
//     const wrapper = shallow(<App />);
//    expect(wrapper.find('h1').text()).toContain('Memory game');
// })

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
  const start = new Date('2018-01-19T09:24:00');
  const end = new Date('2018-01-19T09:24:57');
  const points = 16;
  wrapper.instance().countStats(points, start, end)
  expect(wrapper.state().gamesPlayed).toEqual(2)
  expect(wrapper.state().totalPoints).toEqual(26)
  wrapper.instance().clearStats()
  expect(wrapper.state().gamesPlayed).toEqual(0)
  expect(wrapper.state().totalPoints).toEqual(0)
});


