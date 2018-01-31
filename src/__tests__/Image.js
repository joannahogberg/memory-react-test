import React from 'react';
import { shallow, mount} from 'enzyme';
import Image from '../Components/Image.js';
import Bricks from '../Components/Bricks.js';
import backside from '../Images/backside.png';
import empty from '../Images/empty.png';
import imgNumbers from "../utils/imgNumbers.js";


it("Make sure element is being rendered", () => {
  const wrapper = shallow(<Image />);
  expect(wrapper.exists()).toBe(true);
});

it("check className for img tag", () => {
  const wrapper = shallow(<Image />);
  expect(wrapper.hasClass("pointer-events-auto")).toEqual(true);
});
it.skip("check the length of images array is 18", () => {
  const wrapper = mount(<Image />).instance();
  expect(wrapper.state.images).toHaveLength(18);
});

describe("Test onClick for element", () => {
  const fakeCall = jest.fn();
  it("check if function is being called on click", () => {
    const wrapper = mount(
      <Image value={6} flipped={true} checkBricks={fakeCall} imgNumbers={imgNumbers} />
    );
    wrapper.simulate("click", { target: { id: 6 } });
    expect(wrapper.state().imgNr).toBe(6);
    expect(wrapper.props().checkBricks).toHaveBeenCalled();
  });

  it("change image src onClick", () => {
    const wrapper = shallow(
      <Image value={6} flipped={true} checkBricks={fakeCall} imgNumbers={imgNumbers}/>
    );
    expect(wrapper.props().src).toBe("backside.png");
    wrapper.simulate("click", { target: { id: 6 } });
    expect(wrapper.props().src).toContain("_6.png");
  });

  it("Test if right class is being added depending of nrOfBricks value", () => {
    const wrapper = shallow(<Image nrOfBricks={20} checkBricks={fakeCall} />);
    expect(wrapper.props().className).toContain("w-1/5");
  });

  it("Test if right class is being added depending of nrOfBricks value", () => {
    const wrapper = shallow(<Image nrOfBricks={24} checkBricks={fakeCall} />);
    expect(wrapper.props().className).toContain("w-1/6");
  });
});

it("If pair is true set img src to empty.png and className to be brickFront", () => {
  const wrapper = shallow(<Image pair={true} flipped={true} />);
  expect(wrapper.props().src).toBe("empty.png");
  expect(wrapper.props().className).toContain("pointer-events-none");
});



