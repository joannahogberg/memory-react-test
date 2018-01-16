import React from 'react';
import fetchMock from 'fetch-mock';
import { shallow, mount, render } from 'enzyme';
import Image from '../Components/Image.js';
import Bricks from '../Components/Bricks.js';

it('check onClick', () => {
    const wrapper = shallow(<Bricks />);
    const btn = wrapper.find('button');
    //const onClick = spyOn(wrapper.instance(), 'onClick');
    const instance = wrapper.instance();
    const goSpy = spyOn(instance, 'onClick');
    btn.simulate("click");
    instance.forceUpdate();
    expect(goSpy).not.toHaveBeenCalled();
  })