import React from 'react';
import { shallow, mount} from 'enzyme';
import App from '../Components/App.js';
import optionValues from '../optionValues.js';


describe('MainSection Component', () => {
  test('render', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true)
  })
});

describe('Check if Select component is being rendered', () => {
  const wrapper = mount(<App />);
  it("Render select with option values", () => {
    expect(wrapper.find("select").exists()).toBe(true)
    const select = wrapper.find("select");
    expect(select.find("option")).toHaveLength(optionValues.length + 1); // +1 since the first value is not added from object
  });

  it("when simulating a change, select should update state.value", () => {
    for (var i = 0; i < optionValues.length; i++) {
      wrapper
        .find("select")
        .simulate("change", { target: { value: optionValues[i].value } });
      expect(wrapper.state("value")).toEqual(optionValues[i].value);
    }
  });

  it("Update state when disableSelect is being called", () => {
    const wrapper = mount(<App />);
    expect(wrapper.state().disabled).toBeFalsy();
    wrapper.instance().disableSelect();
    expect(wrapper.state().disabled).toBeTruthy();
  });

});

describe('Call function cleareSats to see if states get updated', () => {
  it("Clear state", () => {
    const wrapper = mount(<App gamesPlayed={1} totalPoints={10}/>);
    wrapper.instance().clearStats();
    expect(wrapper.state().gamesPlayed).toEqual(0)
    expect(wrapper.state().totalPoints).toEqual(0)
  });
});


// Helper function to test with different values
describe('Call function countStats with different values and check if state is being updated', () => {
  const testTimeAndPoints = (points, start, end) => {
    it(`Check state`, () => {
      const wrapper = mount(<App gamesPlayed={0} totalPoints={0}/>);
      wrapper.instance().countStats(points, start, end)
      const gameTime = end - start;
      const minutes = Math.floor(gameTime / 60000);
      const seconds = ((gameTime % 60000) / 1000).toFixed(0);
      const time = (Number(seconds) === 60 ? (minutes+1) + ":00" : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds);
     if(points < 0 ){
      expect(wrapper.state().totalPoints).toEqual(0)
     }
     else{
      expect(wrapper.state().totalPoints).toEqual(points)
     }
      expect(wrapper.state().userMsg).toContain(time)
      expect(wrapper.state().gamesPlayed).toEqual(1)
    })
  }
  const start = new Date('2018-01-19T09:24:00').getTime();
  const end = new Date('2018-01-19T09:24:57').getTime();

  //Call helper function
  testTimeAndPoints(10, start, end) //With values to check when seconds > 10
  testTimeAndPoints(-5, 1515349879101, 1515350179001) //With values to check when seconds === 60 and points < 0
  testTimeAndPoints(16, 1515350118002, 1515350179001) //With values to check when seconds < 10
})
