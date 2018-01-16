require('jest-localstorage-mock');
import React from 'react';
import fetchMock from 'fetch-mock';
import { shallow, mount, render } from 'enzyme';
import App from '../Components/App.js';
import optionValues from '../optionValues.js';



function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

/**
 * Restore fetchMock after each test. Cleanup duty.
 */
afterEach(() => {
  fetchMock.restore();
  fetchMock.reset();
});

it("renders without crashing", () => {
  shallow(<App />);
});

it('testing h1', () =>{
    const wrapper = shallow(<App />);
   expect(wrapper.find('h1').text()).toContain('Memory game');
})


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


      // wrapper.find('select').simulate('change',{target: { value : value}});
        // // expect(wrapper.find('select').value).toBe("100");
        // expect(wrapper.state('value')).toEqual(value);

// it('should save to localStorage', () => {
//     const KEY = 'foo',
//       VALUE = 'bar';
//     dispatch(action.update(KEY, VALUE));
//     expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
//     expect(localStorage.__STORE__[KEY]).toBe(VALUE);
//     expect(Object.keys(localStorage.__STORE__).length).toBe(1);
//   });

