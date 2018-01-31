import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow, render } from 'enzyme';
import Main from '../../Components/FormElements/Main.js';

it('Check snapshot for Main', () => {
    const wrapper = render(<Main />);
    expect(toJSON(wrapper))
  .toMatchSnapshot("Main snap");
})

it('Check snapshot for Main', () => {
    const wrapper = shallow(<Main />);
   expect(wrapper.props().className).toContain('justify-center')
})